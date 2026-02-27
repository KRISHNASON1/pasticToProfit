import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { rewardsData } from '../../data/stats';
import { Coins, Trophy, Star, ArrowDownCircle, ArrowUpCircle, Package, ShoppingBag, Banknote, Tent, ScanLine, CalendarCheck, Target, X, IndianRupee } from 'lucide-react';
import Header from '../../components/Header/Header';
import './Rewards.css';

const earnMethods = [
    { Icon: Tent, title: 'Campus Drives', desc: 'Drop off sorted plastic at campus sprint events', reward: '50-500 coins' },
    { Icon: ScanLine, title: 'AI Scanning', desc: 'Scan plastic waste using the AI scanner', reward: '25-300 coins' },
    { Icon: CalendarCheck, title: 'Referrals', desc: 'Invite friends and earn when they sign up', reward: '100 coins' },
    { Icon: Target, title: 'Daily Drop-offs', desc: 'Regular waste contributions at collection points', reward: '10-50 coins' },
];

export default function Rewards() {
    const { user, cashOut } = useAuth();
    const navigate = useNavigate();
    const { nextTier, nextTierAt } = rewardsData;

    const balance = user?.upCoins ?? 0;
    const tier = user?.tier || 'Bronze';
    const transactions = user?.transactions || [];
    const bag = user?.bag || [];
    const progress = (balance / nextTierAt) * 100;

    const [cashOutOpen, setCashOutOpen] = useState(false);
    const [cashOutCoins, setCashOutCoins] = useState('');
    const [cashOutLoading, setCashOutLoading] = useState(false);
    const [cashOutResult, setCashOutResult] = useState(null);

    const handleCashOut = async () => {
        const coins = parseInt(cashOutCoins, 10);
        if (!coins || coins <= 0 || coins > balance) return;
        setCashOutLoading(true);
        try {
            const data = await cashOut(coins);
            setCashOutResult(`₹${data.rupees} transferred to your UPI!`);
            setCashOutCoins('');
            setTimeout(() => { setCashOutResult(null); setCashOutOpen(false); }, 3000);
        } catch (err) {
            setCashOutResult(err.message);
        } finally {
            setCashOutLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="rewards-page">
                <h1 className="rewards-page-title"><Coins size={22} style={{ marginRight: 8 }} /> Up-Coins Rewards</h1>
                <p className="rewards-page-sub">Earn coins by contributing to the circular economy. Redeem for discounts or cash out!</p>

                {/* Balance Hero */}
                <div className="rewards-hero">
                    <div className="rewards-balance-section">
                        <div className="rewards-balance-label">Your Balance</div>
                        <div className="rewards-balance-value">
                            <Coins size={28} style={{ marginRight: 8, color: '#f59e0b' }} />
                            {balance.toLocaleString()}
                        </div>
                        <div className="rewards-tier">
                            Current Tier:
                            <span className="rewards-tier-badge"><Trophy size={14} style={{ marginRight: 4 }} /> {tier}</span>
                        </div>
                    </div>
                    <div className="rewards-cta-group">
                        <button className="rewards-cta primary" onClick={() => setCashOutOpen(true)}>
                            <IndianRupee size={16} style={{ marginRight: 4 }} /> Cash Out
                        </button>
                        <button className="rewards-cta secondary" onClick={() => navigate('/marketplace?discount=true')}>
                            <ShoppingBag size={16} style={{ marginRight: 4 }} /> Use Discounts
                        </button>
                    </div>
                </div>

                {/* Cash Out Modal */}
                {cashOutOpen && (
                    <div className="cashout-modal-overlay" onClick={() => setCashOutOpen(false)}>
                        <div className="cashout-modal" onClick={e => e.stopPropagation()}>
                            <div className="cashout-header">
                                <h3><IndianRupee size={18} /> Cash Out Up-Coins</h3>
                                <button onClick={() => setCashOutOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--clr-text-muted)', marginBottom: 12 }}>
                                1 Up-Coin = ₹1. You have <strong>{balance}</strong> coins available.
                            </p>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="Enter coins"
                                    value={cashOutCoins}
                                    onChange={e => setCashOutCoins(e.target.value)}
                                    max={balance}
                                    min={1}
                                    style={{ flex: 1 }}
                                />
                                <button className="settings-btn save" onClick={() => setCashOutCoins(String(balance))}>Max</button>
                            </div>
                            {cashOutCoins && parseInt(cashOutCoins) > 0 && (
                                <p style={{ fontSize: 12, color: 'var(--clr-primary-600)', marginBottom: 8 }}>
                                    You will receive: <strong>₹{parseInt(cashOutCoins)}</strong> to your UPI
                                </p>
                            )}
                            <button
                                className="settings-btn save"
                                style={{ width: '100%' }}
                                onClick={handleCashOut}
                                disabled={cashOutLoading || !cashOutCoins || parseInt(cashOutCoins) <= 0 || parseInt(cashOutCoins) > balance}
                            >
                                {cashOutLoading ? 'Processing…' : `Cash Out ₹${cashOutCoins || 0}`}
                            </button>
                            {cashOutResult && (
                                <p style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: cashOutResult.includes('₹') ? '#22c55e' : '#ef4444', textAlign: 'center' }}>
                                    {cashOutResult}
                                </p>
                            )}
                        </div>
                    </div>
                )}

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

                {/* Your Plastic Bag */}
                {bag.length > 0 && (
                    <div className="rewards-bag-section">
                        <h2 className="section-heading" style={{ marginBottom: 16 }}>
                            <Package size={18} style={{ marginRight: 8 }} />
                            Your Plastic Bag ({bag.length} items)
                        </h2>
                        <div className="rewards-bag-grid">
                            {bag.map((item, i) => (
                                <div key={i} className="rewards-bag-card">
                                    <span className="rewards-bag-icon">{item.icon || '♻️'}</span>
                                    <div className="rewards-bag-info">
                                        <span className="rewards-bag-name">{item.name}</span>
                                        <span className="rewards-bag-type">{item.type || item.plasticCode}</span>
                                    </div>
                                    <span className="rewards-bag-count">×{item.count}</span>
                                    <span className="rewards-bag-coins"><Coins size={12} /> +{item.coins}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* How to earn */}
                <h2 className="section-heading" style={{ marginBottom: 16 }}>
                    <Star size={18} style={{ marginRight: 8 }} />
                    How to Earn Up-Coins
                </h2>
                <div className="rewards-grid">
                    {earnMethods.map((method, i) => (
                        <div key={i} className="earn-card">
                            <div className="earn-card-icon"><method.Icon size={22} /></div>
                            <div className="earn-card-title">{method.title}</div>
                            <div className="earn-card-desc">{method.desc}</div>
                            <span className="earn-card-reward"><Coins size={12} style={{ marginRight: 4 }} /> {method.reward}</span>
                        </div>
                    ))}
                </div>

                {/* Transaction history */}
                <div className="transactions-card">
                    <h3 className="transactions-title">
                        <Banknote size={16} style={{ marginRight: 6 }} /> Transaction History
                    </h3>
                    {transactions.length === 0 ? (
                        <div style={{ padding: 20, textAlign: 'center', color: 'var(--clr-text-muted)', fontSize: 13 }}>
                            No transactions yet. Start scanning plastic to earn Up-Coins!
                        </div>
                    ) : (
                        transactions.slice().reverse().map((tx, i) => (
                            <div key={tx._id || i} className="tx-item">
                                <div className={`tx-icon ${tx.type}`}>
                                    {tx.type === 'earned' ? <ArrowDownCircle size={16} /> : <ArrowUpCircle size={16} />}
                                </div>
                                <div className="tx-info">
                                    <div className="tx-action">{tx.action}</div>
                                    <div className="tx-date">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                </div>
                                <div className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
