import { useState, useRef, useEffect } from 'react';
import { analyzeImage, fileToBase64 } from '../../services/PlasticScanService';
import './ScanModal.css';

const AI_STEPS = [
    { label: '📷 Reading image pixels…' },
    { label: '🔍 Detecting object boundaries…' },
    { label: '♻️ Classifying plastic types…' },
    { label: '⚖️ Estimating weight & volume…' },
    { label: '🪙 Calculating Up-Coin reward…' },
];

const PERSONALIZE_STEPS = [
    '🔬 Analysing material grade',
    '🎨 Matching craft patterns',
    '📐 Measuring dimensions',
    '💡 Generating ideas',
    '✅ Ready!',
];

export default function ScanModal({ onClose }) {
    const [stage, setStage] = useState('choose'); // choose | processing | result | personalizing | custom
    const [progress, setProgress] = useState(0);
    const [doneSteps, setDoneSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [personalizeStep, setPersonalizeStep] = useState(0);
    const [scanResult, setScanResult] = useState(null); // real result from API
    const [error, setError] = useState(null);
    const [apiStatus, setApiStatus] = useState(''); // live status from API (e.g. retry messages)
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // ── Processing animation (runs while API is in flight) ──
    useEffect(() => {
        if (stage !== 'processing') return;

        let prog = 0;
        const progInterval = setInterval(() => {
            prog += 1;
            setProgress(prev => Math.min(prev + 1, 90)); // cap at 90% until API finishes
        }, 100);

        // Animate step indicators (purely cosmetic)
        const timers = AI_STEPS.map((_, i) =>
            setTimeout(() => {
                setDoneSteps(prev => [...prev, i - 1]);
                setActiveStep(i);
            }, i * 1200)
        );

        return () => {
            clearInterval(progInterval);
            timers.forEach(clearTimeout);
        };
    }, [stage]);

    // ── Personalise animation ──
    useEffect(() => {
        if (stage !== 'personalizing') return;

        let step = 0;
        const interval = setInterval(() => {
            step += 1;
            setPersonalizeStep(step);
            if (step >= PERSONALIZE_STEPS.length) {
                clearInterval(interval);
                setTimeout(() => setStage('custom'), 600);
            }
        }, 700);

        return () => clearInterval(interval);
    }, [stage]);

    // ── Core: process an image (file or camera) ──
    const processImage = async (file) => {
        try {
            setError(null);
            setApiStatus('');
            setStage('processing');
            setProgress(0);
            setDoneSteps([]);
            setActiveStep(0);

            // Convert to base64
            const base64 = await fileToBase64(file);
            setUploadedImage(base64);

            // Call real API with status callback for retries
            const result = await analyzeImage(base64, (status) => {
                setApiStatus(status);
            });
            setScanResult(result);

            // Finish progress bar
            setProgress(100);
            setDoneSteps(AI_STEPS.map((_, i) => i));

            // Brief pause so user sees 100%
            setTimeout(() => setStage('result'), 500);
        } catch (err) {
            console.error('[ScanModal] Error:', err);
            setError(err.message || 'Something went wrong');
            setStage('choose');
        }
    };

    // ── Gallery pick ──
    const handleGalleryPick = (e) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    // ── Camera capture ──
    const handleCameraClick = () => {
        // On mobile, this opens the rear camera; on desktop, opens file picker
        cameraInputRef.current?.click();
    };

    const handleCameraCapture = (e) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    // Helpers for result display
    const resultItems = scanResult?.items || [];
    const resultCoins = scanResult?.totalCoins || 0;
    const resultRupees = scanResult?.totalRupees || 0;
    const resultConf = scanResult?.confidence || 0;
    const resultSource = scanResult?.source || 'fallback';

    return (
        <div className="scan-modal-overlay" onClick={onClose}>
            <div className="scan-modal" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="sm-header">
                    <span className="sm-header-title">📸 AI Plastic Scanner</span>
                    <button className="sm-close" onClick={onClose}>✕</button>
                </div>

                <div className="sm-body">

                    {/* ── STAGE 1: Choose input ── */}
                    {stage === 'choose' && (
                        <div className="sm-stage-choose">
                            <div>
                                <h3>Scan Your Plastic Waste</h3>
                                <p>Our AI will instantly identify the plastic type, estimate weight, and credit your Up-Coin wallet.</p>
                            </div>

                            {error && (
                                <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, color: '#b91c1c', fontSize: 12, width: '100%' }}>
                                    ⚠️ {error}
                                </div>
                            )}

                            <div className="sm-options">
                                <button className="sm-option-btn" onClick={handleCameraClick}>
                                    <span className="sm-option-icon">📷</span>
                                    <span className="sm-option-label">Open Camera</span>
                                    <span className="sm-option-sub">Take a live photo</span>
                                </button>
                                <button className="sm-option-btn" onClick={() => fileInputRef.current?.click()}>
                                    <span className="sm-option-icon">🖼️</span>
                                    <span className="sm-option-label">Choose from Gallery</span>
                                    <span className="sm-option-sub">Upload from your device</span>
                                </button>
                            </div>

                            {/* Hidden file inputs */}
                            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleGalleryPick} />
                            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleCameraCapture} />

                            <p style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginTop: 4 }}>
                                💡 Tip: Make sure the ♻️ recycling triangle is visible for best results
                            </p>
                        </div>
                    )}

                    {/* ── STAGE 2: Processing ── */}
                    {stage === 'processing' && (
                        <div className="sm-stage-processing">
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 90, height: 90 }}>
                                <div className="sm-spinner" />
                                <span style={{ position: 'absolute', fontSize: 28 }}>🤖</span>
                            </div>
                            <h3>AI Vision Analysing…</h3>
                            <p>Our computer vision model is reading your photo and classifying materials in real-time.</p>

                            <div className="sm-progress-bar" style={{ width: '100%' }}>
                                <div className="sm-progress-fill" style={{ width: `${progress}%` }} />
                            </div>

                            <div className="sm-ai-steps">
                                {AI_STEPS.map((step, i) => (
                                    <div key={i} className={`sm-ai-step ${doneSteps.includes(i) ? 'done' : i === activeStep ? 'active' : ''}`}>
                                        <span className="sm-ai-step-icon">
                                            {doneSteps.includes(i) ? '✅' : i === activeStep ? '⏳' : '○'}
                                        </span>
                                        {step.label}
                                    </div>
                                ))}
                            </div>

                            {apiStatus && (
                                <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 8, fontSize: 12, color: '#b45309', textAlign: 'center' }}>
                                    {apiStatus}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── STAGE 3: Result ── */}
                    {stage === 'result' && (
                        <div>
                            <div className="sm-result-header">
                                {uploadedImage
                                    ? <img className="sm-result-thumb" src={uploadedImage} alt="scanned" />
                                    : <div className="sm-result-thumb-placeholder">♻️</div>
                                }
                                <div>
                                    <div className="sm-result-tag">
                                        ✅ Classification Complete · {Math.round(resultConf * 100)}% Confidence
                                        {resultSource !== 'fallback' && <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.6 }}>via {resultSource === 'gemini' ? 'Gemini AI' : 'Google Vision'}</span>}
                                    </div>
                                    <div className="sm-result-title">
                                        {resultItems.length > 0 ? 'Waste Detected!' : 'No Plastic Found'}
                                    </div>
                                </div>
                            </div>

                            {resultItems.length > 0 && (
                                <div className="sm-detected-items">
                                    <div className="sm-detected-label">Detected Items</div>
                                    {resultItems.map((item, i) => (
                                        <div key={i} className="sm-item-row">
                                            <span className="sm-item-icon">{item.icon}</span>
                                            <div className="sm-item-info">
                                                <div className="sm-item-name">{item.name}</div>
                                                <div className="sm-item-type">{item.type}</div>
                                            </div>
                                            <span className="sm-item-count">×{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {resultItems.length > 0 && (
                                <div className="sm-earnings">
                                    <div className="sm-earn-box coins">
                                        <div className="sm-earn-label">🪙 Up-Coins Earned</div>
                                        <div className="sm-earn-value">+{resultCoins}</div>
                                        <div className="sm-earn-sub">Instant wallet credit</div>
                                    </div>
                                    <div className="sm-earn-box rupee">
                                        <div className="sm-earn-label">💸 Cash Value</div>
                                        <div className="sm-earn-value">₹{resultRupees}</div>
                                        <div className="sm-earn-sub">On next cash-out</div>
                                    </div>
                                </div>
                            )}

                            <div className="sm-actions">
                                {resultItems.length > 0 && (
                                    <button className="sm-btn-primary" onClick={() => setStage('personalizing')}>
                                        🎨 Personalise Products
                                    </button>
                                )}
                                <button className="sm-btn-secondary" onClick={onClose}>
                                    {resultItems.length > 0 ? 'Claim & Close' : 'Close'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STAGE 4: Personalising ── */}
                    {stage === 'personalizing' && (
                        <div className="sm-personalizing">
                            <div className="sm-neural-anim">
                                <div className="sm-neural-ring" />
                                <div className="sm-neural-ring" />
                                <div className="sm-neural-ring" />
                                <div className="sm-neural-center">🧠</div>
                            </div>
                            <h3>AI Generating Ideas…</h3>
                            <p>Our creative AI is analysing your plastic types and finding the best upcycling possibilities for your materials.</p>

                            <div className="sm-personalize-steps">
                                {PERSONALIZE_STEPS.map((s, i) => (
                                    <span key={i} className={`sm-ps-step ${i < personalizeStep ? 'lit' : ''}`}>{s}</span>
                                ))}
                            </div>

                            <div className="sm-progress-bar" style={{ width: '100%' }}>
                                <div className="sm-progress-fill" style={{ width: `${(personalizeStep / PERSONALIZE_STEPS.length) * 100}%` }} />
                            </div>
                        </div>
                    )}

                    {/* ── STAGE 5: Custom product image ── */}
                    {stage === 'custom' && (
                        <div className="sm-custom-result">
                            <span className="sm-custom-badge">✨ AI Personalisation Complete</span>
                            <div className="sm-custom-title">Here's what you can create!</div>
                            <p className="sm-custom-subtitle">
                                From your {resultItems.map(i => `${i.count} ${i.name.toLowerCase()}`).join(' + ')}, our artisans can craft these premium upcycled products:
                            </p>

                            <div className="sm-custom-image-wrap">
                                <img src="/img/custom.png" alt="Upcycled product ideas" />
                            </div>

                            <div className="sm-custom-items">
                                <span className="sm-custom-item-pill">🏺 Decorative Vase</span>
                                <span className="sm-custom-item-pill">🛍️ Woven Tote Bag</span>
                                <span className="sm-custom-item-pill">🕯️ Candle Holder</span>
                                <span className="sm-custom-item-pill">🧵 Fabric Yarn</span>
                            </div>

                            <div className="sm-actions" style={{ width: '100%' }}>
                                <button className="sm-btn-primary" onClick={onClose}>
                                    🛍️ Shop These Products
                                </button>
                                <button className="sm-btn-secondary" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
