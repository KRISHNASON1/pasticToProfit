# Render Deployment Guide - Fix for 500 Errors

## Problem
Getting 500 errors and "Unexpected end of JSON input" when deployed to Render, even though MongoDB Atlas IP whitelist includes 0.0.0.0/0.

## Root Causes
1. MongoDB connection failing silently on Render
2. CORS blocking requests from production domain
3. Missing environment variables on Render
4. Poor error logging making debugging difficult

## Solution - Step by Step

### 1. MongoDB Atlas Configuration

1. Go to MongoDB Atlas → Network Access
2. Verify `0.0.0.0/0` is in the IP Access List
3. Go to Database Access → Verify your user has read/write permissions
4. Get your connection string from Database → Connect → Connect your application
   - Should look like: `mongodb+srv://username:password@cluster.mongodb.net/plasticToProfit`

### 2. Render Backend Setup

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `plastic-to-profit-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Plan**: Free

4. Add Environment Variables in Render Dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://1908workspace_db_user:Z81NYWIMNCiihm2w@cluster0.2sstjue.mongodb.net/plasticToProfit?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=super_secret_jwt_key_here
   PORT=10000
   ```

5. Deploy and wait for it to complete

### 3. Render Frontend Setup

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Configure:
   - **Name**: `plastic-to-profit-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_GEMINI_API_KEY=AIzaSyAIuLBfpm4a8EXYqmYu-dMpLXGTt5FnERs
   VITE_GOOGLE_VISION_API_KEY=AQ.Ab8RN6KQOdCf2ZOcsSI4oyCOjWhifud_V3fXR6ffWSkhmjPhtg
   ```

### 4. Verify Deployment

1. Check backend logs in Render dashboard:
   - Look for: `✅ Connected to MongoDB successfully`
   - If you see connection errors, check your MONGO_URI

2. Test the API directly:
   ```bash
   curl https://your-backend-url.onrender.com/api/health
   # Should return: {"status":"ok"}
   
   curl https://your-backend-url.onrender.com/api/products
   # Should return: {"products":[...]}
   ```

3. Check frontend:
   - Open browser console
   - Look for API calls
   - Verify they're going to the correct backend URL

### 5. Common Issues & Fixes

#### Issue: "Database connection unavailable"
- **Cause**: MongoDB not connected
- **Fix**: Check MONGO_URI in Render env vars, verify Atlas credentials

#### Issue: CORS errors
- **Cause**: Frontend URL not allowed
- **Fix**: Already fixed in code - allows all origins in production

#### Issue: 500 errors with no details
- **Cause**: MongoDB query failing
- **Fix**: Check Render logs for detailed error messages

#### Issue: "Unexpected end of JSON input"
- **Cause**: Server returning 500 without JSON body
- **Fix**: Already fixed - all routes now return proper JSON errors

### 6. Testing Checklist

- [ ] Backend health check works: `/api/health`
- [ ] Products endpoint works: `/api/products`
- [ ] Sign up works: POST `/api/auth/signup`
- [ ] Sign in works: POST `/api/auth/signin`
- [ ] Frontend loads without errors
- [ ] Frontend can fetch products
- [ ] Login/signup works from frontend

### 7. Monitoring

Check Render logs regularly:
- Backend logs show MongoDB connection status
- Look for `✅` success messages
- Look for `❌` error messages with details

### 8. Free Tier Limitations

Render free tier:
- Backend spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- This is normal behavior

## Updated Files

The following files have been updated to fix the issues:
- `server/server.js` - Better MongoDB connection handling, CORS fix, error middleware
- `server/routes/auth.js` - Better error logging and connection checks
- `server/routes/products.js` - Better error logging and connection checks
- `render.yaml` - Render configuration file
- `.env.example` - Environment variable template

## Next Steps

1. Push these changes to GitHub
2. Render will auto-deploy
3. Check logs for successful MongoDB connection
4. Test all endpoints
5. If issues persist, check Render logs for specific error messages
