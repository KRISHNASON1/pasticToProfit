import { useState } from 'react';
import Header from '../../components/Header/Header';
import './Settings.css';

const notifications = [
    { id: 'drops', title: 'Drop-off Reminders', desc: 'Get notified about upcoming campus drives', default: true },
    { id: 'rewards', title: 'Reward Updates', desc: 'When you earn or spend Up-Coins', default: true },
    { id: 'marketplace', title: 'Marketplace Deals', desc: 'New products, sales, and featured listings', default: false },
    { id: 'epr', title: 'EPR Credit Alerts', desc: 'Updates on EPR compliance and credits', default: true },
    { id: 'newsletter', title: 'Weekly Newsletter', desc: 'Eco-tips, impact stories, and community news', default: false },
];

export default function Settings() {
    const [toggles, setToggles] = useState(
        Object.fromEntries(notifications.map(n => [n.id, n.default]))
    );

    const toggle = (id) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="settings-page">
                <h1 className="settings-page-title">⚙️ Settings</h1>
                <p className="settings-page-sub">Manage your profile, notifications, and account preferences</p>

                <div className="settings-sections">
                    {/* Profile */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">👤 Profile</h3>
                        <div className="settings-profile">
                            <div className="settings-avatar">
                                KS
                                <span className="settings-avatar-edit">✏️</span>
                            </div>
                            <div className="settings-avatar-info">
                                <h3>Krishna Soni</h3>
                                <p>@krishna_eco • Joined Feb 2026 • Gold Tier 🏆</p>
                            </div>
                        </div>
                        <div className="settings-form">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-input" defaultValue="Krishna Soni" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" defaultValue="krishna@example.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" defaultValue="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input className="form-input" defaultValue="New Delhi, India" />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="settings-btn save">Save Changes</button>
                            <button className="settings-btn outline">Cancel</button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">🔔 Notifications</h3>
                        <div className="toggle-list">
                            {notifications.map(n => (
                                <div key={n.id} className="toggle-item">
                                    <div className="toggle-info">
                                        <h4>{n.title}</h4>
                                        <p>{n.desc}</p>
                                    </div>
                                    <button
                                        className={`toggle-switch ${toggles[n.id] ? 'active' : ''}`}
                                        onClick={() => toggle(n.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wallet */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">💳 Payment & Wallet</h3>
                        <div className="settings-form">
                            <div className="form-group">
                                <label className="form-label">UPI ID</label>
                                <input className="form-input" defaultValue="krishna@upi" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bank Account (last 4)</label>
                                <input className="form-input" defaultValue="•••• 4210" disabled />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="settings-btn save">Update Wallet</button>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">🔒 Account</h3>
                        <div className="settings-actions">
                            <button className="settings-btn outline">Log Out</button>
                            <button className="settings-btn danger">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
