import { useCart } from '../../context/CartContext';
import './Header.css';

const defaultTabs = [
    { id: 'all', label: 'New Arrivals' },
    { id: 'luxury', label: 'Sustainable Luxury' },
    { id: 'handmade', label: 'Handmade Goods' },
    { id: 'sale', label: 'Sale' },
];

export default function Header({ activeTab, onTabChange, tabs, showTabs = true }) {
    const { totalItems, setIsOpen } = useCart();
    const displayTabs = tabs || defaultTabs;

    return (
        <header className="header">
            {showTabs ? (
                <div className="header-tabs">
                    {displayTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`header-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => onTabChange?.(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            ) : (
                <div />
            )}

            <div className="header-right">
                <div className="header-search">
                    <span className="header-search-icon">🔍</span>
                    <input type="text" placeholder="Search" />
                </div>
                <button className="header-cart" onClick={() => setIsOpen(true)}>
                    🛒
                    {totalItems > 0 && (
                        <span className="header-cart-count">{totalItems}</span>
                    )}
                </button>
            </div>
        </header>
    );
}
