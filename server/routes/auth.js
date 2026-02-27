import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'plasticToProfit_secret_key_2026';

function makeToken(user) {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
}

function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// ── SIGN UP ────────────────────────────────────────────
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        const user = await User.create({ name, email, password });
        const token = makeToken(user);
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, upCoins: user.upCoins, tier: user.tier, bag: user.bag, transactions: user.transactions },
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── SIGN IN ────────────────────────────────────────────
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = makeToken(user);
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, upCoins: user.upCoins, tier: user.tier, bag: user.bag, transactions: user.transactions },
        });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET CURRENT USER ───────────────────────────────────
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        console.error('Get me error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── UPDATE PROFILE ─────────────────────────────────────
router.put('/me', auth, async (req, res) => {
    try {
        const allowed = ['name', 'email', 'phone', 'location', 'upiId'];
        const updates = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) updates[key] = req.body[key];
        }
        const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── ADD TO BAG (after scan) ────────────────────────────
router.post('/bag', auth, async (req, res) => {
    try {
        const { items, totalCoins } = req.body;
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Items array is required' });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Add items to bag
        const now = new Date();
        for (const item of items) {
            user.bag.push({
                name: item.name,
                plasticCode: item.plasticCode,
                type: item.type,
                icon: item.icon,
                count: item.count || 1,
                coins: item.coins || 0,
                scannedAt: now,
            });
        }

        // Add coins to balance
        const coinsEarned = totalCoins || 0;
        user.upCoins += coinsEarned;
        user.totalScans += 1;

        // Update tier based on coins
        if (user.upCoins >= 5000) user.tier = 'Platinum';
        else if (user.upCoins >= 2000) user.tier = 'Gold';
        else if (user.upCoins >= 500) user.tier = 'Silver';

        // Add transaction
        user.transactions.push({
            type: 'earned',
            action: `Plastic Scan: ${items.map(i => i.name).join(', ')}`,
            amount: coinsEarned,
            date: now,
        });

        await user.save();

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                upCoins: user.upCoins,
                tier: user.tier,
                bag: user.bag,
                transactions: user.transactions,
            },
        });
    } catch (err) {
        console.error('Add to bag error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── CLEAR BAG (after pickup) ───────────────────────────
router.delete('/bag', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.bag = [];
        await user.save();
        res.json({ user: { id: user._id, bag: user.bag } });
    } catch (err) {
        console.error('Clear bag error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── REDEEM DISCOUNT ────────────────────────────────────
router.post('/redeem', auth, async (req, res) => {
    try {
        const { coinsSpent } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.upCoins < coinsSpent) {
            return res.status(400).json({ error: 'Not enough Up-Coins' });
        }

        user.upCoins -= coinsSpent;
        user.transactions.push({
            type: 'spent',
            action: 'Marketplace Discount Redemption',
            amount: -coinsSpent,
            date: new Date(),
        });

        await user.save();
        res.json({ user: { id: user._id, upCoins: user.upCoins, transactions: user.transactions } });
    } catch (err) {
        console.error('Redeem error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
// ── CASH OUT (1 coin = ₹1) ─────────────────────────────
router.post('/cashout', auth, async (req, res) => {
    try {
        const { coins } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!coins || coins <= 0) {
            return res.status(400).json({ error: 'Invalid coin amount' });
        }
        if (user.upCoins < coins) {
            return res.status(400).json({ error: 'Not enough Up-Coins' });
        }

        user.upCoins -= coins;
        user.transactions.push({
            type: 'spent',
            action: `Cash Out: ₹${coins} to UPI`,
            amount: -coins,
            date: new Date(),
        });

        await user.save();
        res.json({ user: { id: user._id, upCoins: user.upCoins, transactions: user.transactions }, rupees: coins });
    } catch (err) {
        console.error('Cashout error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
