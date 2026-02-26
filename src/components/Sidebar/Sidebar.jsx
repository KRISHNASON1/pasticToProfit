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
import './Sidebar.css';

const navItems = [
    { to: '/app',            icon: LayoutDashboard,  label: 'Dashboard',   end: true },
    { to: '/app/marketplace', icon: ShoppingBag,      label: 'Marketplace' },
    { to: '/app/rewards',     icon: Coins,            label: 'Rewards' },
    { to: '/app/support',     icon: MessageCircle,    label: 'Support' },
    { to: '/app/settings',    icon: Settings,         label: 'Settings' },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    <Recycle size={20} strokeWidth={2} />
                </div>
                <span className="sidebar-logo-text">PlasticToProfit</span>
            </div>

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
                        <div className="sidebar-user-id">@krishna_eco · Gold 🏆</div>
                    </div>
                    <span className="sidebar-user-more">⋮</span>
                </div>
            </div>
        </aside>
    );
}