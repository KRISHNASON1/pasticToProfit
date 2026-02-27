import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Bell, CreditCard, Lock, Pencil, Save, X, LogOut, Trash2, Trophy, Coins } from 'lucide-react';
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
                <h1 className="settings-page-title"><Settings2Icon /> Settings</h1>
                <p className="settings-page-sub">Manage your profile, notifications, and account preferences</p>

                <div className="settings-sections">
                    {/* Profile */}
                    <div className="settings-section">
                        <h3 className="settings-section-title"><User size={18} /> Profile</h3>
                        <div className="settings-profile">
                            <div className="settings-avatar">
                                {initials}
                                <span className="settings-avatar-edit"><Pencil size={11} /></span>
                            </div>
                            <div className="settings-avatar-info">
                                <h3>{user?.name || 'User'}</h3>
                                <p>{user?.email || ''} • Joined {joinDate} • {user?.tier || 'Bronze'} Tier <Trophy size={12} style={{ marginLeft: 2 }} /></p>
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
                                {saving ? 'Saving…' : saved ? <><Save size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
                            </button>
                            <button className="settings-btn outline" onClick={() => {
                                setFormName(user?.name || '');
                                setFormEmail(user?.email || '');
                                setFormPhone(user?.phone || '');
                                setFormLocation(user?.location || '');
                            }}><X size={14} /> Cancel</button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="settings-section">
                        <h3 className="settings-section-title"><Bell size={18} /> Notifications</h3>
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
                        <h3 className="settings-section-title"><CreditCard size={18} /> Payment & Wallet</h3>
                        <div className="settings-form">
                            <div className="form-group">
                                <label className="form-label">UPI ID</label>
                                <input className="form-input" value={formUpi} onChange={e => setFormUpi(e.target.value)} placeholder="you@upi" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Up-Coins Balance</label>
                                <input className="form-input" value={`${user?.upCoins ?? 0} coins`} disabled style={{ display: 'flex', alignItems: 'center' }} />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="settings-btn save" onClick={handleSave} disabled={saving}><Save size={14} /> Update Wallet</button>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="settings-section">
                        <h3 className="settings-section-title"><Lock size={18} /> Account</h3>
                        <div className="settings-actions">
                            <button className="settings-btn outline" onClick={handleLogout}><LogOut size={14} /> Log Out</button>
                            <button className="settings-btn danger"><Trash2 size={14} /> Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Settings2Icon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
}
