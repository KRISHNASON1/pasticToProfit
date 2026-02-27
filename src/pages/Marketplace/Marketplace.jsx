import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { products, categories, getProductsByCategory, getNewArrivals, getSaleProducts } from '../../data/products';
import './Marketplace.css';

// Star display
function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let stars = '★'.repeat(full);
    if (half) stars += '½';
    stars += '☆'.repeat(5 - full - (half ? 1 : 0));
    return stars;
}

export default function Marketplace() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { addItem, totalItems, setIsOpen } = useCart();
    const { user } = useAuth();
    const isDiscountMode = searchParams.get('discount') === 'true';

    // Apply discounts: 20% off all, extra 30% off luxury
    const applyDiscount = (product) => {
        if (!isDiscountMode) return product;
        const baseDiscount = 0.20;
        const luxuryDiscount = product.category === 'luxury' ? 0.30 : 0;
        const totalDiscount = baseDiscount + luxuryDiscount;
        return {
            ...product,
            originalPrice: product.originalPrice || product.price,
            price: Math.round(product.price * (1 - totalDiscount) * 100) / 100,
            onSale: true,
            _discountApplied: true,
        };
    };

    const filteredProducts = useMemo(() => {
        let result;
        switch (activeCategory) {
            case 'sale': result = getSaleProducts(); break;
            case 'all': result = [...products]; break;
            default: result = getProductsByCategory(activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.badge?.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
            default: break;
        }

        // Apply discounts if in discount mode
        if (isDiscountMode) {
            result = result.map(applyDiscount);
        }

        return result;
    }, [activeCategory, sortBy, searchQuery, isDiscountMode]);

    const newArrivals = getNewArrivals().slice(0, 8);
    const showcaseProducts = products.filter(p => p.isNew).slice(0, 4);

    return (
        <div className="marketplace">
            {/* Header */}
            <header className="mp-header">
                <div className="mp-header-left">
                    <button className="mp-back-btn" onClick={() => navigate('/')} title="Back">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>
                    </button>
                    <div className="mp-logo" onClick={() => setActiveCategory('all')}>
                        <svg className="mp-logo-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                        <span className="mp-logo-text">Up-Cycle</span>
                        <span className="mp-logo-tag">Store</span>
                    </div>
                </div>

                <div className="mp-header-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="mp-search-clear" onClick={() => setSearchQuery('')}>×</button>
                    )}
                </div>

                <div className="mp-header-right">
                    <button className="mp-header-icon-btn" title="Wishlist">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        <span className="mp-header-btn-label">Wishlist</span>
                    </button>
                    <button className="mp-header-icon-btn mp-cart-btn" onClick={() => setIsOpen(true)} title="Cart">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                        <span className="mp-header-btn-label">Cart</span>
                        {totalItems > 0 && <span className="mp-header-cart-badge">{totalItems}</span>}
                    </button>
                </div>
            </header>

            {/* Category Nav */}
            <nav className="mp-category-nav">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`mp-category-link ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            {/* Promo Ticker */}
            <div className="mp-promo-ticker">
                {isDiscountMode ? (
                    <>
                        <span className="mp-ticker-item" style={{ color: '#22c55e', fontWeight: 700 }}>Up-Coins Discount Active: 20% off all products!</span>
                        <span className="mp-ticker-sep">|</span>
                        <span className="mp-ticker-item" style={{ color: '#22c55e', fontWeight: 700 }}>Extra 30% off Luxury items!</span>
                        <span className="mp-ticker-sep">|</span>
                        <span className="mp-ticker-item">Your Balance: {user?.upCoins ?? 0} Up-Coins</span>
                    </>
                ) : (
                    <>
                        <span className="mp-ticker-item">Free shipping on orders over ₹500</span>
                        <span className="mp-ticker-sep">|</span>
                        <span className="mp-ticker-item">Earn Up-Coins on every purchase</span>
                        <span className="mp-ticker-sep">|</span>
                        <span className="mp-ticker-item">100% Recycled Packaging</span>
                    </>
                )}
            </div>

            {/* Hero */}
            <section className="mp-hero">
                <div className="mp-hero-slide">
                    <div className="mp-hero-content">
                        <span className="mp-hero-badge">Weekly Deals</span>
                        <h1 className="mp-hero-title">
                            Up to 30% off<br />
                            <em>Eco-Chic</em> Collection
                        </h1>
                        <p className="mp-hero-subtitle">
                            Premium upcycled products crafted from recycled plastics.
                            Every purchase earns Up-Coins & reduces waste.
                        </p>
                        <div className="mp-hero-actions">
                            <button className="mp-hero-cta" onClick={() => setActiveCategory('sale')}>
                                Shop Deals →
                            </button>
                            <button className="mp-hero-cta-outline" onClick={() => setActiveCategory('all')}>
                                Browse All
                            </button>
                        </div>
                    </div>
                    <div className="mp-hero-visual">
                        <div className="mp-hero-product-showcase">
                            {showcaseProducts.slice(0, 4).map(p => (
                                <div key={p.id} className="mp-hero-showcase-card">
                                    <img src={p.image} alt={p.name} className="mp-hero-showcase-img" />
                                    <span className="mp-hero-showcase-name">{p.name}</span>
                                    <span className="mp-hero-showcase-price">₹{p.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mp-hero-dots">
                    <button className="mp-hero-dot active" />
                    <button className="mp-hero-dot" />
                    <button className="mp-hero-dot" />
                </div>
            </section>

            {/* Toolbar */}
            <div className="mp-toolbar">
                <div className="mp-breadcrumb">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                    <span>›</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('all'); }}>Marketplace</a>
                    <span>›</span>
                    <span className="mp-breadcrumb-current">
                        {categories.find(c => c.id === activeCategory)?.label || 'All Products'}
                    </span>
                </div>
                <div className="mp-toolbar-right">
                    <span className="mp-result-count">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    </span>
                    <select className="mp-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="featured">Sort: Featured</option>
                        <option value="price-low">Price: Low → High</option>
                        <option value="price-high">Price: High → Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Main */}
            <main className="mp-main">
                {/* Filter Chips */}
                <div className="mp-quick-filters">
                    <button className={`mp-quick-chip ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Products</button>
                    <button className={`mp-quick-chip ${activeCategory === 'sale' ? 'active' : ''}`} onClick={() => setActiveCategory('sale')}>On Sale</button>
                    {categories.filter(c => c.id !== 'all' && c.id !== 'sale').map(cat => (
                        <button key={cat.id} className={`mp-quick-chip ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Flash Deals */}
                {activeCategory === 'all' && (
                    <div className="mp-flash-deals">
                        <div className="mp-flash-left">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mp-lime, #c8e625)" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                            <div className="mp-flash-info">
                                <h3>Flash Deals</h3>
                                <p>Grab eco-friendly products at unbeatable prices</p>
                            </div>
                        </div>
                        <div className="mp-flash-timer">
                            <div className="mp-timer-block"><span className="mp-timer-value">06</span><span className="mp-timer-label">HRS</span></div>
                            <div className="mp-timer-block"><span className="mp-timer-value">42</span><span className="mp-timer-label">MIN</span></div>
                            <div className="mp-timer-block"><span className="mp-timer-value">18</span><span className="mp-timer-label">SEC</span></div>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <section className="mp-section">
                    <div className="mp-section-header">
                        <h2 className="mp-section-title">
                            {activeCategory === 'all' ? 'All Products' :
                                activeCategory === 'sale' ? 'Sale Items' :
                                    categories.find(c => c.id === activeCategory)?.label}
                        </h2>
                        <span className="mp-section-link">View All →</span>
                    </div>
                    <div className="mp-product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="mp-empty-state">
                            <p style={{ fontSize: 36, marginBottom: 8 }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </p>
                            <p>No products found.</p>
                            <button className="mp-empty-reset" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>

                {/* Category Browse */}
                {activeCategory === 'all' && (
                    <section className="mp-section">
                        <div className="mp-section-header">
                            <h2 className="mp-section-title">Browse by Category</h2>
                        </div>
                        <div className="mp-category-browse">
                            {categories.filter(c => c.id !== 'all' && c.id !== 'sale').map(cat => (
                                <div key={cat.id} className="mp-category-card" onClick={() => setActiveCategory(cat.id)}>
                                    <div className="mp-category-card-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                                    </div>
                                    <span className="mp-category-card-label">{cat.label}</span>
                                    <span className="mp-category-card-count">
                                        {products.filter(p => p.category === cat.id).length} items
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* New Arrivals */}
                {activeCategory === 'all' && (
                    <section className="mp-section">
                        <div className="mp-section-header">
                            <h2 className="mp-section-title">New Arrivals</h2>
                            <span className="mp-section-link">See All →</span>
                        </div>
                        <div className="mp-recent-scroll">
                            {newArrivals.map(product => (
                                <ProductCard key={product.id} product={product} onAddToCart={addItem} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Trust Bar */}
                <div className="mp-trust-bar">
                    <div className="mp-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                        <div className="mp-trust-info"><h4>Free Delivery</h4><p>On orders above ₹500</p></div>
                    </div>
                    <div className="mp-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                        <div className="mp-trust-info"><h4>Easy Returns</h4><p>30-day return policy</p></div>
                    </div>
                    <div className="mp-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        <div className="mp-trust-info"><h4>Secure Payments</h4><p>Encrypted checkout</p></div>
                    </div>
                    <div className="mp-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <div className="mp-trust-info"><h4>Eco Certified</h4><p>NFC verified sourcing</p></div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mp-newsletter">
                    <div className="mp-newsletter-content">
                        <h3>Stay in the Loop</h3>
                        <p>Subscribe for exclusive deals, new arrivals and rewards.</p>
                    </div>
                    <div className="mp-newsletter-form">
                        <input className="mp-newsletter-input" type="email" placeholder="Enter your email" />
                        <button className="mp-newsletter-btn">Subscribe</button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mp-footer">
                <div className="mp-footer-grid">
                    <div className="mp-footer-brand">
                        <h3>Up-Cycle Store</h3>
                        <p>India's first campus-driven circular economy marketplace. Turning plastic waste into premium, sustainable products.</p>
                    </div>
                    <div className="mp-footer-col">
                        <h4>Shop</h4>
                        {categories.filter(c => c.id !== 'all').slice(0, 5).map(cat => (
                            <a key={cat.id} href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(cat.id); }}>{cat.label}</a>
                        ))}
                    </div>
                    <div className="mp-footer-col">
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">Track Order</a>
                        <a href="#">Shipping Info</a>
                        <a href="#">Returns & Refunds</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <div className="mp-footer-col">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Our Mission</a>
                        <a href="#">EPR Policy</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
                <div className="mp-footer-bottom">
                    <p>© 2026 Up-Cycle Store. All rights reserved.</p>
                    <div className="mp-footer-payments">
                        <span className="mp-footer-payment-icon">VISA</span>
                        <span className="mp-footer-payment-icon">MC</span>
                        <span className="mp-footer-payment-icon">UPI</span>
                        <span className="mp-footer-payment-icon">COD</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* Product Card */
function ProductCard({ product, onAddToCart }) {
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <div className="mp-product-card">
            <div className="mp-product-card-image" style={{ background: product.gradient }}>
                <div className="mp-product-card-badges">
                    {product.badge && <span className="mp-card-badge mp-card-badge-eco">{product.badge}</span>}
                    {product.isNew && <span className="mp-card-badge mp-card-badge-new">NEW</span>}
                    {product.onSale && discount > 0 && <span className="mp-card-badge mp-card-badge-sale">-{discount}%</span>}
                </div>
                <button className="mp-card-wishlist" title="Add to wishlist">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                </button>
                <img src={product.image} alt={product.name} className="mp-card-product-img" loading="lazy" />
                <div className="mp-card-quick-add">
                    <button className="mp-card-add-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mp-product-card-body">
                <div className="mp-card-category">{product.category}</div>
                <div className="mp-card-name">{product.name}</div>
                <div className="mp-card-rating">
                    <span className="mp-card-stars">{renderStars(product.rating)}</span>
                    <span className="mp-card-review-count">({product.reviews})</span>
                </div>
                <div className="mp-card-price-row">
                    <span className="mp-card-price">₹{product.price.toFixed(2)}</span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                        <>
                            <span className="mp-card-original-price">₹{product.originalPrice.toFixed(2)}</span>
                            {discount > 0 && <span className="mp-card-discount">-{discount}%</span>}
                        </>
                    )}
                </div>
                <div className="mp-card-coins">Earn {product.upCoins} Up-Coins</div>
            </div>
        </div>
    );
}
