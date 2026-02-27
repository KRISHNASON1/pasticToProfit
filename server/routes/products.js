import { Router } from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/products — return all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (err) {
        console.error('Products error:', err);
        res.status(500).json({ error: 'Server error retrieving products' });
    }
});

// POST /api/products — create a new product (DIY Submission)
router.post('/', auth, async (req, res) => {
    try {
        const { name, price, category, story, images, description } = req.body;
        const newProduct = new Product({
            name,
            price: Number(price),
            category,
            story,
            images: images || [],
            image: images && images.length > 0 ? images[0] : '', // Use the first image as the main cover
            description,
            creatorId: req.user.id,
            isNewProduct: true,
            upCoins: Math.floor(Number(price) * 0.1) // 10% cash equivalent in coins as a reward bonus
        });

        await newProduct.save();
        res.status(201).json({ product: newProduct, message: 'Product submitted successfully!' });
    } catch (err) {
        console.error('Create product error:', err);
        res.status(500).json({ error: 'Server error creating product' });
    }
});

export default router;
