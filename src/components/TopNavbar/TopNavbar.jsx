import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Coins,
    MessageCircle,
    Settings,
    Search,
    Store
} from 'lucide-react';
import { UpcycleLogo } from '../Logo/UpcycleLogo';
import { useAuth } from '../../context/AuthContext';
import './TopNavbar.css';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/marketplace', icon: Store, label: 'Marketplace' },
    { to: '/rewards', icon: Coins, label: 'Rewards' },
    { to: '/support', icon: MessageCircle, label: 'Support' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function TopNavbar() {
    const { user } = useAuth();

    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '??';

    return (
        <header className="top-navbar">
            {/* Logo */}
            <div className="top-navbar-logo">
                <UpcycleLogo size={24} theme="light" />
            </div>

            {/* Search */}
            <div className="top-navbar-search">
                <span className="top-navbar-search-icon">
                    <Search size={14} strokeWidth={2} />
                </span>
                <input type="text" placeholder="Search..." />
                <span className="top-navbar-search-shortcut">⌘K</span>
            </div>

            {/* Nav */}
            <nav className="top-navbar-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `top-navbar-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="top-navbar-nav-icon">
                            <item.icon size={16} strokeWidth={2} />
                        </span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User */}
            <div className="top-navbar-user">
                <NavLink to={user ? '/settings' : '/login'} className="top-navbar-user-card">
                    <div className="top-navbar-user-avatar">{initials}</div>
                    <div className="top-navbar-user-info">
                        <div className="top-navbar-user-name">{user ? user.name : 'Sign In'}</div>
                    </div>
                </NavLink>
            </div>
        </header>
    );
}