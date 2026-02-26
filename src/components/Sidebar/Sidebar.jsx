import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
    { to: '/', icon: '📊', label: 'Dashboard' },
    { to: '/analytics', icon: '📈', label: 'Analytics' },
    { to: '/rewards', icon: '🪙', label: 'Rewards', badge: '3', badgeColor: 'green' },
    { to: '/support', icon: '💬', label: 'Support', badge: 'Live', badgeColor: 'red' },
    { to: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">♻️</div>
                <span className="sidebar-logo-text">PlasticToProfit</span>
            </div>

            {/* Marketplace dropdown */}
            <div className="sidebar-dropdown">
                <span className="sidebar-dropdown-icon">🛍️</span>
                <span>Marketplace</span>
                <span className="sidebar-dropdown-chevron">▾</span>
            </div>

            {/* Search */}
            <div className="sidebar-search">
                <span className="sidebar-search-icon">🔍</span>
                <input type="text" placeholder="Search..." />
                <span className="sidebar-search-shortcut">⌘K</span>
            </div>

            {/* Nav */}
            <div className="sidebar-nav-label">Navigation</div>
            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                        end={item.to === '/'}
                    >
                        <span className="sidebar-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.badge && (
                            <span className={`sidebar-nav-badge ${item.badgeColor}`}>{item.badge}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User */}
            <div className="sidebar-user">
                <div className="sidebar-user-label">User Account</div>
                <div className="sidebar-user-card">
                    <div className="sidebar-user-avatar">KS</div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">Krishna Soni</div>
                        <div className="sidebar-user-id">@krishna_eco</div>
                    </div>
                    <span className="sidebar-user-more">⋮</span>
                </div>
            </div>
        </aside>
    );
}
