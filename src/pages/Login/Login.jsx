import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
    const [tab, setTab] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signin, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (tab === 'signup') {
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                await signup(name, email, password);
            } else {
                await signin(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* -------- Left Branding Panel -------- */}
            <div className="login-brand">
                {/* Floating decorations */}
                <span className="login-brand-deco deco-1">🌿</span>
                <span className="login-brand-deco deco-2">♻️</span>
                <span className="login-brand-deco deco-3">🌱</span>

                <div className="login-brand-content">
                    <div className="login-brand-logo">
                        <div className="login-brand-logo-icon">♻️</div>
                        <span className="login-brand-logo-text">PlasticToProfit</span>
                    </div>

                    <h1 className="login-brand-tagline">
                        Turn Waste Into <span>Opportunity</span>
                    </h1>
                    <p className="login-brand-subtitle">
                        Join thousands of eco-conscious buyers and sellers on the circular economy marketplace. Every transaction makes the planet greener.
                    </p>

                    <div className="login-brand-stats">
                        <div className="login-brand-stat">
                            <div className="login-brand-stat-value">12K+</div>
                            <div className="login-brand-stat-label">Users</div>
                        </div>
                        <div className="login-brand-stat">
                            <div className="login-brand-stat-value">45T</div>
                            <div className="login-brand-stat-label">Plastic Saved</div>
                        </div>
                        <div className="login-brand-stat">
                            <div className="login-brand-stat-value">₹8.2L</div>
                            <div className="login-brand-stat-label">Earned</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* -------- Right Form Panel -------- */}
            <div className="login-form-panel">
                <Link to="/" className="login-back">← Back to Store</Link>

                <div className="login-form-container">
                    <h2 className="login-form-title">
                        {tab === 'signin' ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p className="login-form-subtitle">
                        {tab === 'signin'
                            ? 'Sign in to access your eco-marketplace dashboard'
                            : 'Start your journey towards a sustainable future'}
                    </p>

                    {/* Tabs */}
                    <div className="login-tabs">
                        <button
                            className={`login-tab ${tab === 'signin' ? 'active' : ''}`}
                            onClick={() => { setTab('signin'); setError(''); }}
                        >
                            Sign In
                        </button>
                        <button
                            className={`login-tab ${tab === 'signup' ? 'active' : ''}`}
                            onClick={() => { setTab('signup'); setError(''); }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            color: '#ef4444',
                            padding: '10px 14px',
                            borderRadius: 8,
                            fontSize: 13,
                            marginBottom: 12,
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {tab === 'signup' && (
                            <div className="login-field">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="login-field-input"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="login-field">
                            <label>Email Address</label>
                            <input
                                type="text"
                                className="login-field-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label>Password</label>
                            <input
                                type="password"
                                className="login-field-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {tab === 'signup' && (
                            <div className="login-field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="login-field-input"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {tab === 'signin' && (
                            <div className="login-forgot">
                                <a href="#">Forgot password?</a>
                            </div>
                        )}

                        <button type="submit" className="login-submit" disabled={loading}>
                            {loading
                                ? 'Please wait…'
                                : tab === 'signin' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="login-divider">
                        <span>Or continue with</span>
                    </div>

                    {/* Social Buttons */}
                    <div className="login-socials">
                        <button className="login-social-btn">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="login-social-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}