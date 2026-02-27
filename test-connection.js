// Quick MongoDB Connection Test Script
// Run with: node test-connection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/plasticToProfit';

console.log('🔄 Testing MongoDB connection...');
console.log('📍 URI:', MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('🗄️  Database name:', mongoose.connection.name);
    process.exit(0);
})
.catch((err) => {
    console.error('❌ FAILED! MongoDB connection error');
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    console.error('\n💡 Common fixes:');
    console.error('1. Check MONGO_URI in .env file');
    console.error('2. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0');
    console.error('3. Verify database user has correct permissions');
    console.error('4. Check if password contains special characters (needs URL encoding)');
    process.exit(1);
});
