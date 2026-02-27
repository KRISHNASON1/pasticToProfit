/**
 * PlasticScanService
 * Analyses a user-uploaded image using Gemini Vision API (multimodal)
 * to classify plastic type, count items, and calculate Up-Coin rewards.
 *
 * Priority:  1) Gemini 1.5 Flash  2) Google Vision API  3) Mock fallback
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const VISION_API_KEY = import.meta.env.VITE_GOOGLE_VISION_API_KEY;

// Multiple Gemini models — each has its own independent quota pool.
// If one is rate-limited, we try the next model instead of waiting.
const GEMINI_MODELS = [
    'gemini-2.5-flash',        // newest, has fresh quota
    'gemini-2.5-flash-lite',   // lightweight variant
    'gemini-2.0-flash-lite',   // cheap fallback
    'gemini-2.0-flash',        // older (may be exhausted)
];
const geminiUrl = (model) =>
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
const VISION_URL = () =>
    `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

// ── Plastic type reward rates ──────────────────────────────────────────
const PLASTIC_RATES = {
    PET: { coinsPerItem: 12, rupeesPerKg: 8.0, label: 'PET (Type 1)', desc: 'Clear bottles, soda/water bottles' },
    HDPE: { coinsPerItem: 18, rupeesPerKg: 12.0, label: 'HDPE (Type 2)', desc: 'Milk jugs, detergent bottles' },
    LDPE: { coinsPerItem: 8, rupeesPerKg: 5.0, label: 'LDPE (Type 4)', desc: 'Plastic bags, squeeze bottles' },
    PP: { coinsPerItem: 10, rupeesPerKg: 6.5, label: 'PP (Type 5)', desc: 'Yogurt cups, bottle caps' },
    PS: { coinsPerItem: 5, rupeesPerKg: 3.0, label: 'PS (Type 6)', desc: 'Disposable cups, foam' },
    OTHER: { coinsPerItem: 4, rupeesPerKg: 2.5, label: 'Mixed Plastic', desc: 'Other recyclable plastic' },
};

// ── Helpers ────────────────────────────────────────────────────────────
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function stripDataUrl(dataUrl) {
    const [meta, data] = dataUrl.split(',');
    const mimeType = meta.match(/:(.*?);/)?.[1] || 'image/jpeg';
    return { mimeType, data };
}

// ── GEMINI VISION (tries multiple models for quota resilience) ─────────
async function analyzeWithGemini(base64DataUrl, onStatus) {
    const { mimeType, data } = stripDataUrl(base64DataUrl);

    const prompt = `You are an AI plastic waste classifier for a recycling platform called PlasticToProfit.

Analyse this image and identify ALL plastic items visible. For each item determine:
1. The plastic resin code: PET, HDPE, LDPE, PP, PS, or OTHER
2. A short descriptive name (e.g. "Transparent Water Bottle")
3. An appropriate emoji icon
4. How many of that item type are visible

Respond ONLY with a valid JSON object in this exact schema — no markdown fences:
{
  "items": [
    { "name": "Transparent Water Bottle", "plasticCode": "PET", "icon": "🍶", "count": 2 }
  ],
  "confidence": 0.94,
  "summary": "Detected 2 PET water bottles"
}

If no plastic is visible, return { "items": [], "confidence": 0.5, "summary": "No plastic detected" }.`;

    const bodyPayload = {
        contents: [{
            parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data } },
            ],
        }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
    };

    // Try each model — they each have independent quota pools
    for (let i = 0; i < GEMINI_MODELS.length; i++) {
        const model = GEMINI_MODELS[i];
        const url = geminiUrl(model);

        console.log(`[PlasticScan] Trying model ${i + 1}/${GEMINI_MODELS.length}: ${model}…`);
        if (onStatus) onStatus(`🤖 Trying ${model}…`);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload),
            });

            if (res.ok) {
                const json = await res.json();
                const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) throw new Error('Empty Gemini response');

                console.log(`[PlasticScan] Raw ${model} response:`, text.slice(0, 300));

                // Strip markdown code fences if present (```json ... ```)
                const cleaned = text.replace(/```(?:json)?\s*/gi, '').replace(/```/g, '').trim();
                const match = cleaned.match(/\{[\s\S]*\}/);
                if (!match) throw new Error('No JSON in Gemini response');

                console.log(`[PlasticScan] ✅ ${model} succeeded!`);
                if (onStatus) onStatus(`✅ ${model} responded!`);
                return buildResult(JSON.parse(match[0]), 'gemini');
            }

            // 429 = quota exhausted for this model → try next model immediately
            if (res.status === 429) {
                console.warn(`[PlasticScan] ⚠️ ${model} rate-limited (429), trying next model…`);
                if (onStatus) onStatus(`⚠️ ${model} quota full — trying next model…`);
                continue;
            }

            // Other error
            const t = await res.text();
            throw new Error(`${model} ${res.status}: ${t}`);
        } catch (err) {
            // If it's our own thrown error (not a 429 skip), log and try next
            console.warn(`[PlasticScan] ${model} failed:`, err.message);
            if (i < GEMINI_MODELS.length - 1) continue;
            throw err; // re-throw on last model
        }
    }

    throw new Error('All Gemini models exhausted (rate-limited)');
}

// ── GOOGLE VISION FALLBACK ─────────────────────────────────────────────
async function analyzeWithVision(base64DataUrl) {
    const { data } = stripDataUrl(base64DataUrl);

    const body = {
        requests: [{
            image: { content: data },
            features: [
                { type: 'LABEL_DETECTION', maxResults: 15 },
                { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
            ],
        }],
    };

    const res = await fetch(VISION_URL(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Vision API ${res.status}`);

    const result = await res.json();
    const labels = (result.responses?.[0]?.labelAnnotations || []).map(l => l.description.toLowerCase());
    const objects = (result.responses?.[0]?.localizedObjectAnnotations || []).map(o => o.name.toLowerCase());
    const all = [...labels, ...objects];

    const items = [];
    if (all.some(l => l.includes('bottle'))) items.push({ name: 'Plastic Bottle', plasticCode: 'PET', icon: '🍶', count: 1 });
    if (all.some(l => l.includes('bag'))) items.push({ name: 'Plastic Bag', plasticCode: 'LDPE', icon: '🛍️', count: 1 });
    if (all.some(l => l.includes('container'))) items.push({ name: 'Plastic Container', plasticCode: 'PP', icon: '📦', count: 1 });
    if (all.some(l => l.includes('cup'))) items.push({ name: 'Disposable Cup', plasticCode: 'PS', icon: '🥤', count: 1 });
    if (items.length === 0 && all.some(l => l.includes('plastic')))
        items.push({ name: 'Plastic Item', plasticCode: 'OTHER', icon: '♻️', count: 1 });

    return buildResult({
        items,
        confidence: 0.75,
        summary: items.length ? `Detected ${items.length} plastic type(s)` : 'No plastic detected',
    }, 'vision');
}

// ── MOCK FALLBACK ──────────────────────────────────────────────────────
function mockFallback() {
    return buildResult({
        items: [
            { name: 'Transparent Water Bottle', plasticCode: 'PET', icon: '🍶', count: 2 },
            { name: 'Plastic Polythene Bag', plasticCode: 'LDPE', icon: '🛍️', count: 3 },
        ],
        confidence: 0.96,
        summary: 'Detected 2 PET water bottles and 3 LDPE bags',
    }, 'fallback');
}

// ── Build final result object ──────────────────────────────────────────
function buildResult(parsed, source) {
    const items = (parsed.items || []).map(item => {
        const rate = PLASTIC_RATES[item.plasticCode] || PLASTIC_RATES.OTHER;
        return {
            icon: item.icon || '♻️',
            name: item.name,
            type: rate.label,
            plasticCode: item.plasticCode,
            count: item.count || 1,
        };
    });

    const totalCoins = items.reduce((s, i) => s + (PLASTIC_RATES[i.plasticCode]?.coinsPerItem || 4) * i.count, 0);
    const totalRupees = items.reduce((s, i) => s + (PLASTIC_RATES[i.plasticCode]?.rupeesPerKg || 2.5) * i.count * 0.3, 0);

    return {
        items,
        totalCoins,
        totalRupees: parseFloat(totalRupees.toFixed(2)),
        confidence: parsed.confidence || 0.85,
        summary: parsed.summary || '',
        source,
    };
}

// ── MAIN ENTRY POINT ───────────────────────────────────────────────────
export async function analyzeImage(base64DataUrl, onStatus) {
    const errors = [];

    // 1. Primary: Gemini Vision
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
        try {
            console.log('[PlasticScan] Calling Gemini Vision API…');
            console.log('[PlasticScan] Using key:', GEMINI_API_KEY.slice(0, 8) + '…');
            if (onStatus) onStatus('🔗 Connecting to Gemini AI…');
            const result = await analyzeWithGemini(base64DataUrl, onStatus);
            console.log('[PlasticScan] ✅ Gemini success:', result);
            return result;
        } catch (err) {
            console.error('[PlasticScan] ❌ Gemini failed:', err.message);
            errors.push(`Gemini: ${err.message}`);
        }
    } else {
        console.warn('[PlasticScan] No Gemini API key found. Value:', GEMINI_API_KEY);
    }

    // 2. Fallback: Google Vision
    if (VISION_API_KEY && VISION_API_KEY !== 'your_google_vision_api_key_here') {
        try {
            console.log('[PlasticScan] Calling Google Vision API…');
            const result = await analyzeWithVision(base64DataUrl);
            console.log('[PlasticScan] ✅ Vision success:', result);
            return result;
        } catch (err) {
            console.error('[PlasticScan] ❌ Vision API failed:', err.message);
            errors.push(`Vision: ${err.message}`);
        }
    } else {
        console.warn('[PlasticScan] No Google Vision API key found.');
    }

    // 3. Demo fallback — but log why we're here
    if (errors.length > 0) {
        console.error('[PlasticScan] All APIs failed. Errors:', errors);
        console.error('[PlasticScan] Falling back to mock data.');
    } else {
        console.warn('[PlasticScan] No API keys configured — returning mock data.');
    }
    const result = mockFallback();
    result._errors = errors; // attach errors so UI can optionally show them
    return result;
}
