import { useState, useRef, useEffect } from 'react';
import { Camera, Image, Bot, CheckCircle, Clock, Lightbulb, Search, Scale, Coins, X, Palette, Microscope, Ruler, Sparkles } from 'lucide-react';
import { analyzeImage, fileToBase64 } from '../../services/PlasticScanService';
import './ScanModal.css';

const AI_STEPS = [
    { label: 'Reading image pixels…', Icon: Camera },
    { label: 'Detecting object boundaries…', Icon: Search },
    { label: 'Classifying plastic types…', Icon: Bot },
    { label: 'Estimating weight & volume…', Icon: Scale },
    { label: 'Calculating Up-Coin reward…', Icon: Coins },
];

const PERSONALIZE_STEPS = [
    { label: 'Analysing material grade', Icon: Microscope },
    { label: 'Matching craft patterns', Icon: Palette },
    { label: 'Measuring dimensions', Icon: Ruler },
    { label: 'Generating ideas', Icon: Lightbulb },
    { label: 'Ready!', Icon: CheckCircle },
];

export default function ScanModal({ onClose, onScanComplete }) {
    const [stage, setStage] = useState('choose');
    const [progress, setProgress] = useState(0);
    const [doneSteps, setDoneSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [personalizeStep, setPersonalizeStep] = useState(0);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [apiStatus, setApiStatus] = useState('');
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    useEffect(() => {
        if (stage !== 'processing') return;
        let prog = 0;
        const progInterval = setInterval(() => {
            prog += 1;
            setProgress(prev => Math.min(prev + 1, 90));
        }, 100);
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

    const processImage = async (file) => {
        try {
            setError(null);
            setApiStatus('');
            setStage('processing');
            setProgress(0);
            setDoneSteps([]);
            setActiveStep(0);
            const base64 = await fileToBase64(file);
            setUploadedImage(base64);
            const result = await analyzeImage(base64, (status) => {
                setApiStatus(status);
            });
            setScanResult(result);
            setProgress(100);
            setDoneSteps(AI_STEPS.map((_, i) => i));
            setTimeout(() => setStage('result'), 500);
        } catch (err) {
            console.error('[ScanModal] Error:', err);
            setError(err.message || 'Something went wrong');
            setStage('choose');
        }
    };

    const handleGalleryPick = (e) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    const handleCameraClick = () => {
        cameraInputRef.current?.click();
    };

    const handleCameraCapture = (e) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    const handleClaimClose = () => {
        if (scanResult && onScanComplete) {
            onScanComplete(scanResult);
        }
        onClose();
    };

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
                    <span className="sm-header-title"><Camera size={16} style={{ marginRight: 6 }} /> AI Plastic Scanner</span>
                    <button className="sm-close" onClick={onClose}><X size={16} /></button>
                </div>

                <div className="sm-body">

                    {/* STAGE 1: Choose */}
                    {stage === 'choose' && (
                        <div className="sm-stage-choose">
                            <div>
                                <h3>Scan Your Plastic Waste</h3>
                                <p>Our AI will instantly identify the plastic type, estimate weight, and credit your Up-Coin wallet.</p>
                            </div>

                            {error && (
                                <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, color: '#b91c1c', fontSize: 12, width: '100%' }}>
                                    {error}
                                </div>
                            )}

                            <div className="sm-options">
                                <button className="sm-option-btn" onClick={handleCameraClick}>
                                    <span className="sm-option-icon"><Camera size={24} /></span>
                                    <span className="sm-option-label">Open Camera</span>
                                    <span className="sm-option-sub">Take a live photo</span>
                                </button>
                                <button className="sm-option-btn" onClick={() => fileInputRef.current?.click()}>
                                    <span className="sm-option-icon"><Image size={24} /></span>
                                    <span className="sm-option-label">Choose from Gallery</span>
                                    <span className="sm-option-sub">Upload from your device</span>
                                </button>
                            </div>

                            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleGalleryPick} />
                            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleCameraCapture} />

                            <p style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Lightbulb size={12} /> Tip: Make sure the recycling triangle is visible for best results
                            </p>
                        </div>
                    )}

                    {/* STAGE 2: Processing */}
                    {stage === 'processing' && (
                        <div className="sm-stage-processing">
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 90, height: 90 }}>
                                <div className="sm-spinner" />
                                <Bot size={28} style={{ position: 'absolute', color: 'var(--clr-primary-700)' }} />
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
                                            {doneSteps.includes(i) ? <CheckCircle size={14} /> : i === activeStep ? <Clock size={14} /> : <span style={{ opacity: 0.3 }}>○</span>}
                                        </span>
                                        <step.Icon size={12} style={{ marginRight: 4, opacity: 0.7 }} />
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

                    {/* STAGE 3: Result */}
                    {stage === 'result' && (
                        <div>
                            <div className="sm-result-header">
                                {uploadedImage
                                    ? <img className="sm-result-thumb" src={uploadedImage} alt="scanned" />
                                    : <div className="sm-result-thumb-placeholder"><Bot size={24} /></div>
                                }
                                <div>
                                    <div className="sm-result-tag">
                                        <CheckCircle size={14} style={{ marginRight: 4, color: '#22c55e' }} />
                                        Classification Complete · {Math.round(resultConf * 100)}% Confidence
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
                                        <div className="sm-earn-label"><Coins size={14} style={{ marginRight: 4 }} /> Up-Coins Earned</div>
                                        <div className="sm-earn-value">+{resultCoins}</div>
                                        <div className="sm-earn-sub">Instant wallet credit</div>
                                    </div>
                                    <div className="sm-earn-box rupee">
                                        <div className="sm-earn-label"><Scale size={14} style={{ marginRight: 4 }} /> Cash Value</div>
                                        <div className="sm-earn-value">₹{resultRupees}</div>
                                        <div className="sm-earn-sub">On next cash-out</div>
                                    </div>
                                </div>
                            )}

                            <div className="sm-actions">
                                {resultItems.length > 0 && (
                                    <button className="sm-btn-primary" onClick={() => setStage('personalizing')}>
                                        <Palette size={14} style={{ marginRight: 4 }} /> Personalise Products
                                    </button>
                                )}
                                <button className="sm-btn-secondary" onClick={handleClaimClose}>
                                    {resultItems.length > 0 ? 'Claim & Close' : 'Close'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 4: Personalising */}
                    {stage === 'personalizing' && (
                        <div className="sm-personalizing">
                            <div className="sm-neural-anim">
                                <div className="sm-neural-ring" />
                                <div className="sm-neural-ring" />
                                <div className="sm-neural-ring" />
                                <div className="sm-neural-center"><Bot size={24} /></div>
                            </div>
                            <h3>AI Generating Ideas…</h3>
                            <p>Our creative AI is analysing your plastic types and finding the best upcycling possibilities for your materials.</p>

                            <div className="sm-personalize-steps">
                                {PERSONALIZE_STEPS.map((s, i) => (
                                    <span key={i} className={`sm-ps-step ${i < personalizeStep ? 'lit' : ''}`}>
                                        <s.Icon size={12} style={{ marginRight: 4 }} /> {s.label}
                                    </span>
                                ))}
                            </div>

                            <div className="sm-progress-bar" style={{ width: '100%' }}>
                                <div className="sm-progress-fill" style={{ width: `${(personalizeStep / PERSONALIZE_STEPS.length) * 100}%` }} />
                            </div>
                        </div>
                    )}

                    {/* STAGE 5: Custom product */}
                    {stage === 'custom' && (
                        <div className="sm-custom-result">
                            <span className="sm-custom-badge"><Sparkles size={14} style={{ marginRight: 4 }} /> AI Personalisation Complete</span>
                            <div className="sm-custom-title">Here's what you can create!</div>
                            <p className="sm-custom-subtitle">
                                From your {resultItems.map(i => `${i.count} ${i.name.toLowerCase()}`).join(' + ')}, our artisans can craft these premium upcycled products:
                            </p>

                            <div className="sm-custom-image-wrap">
                                <img src="/img/custom.png" alt="Upcycled product ideas" />
                            </div>

                            <div className="sm-custom-items">
                                <span className="sm-custom-item-pill">Decorative Vase</span>
                                <span className="sm-custom-item-pill">Woven Tote Bag</span>
                                <span className="sm-custom-item-pill">Candle Holder</span>
                                <span className="sm-custom-item-pill">Fabric Yarn</span>
                            </div>

                            <div className="sm-actions" style={{ width: '100%' }}>
                                <button className="sm-btn-primary" onClick={handleClaimClose}>
                                    Claim & Shop Products
                                </button>
                                <button className="sm-btn-secondary" onClick={handleClaimClose}>
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
