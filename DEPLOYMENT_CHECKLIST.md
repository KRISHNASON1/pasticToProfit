# Render Deployment Checklist ✅

Use this checklist to ensure everything is configured correctly.

## Pre-Deployment

- [ ] All code changes committed to GitHub
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] MongoDB user has read/write permissions
- [ ] Connection string tested locally with `node test-connection.js`

## Render Backend Configuration

- [ ] Web Service created on Render
- [ ] Connected to correct GitHub repository
- [ ] Build command: `npm install`
- [ ] Start command: `npm run server`
- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGO_URI=mongodb+srv://...` (your Atlas connection string)
  - [ ] `JWT_SECRET=...` (your secret key)
- [ ] Deployment completed successfully
- [ ] Logs show: `✅ Connected to MongoDB successfully`

## Render Frontend Configuration

- [ ] Static Site created on Render
- [ ] Connected to correct GitHub repository
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables added:
  - [ ] `VITE_API_URL=https://your-backend.onrender.com`
  - [ ] `VITE_GEMINI_API_KEY=...`
  - [ ] `VITE_GOOGLE_VISION_API_KEY=...`
- [ ] Deployment completed successfully

## Testing

- [ ] Backend health check works: `https://your-backend.onrender.com/api/health`
- [ ] Products endpoint works: `https://your-backend.onrender.com/api/products`
- [ ] Frontend loads without console errors
- [ ] Can view products on marketplace
- [ ] Can sign up for new account
- [ ] Can sign in with existing account
- [ ] Can scan items (if applicable)
- [ ] Can add items to cart

## Troubleshooting (if needed)

- [ ] Checked Render backend logs for errors
- [ ] Verified MongoDB connection string is correct
- [ ] Verified all environment variables are set
- [ ] Waited 2-3 minutes after changing Atlas IP whitelist
- [ ] Tested API endpoints directly with curl/Postman
- [ ] Checked browser console for CORS errors
- [ ] Verified frontend is using correct backend URL

## Common Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Database connection unavailable" | MongoDB not connected | Check MONGO_URI, verify Atlas credentials |
| "Unexpected end of JSON input" | Server returning 500 without JSON | Check Render logs for actual error |
| CORS error | Frontend URL blocked | Already fixed - allows all origins in production |
| 503 Service Unavailable | Cold start (free tier) | Wait 30-60 seconds and refresh |
| "Invalid email or password" | Wrong credentials | Check user exists in database |

## Performance Notes

Render Free Tier:
- Backend spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Subsequent requests are fast
- This is expected behavior

## Success Indicators

You'll know everything is working when:
1. ✅ Render logs show successful MongoDB connection
2. ✅ Health check endpoint returns `{"status":"ok"}`
3. ✅ Products endpoint returns array of products
4. ✅ Frontend loads and displays products
5. ✅ Login/signup works without errors
6. ✅ No 500 errors in browser console

## Need Help?

- Detailed guide: `RENDER_DEPLOYMENT.md`
- Quick fix steps: `QUICK_FIX.md`
- Test connection: `node test-connection.js`
