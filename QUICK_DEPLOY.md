# Quick Deployment Reference

## Vercel (Frontend) Settings

### Build Settings:
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (or `vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables:
- `VITE_API_URL` = `https://your-backend-app.onrender.com/api`

---

## Render (Backend) Settings

### Build Settings:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables:
```
PORT=10000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://your-app.vercel.app
ADMIN_CODE=your-secret-admin-code
```

---

## Summary

✅ **Frontend is deployment-ready**
- Build command: `npm run build` or `vite build`
- Output directory: `dist`
- Install command: `npm install`

✅ **Backend is deployment-ready**
- Build command: `npm install`
- Start command: `npm start`

✅ **All configurations updated**
- CORS configured for production
- Environment variables documented
- TypeScript build issues fixed
- Vercel configuration file created

