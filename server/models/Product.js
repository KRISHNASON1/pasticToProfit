import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String },
    badge: { type: String },
    description: { type: String },
    rating: { type: Number },
    reviews: { type: Number },
    image: { type: String },
    gradient: { type: String },
    onSale: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
    upCoins: { type: Number, default: 0 },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    story: { type: String },
    images: { type: [String], default: [] },
});

export default mongoose.model('Product', productSchema);
