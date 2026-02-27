import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// GET /api/products — return all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (err) {
        console.error('Products error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
