import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Package, Trash2, ShoppingCart } from 'lucide-react';
import './Cart.css';

export default function Cart() {
    const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal } = useCart();
    const { user, clearBag } = useAuth();

    const bag = user?.bag || [];

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
            <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3 className="cart-title"><ShoppingCart size={18} style={{ marginRight: 8 }} /> Your Cart ({items.length})</h3>
                    <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="cart-items">
                    {/* Plastic Bag Section */}
                    {bag.length > 0 && (
                        <div className="cart-bag-section" style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--clr-border-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--clr-primary-600)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Package size={14} /> Scheduled Pickup Bag ({bag.length})
                                </h4>
                                <button
                                    onClick={clearBag}
                                    style={{ background: 'none', border: 'none', fontSize: 11, color: 'var(--clr-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                >
                                    <Trash2 size={12} /> Clear
                                </button>
                            </div>

                            {bag.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', fontSize: 13 }}>
                                    <span style={{ fontSize: 20 }}>{item.icon || '♻️'}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--clr-text-muted)' }}>{item.type || item.plasticCode}</div>
                                    </div>
                                    <span style={{ fontWeight: 600 }}>×{item.count}</span>
                                    <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: 12 }}>+{item.coins}🪙</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Store Cart Items */}
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <ShoppingCart size={40} style={{ color: 'var(--clr-border)', marginBottom: 12 }} />
                            <p>Your cart is empty</p>
                            <p style={{ fontSize: 12, marginTop: 4 }}>Add eco-friendly products to get started!</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div
                                    className="cart-item-image"
                                    style={{ background: item.gradient }}
                                >
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="cart-item-info">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                                    <div className="cart-item-controls">
                                        <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                                        <span className="cart-qty">{item.qty}</span>
                                        <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                    </div>
                                </div>
                                <button className="cart-item-remove" onClick={() => removeItem(item.id)}><Trash2 size={14} /></button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-subtotal-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-subtotal-row">
                            <span>🪙 Up-Coin Discount</span>
                            <span style={{ color: 'var(--clr-primary-400)' }}>-$0.00</span>
                        </div>
                        <div className="cart-total-row">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <button className="cart-checkout-btn">
                            Proceed to Checkout 🌿
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
