import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { rewardsData, collectionDrives, recentScans, userImpactStats, howItWorksSteps } from '../../data/stats';
import './Home.css';

export default function Home() {
    const { balance, tier } = rewardsData;

    // Find the next active or upcoming drive
    const nextDrive = collectionDrives.find(d => d.status === 'active') || collectionDrives.find(d => d.status === 'upcoming');

    // Recent user activities
    const userActivities = [
        { icon: '📸', text: 'Scanned a PET Water Bottle', coins: '+25', time: '2h ago' },
        { icon: '📍', text: 'Joined DTU Youth Fest Recycle drive', coins: '', time: '1 day ago' },
        { icon: '🪙', text: 'Earned 350 coins from Campus Drive Drop-off', coins: '+350', time: '2 days ago' },
        { icon: '🛍️', text: 'Used 200 coins on Marketplace discount', coins: '-200', time: '3 days ago' },
        { icon: '📸', text: 'Scanned an HDPE Milk Jug', coins: '+40', time: '4 days ago' },
    ];

    return (
        <div className="page-wrapper">
            <Header
                showTabs={false}
            />
            <div className="home-page">
                {/* Welcome Hero */}
                <div className="welcome-hero">
                    <div className="welcome-left">
                        <div className="welcome-greeting">Welcome back</div>
                        <h1 className="welcome-name">Krishna Soni 👋</h1>
                        <p className="welcome-subtitle">
                            Turn your plastic waste into rewards. Find a drive, drop off, and earn Up-Coins!
                        </p>
                    </div>
                    <div className="welcome-right">
                        <div className="welcome-balance-box">
                            <div className="welcome-balance-label">Your Balance</div>
                            <div className="welcome-balance-value">
                                <span className="welcome-balance-coin">🪙</span>
                                {balance.toLocaleString()}
                            </div>
                            <div className="welcome-tier">
                                Tier: <span className="welcome-tier-badge">🏆 {tier}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="quick-actions-title">⚡ Quick Actions</h2>
                <div className="quick-actions">
                    <Link to="/drives" className="quick-action-card">
                        <div className="quick-action-icon">📍</div>
                        <div className="quick-action-title">Find a Drive</div>
                        <div className="quick-action-desc">
                            Locate an upcoming Recycling Sprint near your campus, tech park, or neighborhood
                        </div>
                        <span className="quick-action-btn">Browse drives →</span>
                    </Link>
                    <Link to="/scan" className="quick-action-card">
                        <div className="quick-action-icon">📸</div>
                        <div className="quick-action-title">Scan Plastic</div>
                        <div className="quick-action-desc">
                            Snap a photo of your plastic waste — AI classifies it instantly and credits your wallet
                        </div>
                        <span className="quick-action-btn">Start scanning →</span>
                    </Link>
                    <Link to="/marketplace" className="quick-action-card">
                        <div className="quick-action-icon">🛍️</div>
                        <div className="quick-action-title">Shop Marketplace</div>
                        <div className="quick-action-desc">
                            Use your Up-Coins for 30-50% off luxury upcycled goods, DIY kits, and eco-products
                        </div>
                        <span className="quick-action-btn">Shop now →</span>
                    </Link>
                </div>

                {/* Next Drive */}
                {nextDrive && (
                    <>
                        <h2 className="quick-actions-title">📅 Your Next Drive</h2>
                        <Link to="/drives" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="next-drive-card">
                                <div className="next-drive-icon">{nextDrive.icon}</div>
                                <div className="next-drive-info">
                                    <div className="next-drive-label">
                                        {nextDrive.status === 'active' ? '🟢 Active Now' : '📅 Upcoming'}
                                    </div>
                                    <div className="next-drive-name">{nextDrive.name}</div>
                                    <div className="next-drive-meta">
                                        <span>📍 {nextDrive.location}</span>
                                        <span>📆 {nextDrive.dateStart} → {nextDrive.dateEnd}</span>
                                        <span>👥 {nextDrive.registered}/{nextDrive.capacity} joined</span>
                                    </div>
                                </div>
                                <span className={`next-drive-status ${nextDrive.status}`}>
                                    {nextDrive.status === 'active' ? 'Drop Off Now' : 'View Details'}
                                </span>
                            </div>
                        </Link>
                    </>
                )}

                {/* Impact Stats */}
                <h2 className="quick-actions-title" style={{ marginTop: 4 }}>🌍 Your Impact</h2>
                <div className="impact-grid">
                    <div className="impact-card">
                        <div className="impact-card-icon">♻️</div>
                        <div className="impact-card-value">
                            {userImpactStats.plasticContributed}
                            <span className="impact-card-unit">kg</span>
                        </div>
                        <div className="impact-card-label">Plastic Contributed</div>
                    </div>
                    <div className="impact-card">
                        <div className="impact-card-icon">🌱</div>
                        <div className="impact-card-value">
                            {userImpactStats.co2Saved}
                            <span className="impact-card-unit">kg</span>
                        </div>
                        <div className="impact-card-label">CO₂ Saved</div>
                    </div>
                    <div className="impact-card">
                        <div className="impact-card-icon">📍</div>
                        <div className="impact-card-value">{userImpactStats.drivesJoined}</div>
                        <div className="impact-card-label">Drives Joined</div>
                    </div>
                    <div className="impact-card">
                        <div className="impact-card-icon">📸</div>
                        <div className="impact-card-value">{userImpactStats.totalScans}</div>
                        <div className="impact-card-label">Items Scanned</div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="how-it-works">
                    <h2 className="how-it-works-title">🔄 How It Works</h2>
                    <div className="how-steps">
                        {howItWorksSteps.map(step => (
                            <div key={step.step} className="how-step">
                                <span className="how-step-num">{step.step}</span>
                                <div className="how-step-icon">{step.icon}</div>
                                <div className="how-step-title">{step.title}</div>
                                <div className="how-step-desc">{step.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="home-activity">
                    <h3 className="home-activity-title">⚡ Recent Activity</h3>
                    {userActivities.map((a, i) => (
                        <div key={i} className="home-activity-item">
                            <span className="home-activity-icon">{a.icon}</span>
                            <span className="home-activity-text">{a.text}</span>
                            {a.coins && <span className="home-activity-coins">{a.coins}</span>}
                            <span className="home-activity-time">{a.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
