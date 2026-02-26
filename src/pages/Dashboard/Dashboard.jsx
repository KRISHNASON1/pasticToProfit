import { Link } from 'react-router-dom';
import { getNewArrivals, getSaleProducts } from '../../data/products';
import { rewardsData, userImpactStats } from '../../data/stats';
import './Dashboard.css';

// Sample recommended products
// Top 5 recommended: mix of new arrivals + sale items
const recoProducts = [
    ...getNewArrivals().slice(0, 3),
    ...getSaleProducts().slice(0, 2),
];

// House pickup locations for the map
const houseLocations = [
    { x: '20%', y: '35%', name: 'Your Home', color: '#a7c957', isHome: true },
    { x: '40%', y: '55%', name: 'Block B', color: '#74c69d' },
    { x: '60%', y: '30%', name: 'Block C', color: '#74c69d' },
    { x: '75%', y: '60%', name: 'Sector 4', color: '#74c69d' },
    { x: '52%', y: '70%', name: 'Park Ave', color: '#52b788' },
];

// Agent position
const agentPos = { x: '48%', y: '45%' };

const miniStats = [
    { icon: '♻️', label: 'Plastic Contributed', val: `${userImpactStats.plasticContributed} kg`, pct: 62 },
    { icon: '🌱', label: 'CO₂ Saved', val: `${userImpactStats.co2Saved} kg`, pct: 49 },
    { icon: '📍', label: 'Drives Joined', val: userImpactStats.drivesJoined, pct: 50 },
    { icon: '📸', label: 'Items Scanned', val: userImpactStats.totalScans, pct: 78 },
];

export default function Dashboard() {
    const { balance, tier, nextTier, nextTierAt } = rewardsData;
    const tierPct = Math.round((balance / nextTierAt) * 100);

    return (
        <div className="page-wrapper">
            {/* Top bar */}
            <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 2 }}>
                        Good evening, Krishna 👋
                    </h1>
                    <p style={{ fontSize: 12, color: 'var(--clr-text-muted)' }}>
                        Thursday, 26 Feb 2026 — Your next pickup is scheduled for <strong>Friday, 8 AM</strong>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="db-notif-btn" title="Notifications">
                        🔔
                        <span className="db-notif-dot" />
                    </button>
                    <button className="db-notif-btn" title="Profile">👤</button>
                </div>
            </div>

            <div className="dashboard-page">

                {/* ── ROW 1: Quick cards ── */}
                <div className="db-cards">

                    {/* Points */}
                    <div className="db-card db-card-points">
                        <div className="db-card-label">🪙 Your Balance</div>
                        <div className="db-card-value">{balance.toLocaleString()}</div>
                        <div className="db-card-sub">Up-Coins · {tier} Tier</div>
                        <div style={{ marginTop: 2, marginBottom: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.6, marginBottom: 4 }}>
                                <span>{tier}</span><span>{nextTier} at {nextTierAt.toLocaleString()}</span>
                            </div>
                            <div style={{ height: 5, background: 'rgba(255,255,255,0.18)', borderRadius: 99, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${tierPct}%`, background: 'rgba(255,255,255,0.75)', borderRadius: 99 }} />
                            </div>
                        </div>
                        <span className="db-card-badge">🏆 Progress to {nextTier}: {tierPct}%</span>
                    </div>

                    {/* Scan */}
                    <div className="db-card db-card-scan">
                        <div className="db-card-label">📸 Scan Waste</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Classify & Earn</div>
                        <div style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginBottom: 8 }}>Snap a photo → instant coins</div>
                        <div className="db-card-scan-area">
                            <span className="scan-big-icon">📷</span>
                            <span>Tap to scan plastic</span>
                        </div>
                        <span className="db-card-badge green" style={{ marginTop: 10, display: 'inline-flex' }}>+25–500 🪙 per scan</span>
                    </div>

                    {/* Report */}
                    <div className="db-card">
                        <div className="db-card-label">📄 Impact Report</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Monthly Summary</div>
                        <div style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginBottom: 4 }}>Feb 2026</div>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 10, marginTop: 4 }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--clr-primary-700)' }}>12.4</div>
                                <div style={{ fontSize: 10, color: 'var(--clr-text-muted)' }}>kg plastic</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--clr-primary-700)' }}>24.8</div>
                                <div style={{ fontSize: 10, color: 'var(--clr-text-muted)' }}>kg CO₂</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--clr-primary-700)' }}>3</div>
                                <div style={{ fontSize: 10, color: 'var(--clr-text-muted)' }}>🌳</div>
                            </div>
                        </div>
                        <button className="db-card-report-btn">📥 Download Report</button>
                    </div>

                    {/* Mini stats — wide */}
                    <div className="db-card db-card-stats">
                        <div className="db-card-stats-label">📈 Your Impact</div>
                        <div className="db-stat-rows">
                            {miniStats.map(s => (
                                <div key={s.label} className="db-stat-row">
                                    <span className="db-stat-row-icon">{s.icon}</span>
                                    <span className="db-stat-row-label">{s.label}</span>
                                    <div className="db-stat-bar-wrap">
                                        <div className="db-stat-bar" style={{ width: `${s.pct}%` }} />
                                    </div>
                                    <span className="db-stat-row-val">{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── ROW 2: Map ── */}
                <div className="db-map-section">
                    <div className="db-map-header">
                        <div className="db-map-header-left">
                            <h3>🗺️ Live Agent Tracker</h3>
                            <p>Track your pickup agent's real-time location in your area</p>
                        </div>
                        <div className="db-map-status">
                            <span className="db-map-status-dot" />
                            Agent En Route · ETA 12 min
                        </div>
                    </div>

                    {/* SVG Map mockup */}
                    <div className="db-map-body">
                        <svg className="db-map-svg" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid slice">
                            {/* Dark map background grid */}
                            <rect width="800" height="260" fill="#0e1a14" />

                            {/* Road grid */}
                            {[60, 130, 200, 330, 430, 530, 660].map(x => (
                                <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#1a2e22" strokeWidth="18" />
                            ))}
                            {[50, 120, 190].map(y => (
                                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#1a2e22" strokeWidth="14" />
                            ))}

                            {/* Road markings */}
                            {[60, 130, 200, 330, 430, 530, 660].map(x => (
                                <line key={`d${x}`} x1={x} y1="0" x2={x} y2="260" stroke="#243d2c" strokeWidth="1" strokeDasharray="12 8" />
                            ))}
                            {[50, 120, 190].map(y => (
                                <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#243d2c" strokeWidth="1" strokeDasharray="12 8" />
                            ))}

                            {/* City blocks */}
                            {[
                                [10, 10, 40, 30], [80, 10, 30, 30], [145, 10, 40, 30],
                                [220, 10, 95, 50], [350, 10, 60, 30], [450, 10, 65, 30],
                                [10, 70, 40, 40], [80, 70, 30, 40], [145, 70, 40, 40],
                                [220, 70, 90, 40], [350, 70, 65, 40], [450, 70, 65, 40],
                                [580, 10, 60, 100], [680, 10, 110, 100],
                                [10, 140, 40, 50], [80, 140, 30, 50], [220, 140, 90, 50],
                                [350, 140, 65, 50], [450, 140, 65, 50], [580, 140, 60, 100],
                                [680, 140, 110, 100],
                                [10, 210, 40, 45], [80, 210, 30, 45], [145, 210, 40, 45],
                                [220, 210, 90, 45], [350, 210, 65, 45], [450, 210, 65, 45],
                            ].map(([x, y, w, h], i) => (
                                <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#14271c" opacity="0.9" />
                            ))}

                            {/* Route dashes from agent to home */}
                            <polyline
                                points="384,117 336,117 290,100 230,100 160,95"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="2.5"
                                strokeDasharray="8 5"
                                opacity="0.7"
                            />

                            {/* House pins */}
                            {houseLocations.map((h, i) => {
                                const cx = parseFloat(h.x) / 100 * 800;
                                const cy = parseFloat(h.y) / 100 * 260;
                                return (
                                    <g key={i}>
                                        <circle cx={cx} cy={cy} r={h.isHome ? 10 : 7} fill={h.color} opacity={h.isHome ? 1 : 0.7} />
                                        {h.isHome && <circle cx={cx} cy={cy} r={16} fill={h.color} opacity="0.2" />}
                                        <text x={cx} y={cy - (h.isHome ? 20 : 16)} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontWeight="600">
                                            {h.name}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Agent pin */}
                            <g>
                                <circle
                                    cx={parseFloat(agentPos.x) / 100 * 800}
                                    cy={parseFloat(agentPos.y) / 100 * 260}
                                    r="20"
                                    fill="rgba(34,197,94,0.2)"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx={parseFloat(agentPos.x) / 100 * 800}
                                    cy={parseFloat(agentPos.y) / 100 * 260}
                                    r="10"
                                    fill="#22c55e"
                                />
                                <text
                                    x={parseFloat(agentPos.x) / 100 * 800}
                                    y={parseFloat(agentPos.y) / 100 * 260 + 4}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="700"
                                >
                                    🚛
                                </text>
                                <text
                                    x={parseFloat(agentPos.x) / 100 * 800}
                                    y={parseFloat(agentPos.y) / 100 * 260 - 26}
                                    textAnchor="middle"
                                    fill="#22c55e"
                                    fontSize="10"
                                    fontWeight="700"
                                >
                                    Agent · ETA 12 min
                                </text>
                            </g>
                        </svg>
                    </div>

                    <div className="db-map-footer">
                        <span className="db-map-legend"><span className="db-map-legend-dot" style={{ background: '#22c55e' }} /> Agent</span>
                        <span className="db-map-legend"><span className="db-map-legend-dot" style={{ background: '#a7c957' }} /> Your Home</span>
                        <span className="db-map-legend"><span className="db-map-legend-dot" style={{ background: '#74c69d' }} /> Pickup Points</span>
                        <span className="db-pickup-info">📦 Next Pickup: Fri 27 Feb · 8:00 AM</span>
                    </div>
                </div>

                {/* ── ROW 3: Recommendations ── */}
                <div className="db-reco-section">
                    <div className="db-reco-header">
                        <h3>⭐ Top Picks for You</h3>
                        <Link to="/marketplace" className="db-reco-see-all">See all →</Link>
                    </div>
                    <div className="db-reco-grid">
                        {recoProducts.map(p => (
                            <div key={p.id} className="db-reco-card">
                                <div className="db-reco-img" style={{ background: p.gradient || 'var(--clr-bg)' }}>
                                    {p.image}
                                </div>
                                <div className="db-reco-info">
                                    <div className="db-reco-badge">{p.badge}</div>
                                    <div className="db-reco-name">{p.name}</div>
                                    <div>
                                        <span className="db-reco-price">₹{p.price}</span>
                                        {p.originalPrice && <span className="db-reco-orig">₹{p.originalPrice}</span>}
                                    </div>
                                    <div className="db-reco-coins">🪙 {p.upCoins} Up-Coins</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
