import { useState } from 'react';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProductsByCategory, getNewArrivals, getSaleProducts } from '../../data/products';
import '../Dashboard/Dashboard.css';

export default function Marketplace() {
    const [activeTab, setActiveTab] = useState('all');

    const getFilteredProducts = () => {
        switch (activeTab) {
            case 'luxury': return getProductsByCategory('luxury');
            case 'handmade': return getProductsByCategory('handmade');
            case 'sale': return getSaleProducts();
            default: return getNewArrivals();
        }
    };

    const filteredProducts = getFilteredProducts();
    const luxuryProducts = getProductsByCategory('luxury');
    const diyProducts = getProductsByCategory('diy');
    const fashionProducts = getProductsByCategory('fashion');
    const constructionProducts = getProductsByCategory('construction');

    return (
        <div className="page-wrapper">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="dashboard">
                {/* Hero Banner */}
                <div className="hero-banner">
                    <div className="hero-content">
                        <span className="hero-tag">🌿 Weekly Green Deals</span>
                        <h1 className="hero-title">Up to 30% off<br />Eco-Chic Decor</h1>
                        <p className="hero-subtitle">Discover upcycled luxury crafted from campus-collected recycled plastics</p>
                        <button className="hero-cta">Shop now →</button>
                    </div>
                    <div className="hero-thumbnails">
                        <div className="hero-thumb" style={{ background: 'rgba(255,255,255,0.12)' }}>
                            🏺<span className="hero-thumb-badge">+</span>
                        </div>
                        <div className="hero-thumb" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            💡<span className="hero-thumb-badge">+</span>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="product-section">
                    <h2 className="section-heading">
                        <span className="section-heading-icon">
                            {activeTab === 'luxury' ? '💎' : activeTab === 'handmade' ? '🎨' : activeTab === 'sale' ? '🏷️' : '✨'}
                        </span>
                        {activeTab === 'luxury' ? 'Sustainable Luxury' : activeTab === 'handmade' ? 'Handmade Goods' : activeTab === 'sale' ? 'On Sale' : 'New Arrivals'}
                        <span className="section-view-all">View all →</span>
                    </h2>
                    <div className="products-row">
                        {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>

                {activeTab === 'all' && (
                    <>
                        {[
                            { icon: '💎', label: 'Sustainable Luxury', data: luxuryProducts },
                            { icon: '🧩', label: 'DIY Kits & Materials', data: diyProducts },
                            { icon: '👗', label: 'Eco Fashion', data: fashionProducts },
                            { icon: '🧱', label: 'Sustainable Construction', data: constructionProducts },
                        ].map(sec => (
                            <div className="product-section" key={sec.label}>
                                <h2 className="section-heading">
                                    <span className="section-heading-icon">{sec.icon}</span>
                                    {sec.label}
                                    <span className="section-view-all">View all →</span>
                                </h2>
                                <div className="products-row">
                                    {sec.data.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                <div className="dashboard-footer">
                    <a href="#">About Us</a>
                    <a href="#">Shipping</a>
                    <a href="#">Returns</a>
                    <a href="#">EPR Policy</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </div>
    );
}
