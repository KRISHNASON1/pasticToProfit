import Header from '../../components/Header/Header';
import { rewardsData } from '../../data/stats';
import './Rewards.css';

export default function Rewards() {
    const { balance, tier, nextTier, nextTierAt, totalEarned, transactions, earnMethods } = rewardsData;
    const progress = (balance / nextTierAt) * 100;

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="rewards-page">
                <h1 className="rewards-page-title">🪙 Up-Coins Rewards</h1>
                <p className="rewards-page-sub">Earn coins by contributing to the circular economy. Redeem for discounts or cash out!</p>

                {/* Balance Hero */}
                <div className="rewards-hero">
                    <div className="rewards-balance-section">
                        <div className="rewards-balance-label">Your Balance</div>
                        <div className="rewards-balance-value">
                            <span className="rewards-balance-coin">🪙</span>
                            {balance.toLocaleString()}
                        </div>
                        <div className="rewards-tier">
                            Current Tier:
                            <span className="rewards-tier-badge">🏆 {tier}</span>
                        </div>
                    </div>
                    <div className="rewards-cta-group">
                        <button className="rewards-cta primary">💸 Cash Out</button>
                        <button className="rewards-cta secondary">🛍️ Use Discounts</button>
                    </div>
                </div>

                {/* Progress */}
                <div className="rewards-progress">
                    <div className="rewards-progress-header">
                        <span className="rewards-progress-label">Progress to {nextTier}</span>
                        <span className="rewards-progress-target">{balance} / {nextTierAt.toLocaleString()} coins</span>
                    </div>
                    <div className="rewards-progress-bar">
                        <div className="rewards-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* How to earn */}
                <h2 className="section-heading" style={{ marginBottom: 16 }}>
                    <span className="section-heading-icon">⭐</span>
                    How to Earn Up-Coins
                </h2>
                <div className="rewards-grid">
                    {earnMethods.map((method, i) => (
                        <div key={i} className="earn-card">
                            <div className="earn-card-icon">{method.icon}</div>
                            <div className="earn-card-title">{method.title}</div>
                            <div className="earn-card-desc">{method.desc}</div>
                            <span className="earn-card-reward">🪙 {method.reward}</span>
                        </div>
                    ))}
                </div>

                {/* Transaction history */}
                <div className="transactions-card">
                    <h3 className="transactions-title">📜 Transaction History</h3>
                    {transactions.map(tx => (
                        <div key={tx.id} className="tx-item">
                            <div className={`tx-icon ${tx.type}`}>
                                {tx.type === 'earned' ? '📥' : '📤'}
                            </div>
                            <div className="tx-info">
                                <div className="tx-action">{tx.action}</div>
                                <div className="tx-date">{tx.date}</div>
                            </div>
                            <div className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
