import { useState } from 'react';
import Header from '../../components/Header/Header';
import { recentScans, plasticTypeGuide } from '../../data/stats';
import './AIScan.css';

// Simulated AI result
const mockResults = [
    { type: 'PET (Type 1)', item: 'Water Bottle', weight: '0.32 kg', coins: 22, confidence: 96 },
    { type: 'HDPE (Type 2)', item: 'Shampoo Bottle', weight: '0.45 kg', coins: 38, confidence: 94 },
    { type: 'PP (Type 5)', item: 'Food Container', weight: '0.18 kg', coins: 11, confidence: 89 },
];

export default function AIScan() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        setScanResult(null);
        // Simulate AI processing
        setTimeout(() => {
            const result = mockResults[Math.floor(Math.random() * mockResults.length)];
            setScanResult(result);
            setIsScanning(false);
        }, 1800);
    };

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="scan-page">
                <h1 className="scan-page-title">📸 AI Scan & Classify</h1>
                <p className="scan-page-sub">Snap a photo of your plastic waste. Our AI instantly classifies the type and credits your wallet with Up-Coins.</p>

                {/* Scan layout */}
                <div className="scan-layout">
                    {/* Upload zone */}
                    <div
                        className={`scan-upload-card ${isScanning ? 'active' : ''}`}
                        onClick={handleScan}
                    >
                        <div className="scan-upload-icon">
                            {isScanning ? '⏳' : '📷'}
                        </div>
                        <div className="scan-upload-title">
                            {isScanning ? 'Analyzing...' : 'Snap or Upload Plastic'}
                        </div>
                        <div className="scan-upload-desc">
                            {isScanning
                                ? 'Our AI Vision API is reading the recycling triangle and classifying your plastic...'
                                : 'Take a photo showing the recycling triangle (♻️) on your plastic item. The AI handles the rest.'
                            }
                        </div>
                        {!isScanning && (
                            <>
                                <button className="scan-upload-btn" onClick={(e) => { e.stopPropagation(); handleScan(); }}>
                                    📸 Take Photo
                                </button>
                                <span className="scan-upload-or">— or —</span>
                                <span className="scan-upload-drag">Click anywhere to simulate a scan</span>
                            </>
                        )}
                    </div>

                    {/* Result card */}
                    <div className="scan-result-card">
                        {!scanResult && !isScanning ? (
                            <div className="scan-result-empty">
                                <span className="scan-result-empty-icon">🔬</span>
                                <p>Scan a plastic item to see<br />AI classification results here</p>
                                <p style={{ fontSize: 11 }}>No manual data entry needed!</p>
                            </div>
                        ) : isScanning ? (
                            <div className="scan-result-empty">
                                <span className="scan-result-empty-icon" style={{ animation: 'pulse 1s ease infinite' }}>🤖</span>
                                <p>AI Vision Processing...</p>
                                <p style={{ fontSize: 11 }}>Reading recycling triangle via OCR</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="scan-result-title">✅ Classification Result</h3>
                                <div className="scan-result-item">
                                    <div className="scan-result-type">
                                        <span className="scan-result-type-name">{scanResult.type}</span>
                                        <span className="scan-result-confidence">{scanResult.confidence}% match</span>
                                    </div>
                                    <div className="scan-result-details">
                                        <div className="scan-result-detail">
                                            <span className="scan-result-detail-label">Item</span>
                                            <span className="scan-result-detail-value">{scanResult.item}</span>
                                        </div>
                                        <div className="scan-result-detail">
                                            <span className="scan-result-detail-label">Est. Weight</span>
                                            <span className="scan-result-detail-value">{scanResult.weight}</span>
                                        </div>
                                        <div className="scan-result-detail">
                                            <span className="scan-result-detail-label">Plastic Type</span>
                                            <span className="scan-result-detail-value">{scanResult.type.split(' ')[0]}</span>
                                        </div>
                                        <div className="scan-result-detail">
                                            <span className="scan-result-detail-label">Classification</span>
                                            <span className="scan-result-detail-value">Recyclable ✅</span>
                                        </div>
                                    </div>
                                    <div className="scan-result-coins">
                                        🪙 +{scanResult.coins} Up-Coins Earned!
                                    </div>
                                </div>
                                <button className="scan-upload-btn" style={{ alignSelf: 'center', marginTop: 8 }} onClick={handleScan}>
                                    📸 Scan Another Item
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Tips */}
                <div className="scan-tips-card">
                    <h3 className="scan-tips-title">💡 Tips for Better Scans</h3>
                    <div className="scan-tips-grid">
                        <div className="scan-tip">
                            <span className="scan-tip-icon">♻️</span>
                            <div className="scan-tip-text">
                                <strong>Find the Triangle</strong>
                                Look for the recycling triangle with a number inside — usually on the bottom of the item
                            </div>
                        </div>
                        <div className="scan-tip">
                            <span className="scan-tip-icon">💡</span>
                            <div className="scan-tip-text">
                                <strong>Good Lighting</strong>
                                Make sure the recycling code is clearly visible with no shadows
                            </div>
                        </div>
                        <div className="scan-tip">
                            <span className="scan-tip-icon">🧹</span>
                            <div className="scan-tip-text">
                                <strong>Clean & Dry</strong>
                                Rinse and dry your plastic before scanning for higher Up-Coin rates
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plastic Type Guide */}
                <div className="plastic-guide">
                    <h3 className="plastic-guide-title">📋 Accepted Plastic Types & Rates</h3>
                    <div className="plastic-guide-grid">
                        {plasticTypeGuide.map(p => (
                            <div key={p.code} className="plastic-guide-item">
                                <div className="plastic-guide-code" style={{ background: p.color }}>
                                    {p.code}
                                </div>
                                <div className="plastic-guide-name">{p.name}</div>
                                <div className="plastic-guide-full">{p.full}</div>
                                <div className="plastic-guide-examples">{p.examples}</div>
                                <span className="plastic-guide-rate">🪙 {p.rate}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Scans */}
                <div className="recent-scans-card">
                    <h3 className="recent-scans-title">📋 Recent Scans</h3>
                    {recentScans.map(scan => (
                        <div key={scan.id} className="recent-scan-item">
                            <span className="recent-scan-icon">♻️</span>
                            <div className="recent-scan-info">
                                <div className="recent-scan-type">{scan.item} — {scan.type}</div>
                                <div className="recent-scan-meta">{scan.weight} • {scan.time}</div>
                            </div>
                            <span className="recent-scan-coins">+{scan.coins} 🪙</span>
                            <span className="recent-scan-confidence">{scan.confidence}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
