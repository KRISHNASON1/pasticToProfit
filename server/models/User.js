import mongoose from 'mongoose';

const bagItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    plasticCode: { type: String },
    type: { type: String },
    icon: { type: String },
    count: { type: Number, default: 1 },
    coins: { type: Number, default: 0 },
    scannedAt: { type: Date, default: Date.now },
}, { _id: false });

const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['earned', 'spent'], required: true },
    action: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { _id: true });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    upiId: { type: String, default: '' },
    upCoins: { type: Number, default: 500 },
    tier: { type: String, default: 'Bronze' },
    plasticContributed: { type: Number, default: 0 },
    co2Saved: { type: Number, default: 0 },
    drivesJoined: { type: Number, default: 0 },
    totalScans: { type: Number, default: 0 },
    bag: [bagItemSchema],
    transactions: [transactionSchema],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
