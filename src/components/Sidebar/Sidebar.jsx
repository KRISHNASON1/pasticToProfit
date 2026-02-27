import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Coins,
    MessageCircle,
    Settings,
    Recycle,
    Search
} from 'lucide-react';
import { UpcycleLogo } from '../Logo/UpcycleLogo';
import './Sidebar.css';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/rewards', icon: Coins, label: 'Rewards' },
    { to: '/support', icon: MessageCircle, label: 'Support' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <UpcycleLogo size={28} theme="light" />
            </div>

            {/* Marketplace link */}
            <NavLink to="/marketplace" className={({ isActive }) => `sidebar-dropdown ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                <span className="sidebar-dropdown-icon">🛍️</span>
                <span>Marketplace</span>
                <span className="sidebar-dropdown-chevron">→</span>
            </NavLink>

            {/* Search */}
            <div className="sidebar-search">
                <span className="sidebar-search-icon">
                    <Search size={14} strokeWidth={2} />
                </span>
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
                        end={item.end}
                        className={({ isActive }) =>
                            `sidebar-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-nav-icon">
                            <item.icon size={16} strokeWidth={2} />
                        </span>
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
                <NavLink to="/login" className="sidebar-user-card" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-user-avatar">👤</div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">Sign In</div>
                        <div className="sidebar-user-id">Tap to get started</div>
                    </div>
                    <span className="sidebar-user-more">→</span>
                </NavLink>
            </div>
        </aside>
    );
}