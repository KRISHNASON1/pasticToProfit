import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addItem } = useCart();

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <div className="product-card">
            <div className="product-card-image" style={{ background: product.gradient }}>
                {product.badge && (
                    <span className="product-card-badge">{product.badge}</span>
                )}
                <button
                    className="product-card-add"
                    onClick={(e) => { e.stopPropagation(); addItem(product); }}
                    title="Add to cart"
                >
                    +
                </button>
                <span style={{ fontSize: 52 }}>{product.image}</span>
                {product.onSale && discount > 0 && (
                    <span className="product-card-sale-tag">-{discount}%</span>
                )}
            </div>
            <div className="product-card-body">
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-eco">♻️ {product.badge || 'Eco-Certified'}</div>
                <div className="product-card-price-row">
                    <span className="product-card-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                        <span className="product-card-original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                </div>
                <div className="product-card-coins">🪙 {product.upCoins} Up-Coins</div>
            </div>
        </div>
    );
}
