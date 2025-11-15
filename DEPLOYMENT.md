# Deployment Guide

This guide will help you deploy the Todo App frontend to Vercel and backend to Render.

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - **Important**: Set the Root Directory to `frontend`

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   Add the following environment variable in Vercel:
   - **Variable Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-app.onrender.com/api`
     (Replace with your actual Render backend URL)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your frontend will be live at `https://your-app.vercel.app`

### Vercel Configuration
The project includes a `vercel.json` file in the frontend folder with the correct configuration. Vercel will automatically detect and use these settings.

---

## Backend Deployment (Render)

### Prerequisites
- Render account
- MongoDB database (MongoDB Atlas recommended for production)

### Steps

1. **Create a New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service Settings**
   - **Name**: `todo-app-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose Free or Paid plan

3. **Environment Variables**
   Add the following environment variables in Render:
   
   ```
   PORT=10000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key-change-this
   CORS_ORIGIN=https://your-app.vercel.app
   ADMIN_CODE=your-secret-admin-code
   ```
   
   **Important Notes:**
   - `MONGODB_URI`: Get this from MongoDB Atlas or your MongoDB provider
   - `JWT_SECRET`: Use a strong, random secret key
   - `CORS_ORIGIN`: Set this to your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
     - You can specify multiple origins separated by commas: `https://app1.vercel.app,https://app2.vercel.app`
   - `ADMIN_CODE`: Set a secret code for admin registration

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Your backend will be live at `https://your-backend-app.onrender.com`

5. **Update Frontend Environment Variable**
   - After backend is deployed, update the `VITE_API_URL` in Vercel to point to your Render backend URL
   - Format: `https://your-backend-app.onrender.com/api`

---

## MongoDB Setup (MongoDB Atlas)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account

2. **Create Cluster**
   - Create a new cluster (Free tier available)
   - Choose your preferred region

3. **Database Access**
   - Go to "Database Access"
   - Create a database user with username and password
   - Save the credentials

4. **Network Access**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allows all IPs, or add Render's IPs)

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `todo-app`)
   - Use this as your `MONGODB_URI` in Render

---

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend environment variable `VITE_API_URL` points to backend
- [ ] Backend environment variable `CORS_ORIGIN` includes frontend URL
- [ ] MongoDB connection is working
- [ ] Test user registration and login
- [ ] Test creating, updating, and deleting tasks
- [ ] Verify CORS is working (no CORS errors in browser console)

---

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend includes your exact Vercel frontend URL (with `https://`)
- Check that there are no trailing slashes in the URL

### API Connection Issues
- Verify `VITE_API_URL` in Vercel is set correctly
- Check that backend is running on Render
- Ensure backend URL doesn't have a trailing slash (should end with `/api`)

### Build Failures
- Check build logs in Vercel/Render
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Issues
- Verify MongoDB connection string is correct
- Check MongoDB Atlas network access settings
- Ensure database user has proper permissions

---

## Quick Reference

### Vercel Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `frontend`

### Render Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `backend`

---

## Support

If you encounter any issues, check:
1. Build logs in Vercel/Render dashboards
2. Browser console for frontend errors
3. Render service logs for backend errors
4. MongoDB Atlas logs for database issues

