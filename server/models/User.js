import mongoose from 'mongoose';

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
}, { timestamps: true });

export default mongoose.model('User', userSchema);
