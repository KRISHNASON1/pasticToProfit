import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('ptp_token'));
    const [loading, setLoading] = useState(true);

    const authHeaders = useCallback(() => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }), [token]);

    // Fetch current user on mount if token exists
    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then(data => setUser(data.user))
            .catch(() => {
                localStorage.removeItem('ptp_token');
                setToken(null);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, [token]);

    const signup = useCallback(async (name, email, password) => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Signup failed');
        localStorage.setItem('ptp_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    }, []);

    const signin = useCallback(async (email, password) => {
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Sign in failed');
        localStorage.setItem('ptp_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('ptp_token');
        setToken(null);
        setUser(null);
    }, []);

    const updateProfile = useCallback(async (updates) => {
        const res = await fetch('/api/auth/me', {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(updates),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Update failed');
        setUser(data.user);
        return data.user;
    }, [authHeaders]);

    const addToBag = useCallback(async (items, totalCoins) => {
        const res = await fetch('/api/auth/bag', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ items, totalCoins }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add to bag');
        setUser(data.user);
        return data.user;
    }, [authHeaders]);

    const clearBag = useCallback(async () => {
        const res = await fetch('/api/auth/bag', {
            method: 'DELETE',
            headers: authHeaders(),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to clear bag');
        setUser(prev => ({ ...prev, bag: [] }));
    }, [authHeaders]);

    const redeemDiscount = useCallback(async (coinsSpent) => {
        const res = await fetch('/api/auth/redeem', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ coinsSpent }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Redeem failed');
        setUser(prev => ({ ...prev, upCoins: data.user.upCoins, transactions: data.user.transactions }));
        return data.user;
    }, [authHeaders]);

    const refreshUser = useCallback(async () => {
        if (!token) return;
        const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
        }
    }, [token]);

    const cashOut = useCallback(async (coins) => {
        const res = await fetch('/api/auth/cashout', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ coins }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Cash out failed');
        setUser(prev => ({ ...prev, upCoins: data.user.upCoins, transactions: data.user.transactions }));
        return data;
    }, [authHeaders]);

    return (
        <AuthContext.Provider value={{
            user, token, loading,
            signup, signin, logout, updateProfile,
            addToBag, clearBag, redeemDiscount, refreshUser, cashOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
