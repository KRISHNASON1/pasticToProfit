import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { rewardsData, userImpactStats } from '../../data/stats';
import ScanModal from '../../components/ScanModal/ScanModal';
import {
    Bell, User, Coins, Camera, FileText, TrendingUp, Recycle, Leaf,
    MapPin, ScanLine, Package, Star, Download, Trophy, Truck, X
} from 'lucide-react';
import './Dashboard.css';

const houseLocations = [
    { x: '20%', y: '35%', name: 'Your Home', color: '#a7c957', isHome: true },
    { x: '40%', y: '55%', name: 'Block B', color: '#74c69d' },
    { x: '60%', y: '30%', name: 'Block C', color: '#74c69d' },
    { x: '75%', y: '60%', name: 'Sector 4', color: '#74c69d' },
    { x: '52%', y: '70%', name: 'Park Ave', color: '#52b788' },
];

const agentPos = { x: '48%', y: '45%' };

const recentNotifications = [
    { id: 1, text: 'Campus drive completed at IIT Delhi — 450 kg collected', time: '2h ago' },
    { id: 2, text: 'You earned +120 Up-Coins from your last scan', time: '5h ago' },
    { id: 3, text: 'New eco-products added to marketplace', time: '1d ago' },
    { id: 4, text: 'Sunday pickup scheduled for your area', time: '1d ago' },
    { id: 5, text: 'User milestone: 1000th sign-up!', time: '2d ago' },
];

// Get next Sunday
function getNextSunday() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
    const nextSun = new Date(now);
    nextSun.setDate(now.getDate() + daysUntilSunday);
    return nextSun.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
}

export default function Dashboard() {
    const { user, addToBag } = useAuth();
    const navigate = useNavigate();
    const { balance, tier, nextTier, nextTierAt } = rewardsData;
    const tierPct = Math.round(((user?.upCoins || balance) / nextTierAt) * 100);
    const [scanOpen, setScanOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const firstName = user?.name?.split(' ')[0] || 'User';
    const userBalance = user?.upCoins ?? balance;
    const userTier = user?.tier || tier;
    const bag = user?.bag || [];

    const miniStats = [
        { Icon: Recycle, label: 'Plastic Contributed', val: `${user?.plasticContributed || 0} kg`, pct: 62 },
        { Icon: Leaf, label: 'CO₂ Saved', val: `${user?.co2Saved || 0} kg`, pct: 49 },
        { Icon: MapPin, label: 'Drives Joined', val: user?.drivesJoined || 0, pct: 50 },
        { Icon: ScanLine, label: 'Items Scanned', val: user?.totalScans || 0, pct: 78 },
    ];
    const [recoProducts, setRecoProducts] = useState([]);

    useEffect(() => {
        fetch((import.meta.env.VITE_API_URL || '') + '/api/products')
            .then(res => res.json())
            .then(data => {
                const prods = data.products || [];
                const newItems = prods.filter(p => p.isNewProduct).slice(0, 3);
                const saleItems = prods.filter(p => p.onSale && !p.isNewProduct).slice(0, 2);
                setRecoProducts([...newItems, ...saleItems]);
            })
            .catch(console.error);
    }, []);

    // Close notification dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleScanComplete = async (result) => {
        if (!result || !result.items?.length) return;
        try {
            await addToBag(result.items, result.totalCoins || 0);
        } catch (err) {
            console.error('Failed to add to bag:', err);
        }
    };

    const handleDownloadReport = () => {
        const reportDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const report = [
            `╔══════════════════════════════════════════╗`,
            `║    PLASTICTO PROFIT — IMPACT REPORT      ║`,
            `╚══════════════════════════════════════════╝`,
            ``,
            `User:       ${user?.name || 'N/A'}`,
            `Email:      ${user?.email || 'N/A'}`,
            `Period:     ${reportDate}`,
            `Tier:       ${userTier}`,
            ``,
            `── YOUR IMPACT ──────────────────────────`,
            `  Plastic Contributed:  12.4 kg`,
            `  CO₂ Saved:            24.8 kg`,
            `  Trees Equivalent:     3`,
            `  Up-Coins Balance:     ${userBalance}`,
            `  Total Scans:          ${user?.totalScans || 0}`,
            ``,
            `── PICKUP BAG (${bag.length} items) ──────────────`,
            ...bag.map(item => `  • ${item.name} (×${item.count}) — ${item.type || item.plasticCode || 'N/A'} — +${item.coins} coins`),
            bag.length === 0 ? '  No items in bag.' : '',
            ``,
            `── RECENT TRANSACTIONS ──────────────────`,
            ...(user?.transactions || []).slice(-10).reverse().map(tx =>
                `  ${tx.amount > 0 ? '+' : ''}${tx.amount} — ${tx.action} — ${new Date(tx.date).toLocaleDateString()}`
            ),
            (user?.transactions || []).length === 0 ? '  No transactions yet.' : '',
            ``,
            `──────────────────────────────────────────`,
            `Generated on ${new Date().toLocaleString()}`,
            `Thank you for contributing to the circular economy!`,
        ].join('\n');

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `impact-report-${reportDate.replace(/\s/g, '-').toLowerCase()}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="page-wrapper">
            {scanOpen && <ScanModal onClose={() => setScanOpen(false)} onScanComplete={handleScanComplete} />}
            {/* Top bar */}
            <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 2 }}>
                        Good evening, {firstName}
                    </h1>
                    <p style={{ fontSize: 12, color: 'var(--clr-text-muted)' }}>
                        Your next pickup is scheduled for <strong>{getNextSunday()}</strong>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    {/* Notification bell */}
                    <div ref={notifRef} style={{ position: 'relative' }}>
                        <button className="db-notif-btn" title="Notifications" onClick={() => setNotifOpen(p => !p)}>
                            <Bell size={16} />
                            <span className="db-notif-dot" />
                        </button>
                        {notifOpen && (
                            <div className="db-notif-dropdown">
                                <div className="db-notif-dropdown-header">
                                    <span style={{ fontWeight: 700, fontSize: 13 }}>Notifications</span>
                                    <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}><X size={14} /></button>
                                </div>
                                {recentNotifications.map(n => (
                                    <div key={n.id} className="db-notif-item">
                                        <div className="db-notif-item-text">{n.text}</div>
                                        <div className="db-notif-item-time">{n.time}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Profile button */}
                    <button className="db-notif-btn" title="Profile" onClick={() => navigate('/settings')}>
                        <User size={16} />
                    </button>
                </div>
            </div>

            <div className="dashboard-page">

                {/* ROW 1: Quick cards */}
                <div className="db-cards">

                    {/* Points */}
                    <div className="db-card db-card-points">
                        <div className="db-card-label"><Coins size={14} style={{ marginRight: 4 }} /> Your Balance</div>
                        <div className="db-card-value">{userBalance.toLocaleString()}</div>
                        <div className="db-card-sub">Up-Coins · {userTier} Tier</div>
                        <div style={{ marginTop: 2, marginBottom: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.6, marginBottom: 4 }}>
                                <span>{userTier}</span><span>{nextTier} at {nextTierAt.toLocaleString()}</span>
                            </div>
                            <div style={{ height: 5, background: 'rgba(255,255,255,0.18)', borderRadius: 99, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${tierPct}%`, background: 'rgba(255,255,255,0.75)', borderRadius: 99 }} />
                            </div>
                        </div>
                        <span className="db-card-badge"><Trophy size={12} style={{ marginRight: 4 }} /> Progress to {nextTier}: {tierPct}%</span>
                    </div>

                    {/* Scan */}
                    <div className="db-card db-card-scan" onClick={() => setScanOpen(true)} style={{ cursor: 'pointer' }}>
                        <div className="db-card-label"><Camera size={14} style={{ marginRight: 4 }} /> Scan Waste</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Classify & Earn</div>
                        <div style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginBottom: 8 }}>Snap a photo → instant coins</div>
                        <div className="db-card-scan-area">
                            <span className="scan-big-icon"><Camera size={28} /></span>
                            <span>Tap to scan plastic</span>
                        </div>
                        <span className="db-card-badge green" style={{ marginTop: 10, display: 'inline-flex' }}>+25–500 <Coins size={12} style={{ marginLeft: 3 }} /> per scan</span>
                    </div>

                    {/* Report */}
                    <div className="db-card">
                        <div className="db-card-label"><FileText size={14} style={{ marginRight: 4 }} /> Impact Report</div>
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
                                <div style={{ fontSize: 10, color: 'var(--clr-text-muted)' }}><Leaf size={12} /></div>
                            </div>
                        </div>
                        <button className="db-card-report-btn" onClick={handleDownloadReport}><Download size={13} style={{ marginRight: 4 }} /> Download Report</button>
                    </div>

                    {/* Mini stats */}
                    <div className="db-card db-card-stats">
                        <div className="db-card-stats-label"><TrendingUp size={14} style={{ marginRight: 4 }} /> Your Impact</div>
                        <div className="db-stat-rows">
                            {miniStats.map(s => (
                                <div key={s.label} className="db-stat-row">
                                    <span className="db-stat-row-icon"><s.Icon size={14} /></span>
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

                {/* ROW 2: Map */}
                <div className="db-map-section">
                    <div className="db-map-header">
                        <div className="db-map-header-left">
                            <h3><MapPin size={16} style={{ marginRight: 4 }} /> Live Agent Tracker</h3>
                            <p>Track your pickup agent's real-time location in your area</p>
                        </div>
                        <div className="db-map-status">
                            <span className="db-map-status-dot" />
                            Agent En Route · ETA 12 min
                        </div>
                    </div>

                    {/* SVG Map */}
                    <div className="db-map-body">
                        <svg className="db-map-svg" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid slice">
                            <rect width="800" height="260" fill="#0e1a14" />
                            {[60, 130, 200, 330, 430, 530, 660].map(x => (
                                <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#1a2e22" strokeWidth="18" />
                            ))}
                            {[50, 120, 190].map(y => (
                                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#1a2e22" strokeWidth="14" />
                            ))}
                            {[60, 130, 200, 330, 430, 530, 660].map(x => (
                                <line key={`d${x}`} x1={x} y1="0" x2={x} y2="260" stroke="#243d2c" strokeWidth="1" strokeDasharray="12 8" />
                            ))}
                            {[50, 120, 190].map(y => (
                                <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#243d2c" strokeWidth="1" strokeDasharray="12 8" />
                            ))}
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
                            <polyline
                                points="384,117 336,117 290,100 230,100 160,95"
                                fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="8 5" opacity="0.7"
                            />
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
                            <g>
                                <circle cx={parseFloat(agentPos.x) / 100 * 800} cy={parseFloat(agentPos.y) / 100 * 260} r="20" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" />
                                <circle cx={parseFloat(agentPos.x) / 100 * 800} cy={parseFloat(agentPos.y) / 100 * 260} r="10" fill="#22c55e" />
                                <text x={parseFloat(agentPos.x) / 100 * 800} y={parseFloat(agentPos.y) / 100 * 260 - 26} textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="700">
                                    Agent · ETA 12 min
                                </text>
                            </g>
                        </svg>
                    </div>

                    <div className="db-map-footer">
                        <span className="db-map-legend"><span className="db-map-legend-dot" style={{ background: '#22c55e' }} /> Agent</span>
                        <span className="db-map-legend"><span className="db-map-legend-dot" style={{ background: '#a7c957' }} /> Your Home</span>
                        <span className="db-map-legend"><span className="db-map-legend-dot" style={{ background: '#74c69d' }} /> Pickup Points</span>
                        <span className="db-pickup-info"><Package size={13} style={{ marginRight: 4 }} /> Next Pickup: {getNextSunday()}</span>
                    </div>

                    {/* Pickup Bag */}
                    {bag.length > 0 && (
                        <div className="db-bag-section">
                            <div className="db-bag-header">
                                <h4><Package size={15} style={{ marginRight: 6 }} /> Pickup Bag ({bag.length} items)</h4>
                                <span className="db-bag-pickup-date"><Truck size={13} style={{ marginRight: 4 }} /> Pickup: {getNextSunday()}</span>
                            </div>
                            <div className="db-bag-items">
                                {bag.map((item, i) => (
                                    <div key={i} className="db-bag-item">
                                        <span className="db-bag-item-icon">{item.icon || '♻️'}</span>
                                        <div className="db-bag-item-info">
                                            <span className="db-bag-item-name">{item.name}</span>
                                            <span className="db-bag-item-type">{item.type || item.plasticCode}</span>
                                        </div>
                                        <span className="db-bag-item-count">×{item.count}</span>
                                        <span className="db-bag-item-coins"><Coins size={11} /> +{item.coins}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="db-bag-total">
                                <span>Total earned: </span>
                                <strong><Coins size={13} style={{ marginRight: 2 }} /> {bag.reduce((s, i) => s + (i.coins || 0), 0)} Up-Coins</strong>
                            </div>
                        </div>
                    )}
                </div>

                {/* ROW 3: Recommendations */}
                <div className="db-reco-section">
                    <div className="db-reco-header">
                        <h3><Star size={16} style={{ marginRight: 4 }} /> Top Picks for You</h3>
                        <Link to="/marketplace" className="db-reco-see-all">See all →</Link>
                    </div>
                    <div className="db-reco-grid">
                        {recoProducts.map(p => (
                            <div key={p.id} className="db-reco-card">
                                <div className="db-reco-img" style={{ background: p.gradient || 'var(--clr-bg)' }}>
                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="db-reco-info">
                                    <div className="db-reco-badge">{p.badge}</div>
                                    <div className="db-reco-name">{p.name}</div>
                                    <div>
                                        <span className="db-reco-price">₹{p.price}</span>
                                        {p.originalPrice && <span className="db-reco-orig">₹{p.originalPrice}</span>}
                                    </div>
                                    <div className="db-reco-coins"><Coins size={12} style={{ marginRight: 3 }} /> {p.upCoins} Up-Coins</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
