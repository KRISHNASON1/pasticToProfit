import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'plasticToProfit_secret_key_2026';

export default function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        req.userId = decoded.id; // auth.js historically expects req.userId, not req.user.id
        req.user = decoded;      // keep req.user for products.js new code compatibility
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
