/**
 * Seed script — populates MongoDB with product data from src/data/products.js
 * Run: npm run seed
 */
import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/plasticToProfit';

// Product data (copied from src/data/products.js to avoid Vite import issues)
const products = [
    { name: 'Upcycled Bamboo Watch', price: 50.90, originalPrice: 65.00, category: 'luxury', badge: 'Eco-Certified', description: 'Handcrafted bamboo watch with rPET strap, made from recovered ocean plastics.', rating: 4.8, reviews: 124, image: '/products/product-1.png', gradient: 'linear-gradient(135deg, #f5f0e8 0%, #ece5d8 100%)', onSale: true, isNewProduct: true, upCoins: 120 },
    { name: 'rPET Designer Vase', price: 38.50, originalPrice: 48.00, category: 'luxury', badge: 'Eco-Certified', description: 'Sleek designer vase crafted from 100% recycled PET bottles.', rating: 4.6, reviews: 89, image: '/products/product-2.png', gradient: 'linear-gradient(135deg, #f0f0ea 0%, #e8e8e0 100%)', onSale: true, isNewProduct: false, upCoins: 100 },
    { name: 'Oceanic Pearl Necklace', price: 25.90, originalPrice: 32.00, category: 'luxury', badge: 'Eco-Certified', description: 'Elegant necklace featuring beads made from recycled ocean plastic.', rating: 4.7, reviews: 201, image: '/products/product-3.png', gradient: 'linear-gradient(135deg, #f2efe8 0%, #e8e5dc 100%)', onSale: true, isNewProduct: false, upCoins: 80 },
    { name: 'Terrazzo Serving Tray', price: 45.00, originalPrice: 55.00, category: 'luxury', badge: 'Artisan Made', description: 'Premium terrazzo tray made from crushed recycled HDPE.', rating: 4.7, reviews: 67, image: '/products/product-4.png', gradient: 'linear-gradient(135deg, #f5f0e8 0%, #ece5d8 100%)', onSale: true, isNewProduct: false, upCoins: 180 },
    { name: 'Artisan Mosaic Frame', price: 34.50, originalPrice: 42.00, category: 'luxury', badge: 'Eco-Certified', description: 'Decorative photo frame with mosaic pattern from mixed recycled plastics.', rating: 4.5, reviews: 156, image: '/products/product-5.png', gradient: 'linear-gradient(135deg, #eee8f0 0%, #e5dce8 100%)', onSale: false, isNewProduct: true, upCoins: 90 },
    { name: 'Recycled Coaster Set (6)', price: 18.90, originalPrice: 24.00, category: 'handmade', badge: 'Zero Waste', description: 'Set of 6 coasters made from compressed recycled bottle caps.', rating: 4.6, reviews: 156, image: '/products/product-6.png', gradient: 'linear-gradient(135deg, #f5f0ea 0%, #ece5d8 100%)', onSale: false, isNewProduct: true, upCoins: 80 },
    { name: 'Recycled Fabric Tote', price: 15.50, originalPrice: 18.00, category: 'diy', badge: 'Zero Waste', description: 'Durable tote bag made from recycled fabric offcuts and plastic yarn.', rating: 4.4, reviews: 312, image: '/products/product-7.png', gradient: 'linear-gradient(135deg, #f0ede5 0%, #e5e2d8 100%)', onSale: true, isNewProduct: false, upCoins: 60 },
    { name: 'Eco Candle Holder', price: 22.00, originalPrice: 28.00, category: 'handmade', badge: 'Artisan Made', description: 'Elegant candle holder crafted from recycled glass and plastic base.', rating: 4.7, reviews: 78, image: '/products/product-8.jpg', gradient: 'linear-gradient(135deg, #f5f2ec 0%, #ece8e0 100%)', onSale: false, isNewProduct: true, upCoins: 100 },
    { name: 'rPET Pellets Starter Kit', price: 12.90, originalPrice: 16.00, category: 'diy', badge: 'Educational', description: 'DIY kit with rPET pellets and instructions to create small items at home.', rating: 4.3, reviews: 89, image: '/products/product-9.jpg', gradient: 'linear-gradient(135deg, #f0ede5 0%, #e5e2d8 100%)', onSale: false, isNewProduct: false, upCoins: 40 },
    { name: 'Recycled Soap Dispenser', price: 8.90, originalPrice: 12.00, category: 'consumables', badge: 'Campus Favorite', description: 'Refillable soap dispenser made from post-consumer HDPE plastic.', rating: 4.8, reviews: 456, image: '/products/product-10.jpg', gradient: 'linear-gradient(135deg, #f5f2ed 0%, #ece8e0 100%)', onSale: true, isNewProduct: false, upCoins: 35 },
    { name: '3D Printing Filament (rPET)', price: 19.90, originalPrice: 25.00, category: 'diy', badge: 'Eco-Certified', description: '1kg spool of rPET filament for 3D printers, made from recycled bottles.', rating: 4.5, reviews: 134, image: '/products/product-11.png', gradient: 'linear-gradient(135deg, #eee8f0 0%, #e5dce8 100%)', onSale: true, isNewProduct: true, upCoins: 70 },
    { name: 'Upcycled Planter Pot', price: 14.50, originalPrice: 18.00, category: 'fashion', badge: 'Zero Waste', description: 'Colorful self-watering planter made from recycled LDPE bags.', rating: 4.4, reviews: 267, image: '/products/product-3.png', gradient: 'linear-gradient(135deg, #f2efe8 0%, #e8e5dc 100%)', onSale: true, isNewProduct: false, upCoins: 50 },
    { name: 'Recycled Stationery Set', price: 9.90, originalPrice: 13.00, category: 'consumables', badge: 'Campus Favorite', description: 'Pen, ruler, and notepad set all made from recycled plastics.', rating: 4.2, reviews: 523, image: '/products/product-1.png', gradient: 'linear-gradient(135deg, #f5f0e8 0%, #ece5d8 100%)', onSale: false, isNewProduct: false, upCoins: 30 },
    { name: 'Eco Cleaning Kit', price: 16.00, originalPrice: 20.00, category: 'consumables', badge: 'Zero Waste', description: 'Brush and cloth kit in recycled plastic packaging, fully compostable refills.', rating: 4.3, reviews: 198, image: '/products/product-7.png', gradient: 'linear-gradient(135deg, #f0ede5 0%, #e5e2d8 100%)', onSale: false, isNewProduct: false, upCoins: 45 },
    { name: 'rPET Bricks (100 units)', price: 89.00, originalPrice: 110.00, category: 'construction', badge: 'Industrial Grade', description: 'Load-bearing construction bricks made from compressed recycled PET.', rating: 4.6, reviews: 34, image: '/products/product-5.png', gradient: 'linear-gradient(135deg, #eeeee8 0%, #e2e2dc 100%)', onSale: true, isNewProduct: false, upCoins: 250 },
    { name: 'Recycled Insulation Panels', price: 55.00, originalPrice: 68.00, category: 'construction', badge: 'Eco-Certified', description: 'Thermal insulation panels manufactured from shredded mixed plastics.', rating: 4.5, reviews: 56, image: '/products/product-6.png', gradient: 'linear-gradient(135deg, #edebe5 0%, #e2dfd8 100%)', onSale: false, isNewProduct: true, upCoins: 150 },
    { name: 'Eco Tiles Pack (25 sq ft)', price: 62.00, originalPrice: 78.00, category: 'construction', badge: 'Eco-Certified', description: 'Decorative floor tiles made from recycled HDPE with marbled finish.', rating: 4.4, reviews: 42, image: '/products/product-4.png', gradient: 'linear-gradient(135deg, #f0ede8 0%, #e5e2dc 100%)', onSale: true, isNewProduct: false, upCoins: 180 },
    { name: 'Luxury Eco Planner 2026', price: 28.00, originalPrice: 35.00, category: 'fashion', badge: 'NFC Tracked', description: 'Hardcover planner with recycled paper and rPET bookmark ribbon.', rating: 4.8, reviews: 178, image: '/products/product-1.png', gradient: 'linear-gradient(135deg, #eeeee8 0%, #e2e2dc 100%)', onSale: true, isNewProduct: true, upCoins: 200 },
    { name: 'Ocean Plastic Sunglasses', price: 35.00, originalPrice: 42.00, category: 'luxury', badge: 'Ocean Recovered', description: 'Premium sunglasses with frames made from recovered ocean plastic.', rating: 4.7, reviews: 145, image: '/products/product-2.png', gradient: 'linear-gradient(135deg, #f0f0ea 0%, #e8e8e0 100%)', onSale: true, isNewProduct: false, upCoins: 130 },
    { name: 'Campus Bottle (rPET, 750ml)', price: 12.00, originalPrice: 15.00, category: 'consumables', badge: 'Campus Favorite', description: 'Reusable water bottle made from 100% recycled PET.', rating: 4.9, reviews: 412, image: '/products/product-9.jpg', gradient: 'linear-gradient(135deg, #f0ede5 0%, #e5e2d8 100%)', onSale: true, isNewProduct: false, upCoins: 180 },
    { name: 'Recycled HDPE Sheets (10 pack)', price: 125.00, originalPrice: 150.00, category: 'construction', badge: 'Bulk Order', description: 'Industrial-grade HDPE sheets for construction, made from 100% recycled plastic.', rating: 4.3, reviews: 28, image: '/products/product-5.png', gradient: 'linear-gradient(135deg, #eeeee8 0%, #e2e2dc 100%)', onSale: true, isNewProduct: false, upCoins: 350 },
    { name: 'Plastic Lumber Planks (5)', price: 95.00, originalPrice: 120.00, category: 'construction', badge: 'Industrial Grade', description: 'Weather-resistant lumber planks made from mixed recycled plastics.', rating: 4.4, reviews: 18, image: '/products/product-11.png', gradient: 'linear-gradient(135deg, #f0f0ea 0%, #e5e5dc 100%)', onSale: true, isNewProduct: false, upCoins: 280 },
    { name: 'Recycled Plastic Pipes (50m)', price: 78.00, originalPrice: 95.00, category: 'construction', badge: 'Industrial Grade', description: 'Plumbing-grade pipes manufactured from recycled high-density plastics.', rating: 4.6, reviews: 31, image: '/products/product-6.png', gradient: 'linear-gradient(135deg, #eeeeee 0%, #e2e2e2 100%)', onSale: false, isNewProduct: true, upCoins: 220 },
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert products
        await Product.insertMany(products);
        console.log(`✅ Seeded ${products.length} products`);

        await mongoose.disconnect();
        console.log('Done!');
    } catch (err) {
        console.error('❌ Seed error:', err.message);
        process.exit(1);
    }
}

seed();
