import { useState, useRef, useEffect } from 'react';
import './ScanModal.css';

// The 5 steps in the scan flow
// 1: pick source  2: scanning  3: result  4: ai-analysing  5: creative-result

const FAKE_SCAN_RESULT = {
    items: [
        {
            icon: '🍶',
            name: 'Transparent Water Bottles',
            qty: 2,
            unit: 'items',
            type: 'PET (Type 1) · Recyclable',
            weightKg: 0.48,
        },
        {
            icon: '🛍️',
            name: 'Plastic Polythene Bags',
            qty: 3,
            unit: 'items',
            type: 'LDPE (Type 4) · Recyclable',
            weightKg: 0.12,
        },
    ],
    totalWeightKg: 0.60,
    upCoins: 42,
    cashRs: 6.5,
};

const AI_STEPS = [
    'Analysing material composition...',
    'Mapping upcycling potential...',
    'Generating creative product ideas...',
];

export default function ScanModal({ onClose }) {
    const [step, setStep] = useState(1); // 1-5
    const [previewUrl, setPreviewUrl] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [aiStep, setAiStep] = useState(0);
    const fileInputRef = useRef();

    // After file picked → fake 2s scan
    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setScanning(true);
        setStep(2);
        setTimeout(() => {
            setScanning(false);
            setStep(3);
        }, 2200);
    };

    // Trigger file picker
    const pickGallery = () => fileInputRef.current.click();
    const pickCamera = () => {
        // Also triggers file input but with capture attribute trick
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.click();
    };

    // Personalise: animate AI steps then show result
    const handlePersonalise = () => {
        setStep(4);
        setAiStep(0);
    };

    useEffect(() => {
        if (step === 4) {
            let count = 0;
            const iv = setInterval(() => {
                count++;
                setAiStep(count);
                if (count >= AI_STEPS.length) {
                    clearInterval(iv);
                    setTimeout(() => setStep(5), 700);
                }
            }, 900);
            return () => clearInterval(iv);
        }
    }, [step]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="scan-modal-backdrop" onClick={onClose}>
            <div className="scan-modal" onClick={e => e.stopPropagation()}>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                />

                {/* --- HEADER --- */}
                <div className="scan-modal-header">
                    <span className="scan-modal-title">
                        {step === 1 && '📸 Scan Your Plastic'}
                        {step === 2 && '🔍 Analysing...'}
                        {step === 3 && '✅ Scan Result'}
                        {step === 4 && '🤖 AI Personalising...'}
                        {step === 5 && '✨ Creative Ideas!'}
                    </span>
                    <button className="scan-modal-close" onClick={onClose}>✕</button>
                </div>

                {/* --- BODY --- */}
                <div className="scan-modal-body">

                    {/* ── STEP 1: Pick source ── */}
                    {step === 1 && (
                        <>
                            <p className="scan-source-title">
                                How would you like to scan your plastic waste?
                            </p>
                            <div className="scan-source-options">
                                <div className="scan-source-btn" onClick={pickCamera}>
                                    <span className="scan-source-icon">📷</span>
                                    <span className="scan-source-label">Open Camera</span>
                                    <span className="scan-source-sub">Take a live photo</span>
                                </div>
                                <div className="scan-source-btn" onClick={pickGallery}>
                                    <span className="scan-source-icon">🖼️</span>
                                    <span className="scan-source-label">Choose from Gallery</span>
                                    <span className="scan-source-sub">Upload an existing photo</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ── STEP 2: Scanning animation ── */}
                    {step === 2 && (
                        <div className="scan-preview-area">
                            {previewUrl && (
                                <img src={previewUrl} alt="scan" className="scan-preview-img" />
                            )}
                            {scanning && (
                                <div className="scan-overlay">
                                    <div className="scan-line" />
                                    <span className="scan-corner tl" />
                                    <span className="scan-corner tr" />
                                    <span className="scan-corner bl" />
                                    <span className="scan-corner br" />
                                    <div className="scan-overlay-text">AI Scanning...</div>
                                    <div className="scan-dots">
                                        <div className="scan-dot" />
                                        <div className="scan-dot" />
                                        <div className="scan-dot" />
                                    </div>
                                    <div className="scan-overlay-sub">Detecting plastic type & quantity</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── STEP 3: Results ── */}
                    {step === 3 && (
                        <>
                            {/* Preview thumbnail */}
                            {previewUrl && (
                                <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16, height: 120 }}>
                                    <img src={previewUrl} alt="scan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}

                            <div className="scan-result-header">
                                <h3>Items Detected</h3>
                            </div>

                            <div className="scan-detected-items">
                                {FAKE_SCAN_RESULT.items.map((item, i) => (
                                    <div key={i} className="scan-detected-item" style={{ animationDelay: `${i * 0.14}s` }}>
                                        <span className="scan-item-icon">{item.icon}</span>
                                        <div className="scan-item-info">
                                            <div className="scan-item-name">{item.name}</div>
                                            <div className="scan-item-type">{item.type} · {item.weightKg} kg</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div className="scan-item-qty">×{item.qty}</div>
                                            <div className="scan-item-unit">{item.unit}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Earnings */}
                            <div className="scan-earnings">
                                <div className="scan-earning-item">
                                    <span className="scan-earning-label">🪙 Up-Coins Earned</span>
                                    <span className="scan-earning-value">+{FAKE_SCAN_RESULT.upCoins}</span>
                                    <span className="scan-earning-sub">Added to your wallet</span>
                                </div>
                                <div className="scan-earning-item">
                                    <span className="scan-earning-label">💰 Cash Value</span>
                                    <span className="scan-earning-value">₹{FAKE_SCAN_RESULT.cashRs}</span>
                                    <span className="scan-earning-sub">{FAKE_SCAN_RESULT.totalWeightKg} kg total · UPI payout</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="scan-actions">
                                <button className="scan-action-btn secondary" onClick={onClose}>
                                    ✅ Confirm Drop-off
                                </button>
                                <button className="scan-action-btn primary" onClick={handlePersonalise}>
                                    ✨ Personalise Products
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── STEP 4: AI analysing animation ── */}
                    {step === 4 && (
                        <div className="scan-ai-analyse">
                            <div className="scan-ai-brain">🤖</div>
                            <div>
                                <div className="scan-ai-text">AI is analysing your waste...</div>
                                <div className="scan-ai-sub">Finding the most creative upcycling possibilities for your specific plastic types</div>
                            </div>
                            <div className="scan-ai-progress" style={{ width: '100%' }}>
                                <div className="scan-ai-progress-bar-wrap">
                                    <div className="scan-ai-progress-bar" />
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--clr-text-muted)', textAlign: 'right' }}>Processing...</div>
                            </div>
                            <div className="scan-ai-steps">
                                {AI_STEPS.map((s, i) => (
                                    <div key={i} className="scan-ai-step" style={{ opacity: aiStep > i ? 1 : 0, animation: aiStep > i ? 'fadeIn 0.4s ease forwards' : 'none' }}>
                                        <span className="scan-ai-step-dot" style={{ background: aiStep > i ? 'var(--clr-primary-400)' : 'var(--clr-border)' }} />
                                        {s}
                                        {aiStep > i && <span style={{ marginLeft: 'auto', color: 'var(--clr-primary-500)', fontSize: 11 }}>✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── STEP 5: Creative personalise result ── */}
                    {step === 5 && (
                        <>
                            <div className="scan-creative-header">
                                <h3>🎨 Here's what we can make!</h3>
                                <p>From your 2 water bottles + 3 polythene bags, our artisans can create:</p>
                            </div>

                            <div className="scan-creative-img-wrap">
                                <img
                                    src="/img/custom.png"
                                    alt="Creative upcycled products"
                                    className="scan-creative-img"
                                    onError={e => {
                                        // Fallback placeholder if image not present yet
                                        e.target.style.display = 'none';
                                        e.target.parentNode.style.background = 'linear-gradient(135deg,#1a472a,#52b788)';
                                        e.target.parentNode.style.height = '200px';
                                        e.target.parentNode.style.display = 'flex';
                                        e.target.parentNode.style.alignItems = 'center';
                                        e.target.parentNode.style.justifyContent = 'center';
                                        e.target.parentNode.innerHTML += '<span style="font-size:60px">🏺💡🧩</span>';
                                    }}
                                />
                                <span className="scan-creative-img-badge">AI Generated Ideas</span>
                            </div>

                            <div className="scan-creative-tags">
                                {['Eco Lamp Shade', 'Woven Basket', 'Mosaic Frame', 'Plant Pot', 'Tote Bag'].map(t => (
                                    <span key={t} className="scan-creative-tag">{t}</span>
                                ))}
                            </div>

                            <div className="scan-actions">
                                <button className="scan-action-btn secondary" onClick={onClose}>
                                    Close
                                </button>
                                <button className="scan-action-btn primary" onClick={onClose}>
                                    🛍️ Order Custom Product
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
