import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Form state — pre-fill from user data
    const [formName, setFormName] = useState(user?.name || '');
    const [formEmail, setFormEmail] = useState(user?.email || '');
    const [formPhone, setFormPhone] = useState(user?.phone || '');
    const [formLocation, setFormLocation] = useState(user?.location || '');
    const [formUpi, setFormUpi] = useState(user?.upiId || '');

    const [toggles, setToggles] = useState(
        Object.fromEntries(notifications.map(n => [n.id, n.default]))
    );

    const toggle = (id) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));

    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '??';

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile({
                name: formName,
                email: formEmail,
                phone: formPhone,
                location: formLocation,
                upiId: formUpi,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            alert(err.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'N/A';

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
                                {initials}
                                <span className="settings-avatar-edit">✏️</span>
                            </div>
                            <div className="settings-avatar-info">
                                <h3>{user?.name || 'User'}</h3>
                                <p>{user?.email || ''} • Joined {joinDate} • {user?.tier || 'Bronze'} Tier 🏆</p>
                            </div>
                        </div>
                        <div className="settings-form">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-input" value={formName} onChange={e => setFormName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" value={formPhone} onChange={e => setFormPhone(e.target.value)} placeholder="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input className="form-input" value={formLocation} onChange={e => setFormLocation(e.target.value)} placeholder="City, Country" />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="settings-btn save" onClick={handleSave} disabled={saving}>
                                {saving ? 'Saving…' : saved ? '✅ Saved!' : 'Save Changes'}
                            </button>
                            <button className="settings-btn outline" onClick={() => {
                                setFormName(user?.name || '');
                                setFormEmail(user?.email || '');
                                setFormPhone(user?.phone || '');
                                setFormLocation(user?.location || '');
                            }}>Cancel</button>
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
                                <input className="form-input" value={formUpi} onChange={e => setFormUpi(e.target.value)} placeholder="you@upi" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Up-Coins Balance</label>
                                <input className="form-input" value={`🪙 ${user?.upCoins ?? 0} coins`} disabled />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="settings-btn save" onClick={handleSave} disabled={saving}>Update Wallet</button>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">🔒 Account</h3>
                        <div className="settings-actions">
                            <button className="settings-btn outline" onClick={handleLogout}>Log Out</button>
                            <button className="settings-btn danger">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
