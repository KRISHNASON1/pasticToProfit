import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart() {
    const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal } = useCart();

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
            <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3 className="cart-title">🛒 Your Cart ({items.length})</h3>
                    <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="cart-items">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <span className="cart-empty-icon">🛒</span>
                            <p>Your cart is empty</p>
                            <p style={{ fontSize: 12 }}>Add eco-friendly products to get started!</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div
                                    className="cart-item-image"
                                    style={{ background: item.gradient }}
                                >
                                    {item.image}
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
                                <button className="cart-item-remove" onClick={() => removeItem(item.id)}>🗑️</button>
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
