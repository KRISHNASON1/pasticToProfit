import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user, token } = useAuth();
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load initial cart from user data
    useEffect(() => {
        if (user && user.cart && !isLoaded) {
            setItems(user.cart);
            setIsLoaded(true);
        } else if (!user) {
            // clear cart if logged out
            setItems([]);
            setIsLoaded(false);
        }
    }, [user, isLoaded]);

    const syncToBackend = async (newItems) => {
        if (user && token) {
            try {
                await fetch((import.meta.env.VITE_API_URL || '') + '/api/auth/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ cart: newItems })
                });
            } catch (err) {
                console.error('Failed to sync cart:', err);
            }
        }
    };

    const addItem = (product) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            let newItems;
            if (existing) {
                newItems = prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            } else {
                newItems = [...prev, { ...product, qty: 1 }];
            }
            syncToBackend(newItems);
            return newItems;
        });
    };

    const removeItem = (id) => {
        setItems(prev => {
            const newItems = prev.filter(i => i.id !== id);
            syncToBackend(newItems);
            return newItems;
        });
    };

    const updateQty = (id, qty) => {
        if (qty <= 0) return removeItem(id);
        setItems(prev => {
            const newItems = prev.map(i => i.id === id ? { ...i, qty } : i);
            syncToBackend(newItems);
            return newItems;
        });
    };

    const clearCart = () => {
        setItems([]);
        syncToBackend([]);
    };

    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
