# 🚀 Deployment Guide

This guide covers deploying both the frontend and backend of the Bright Smile Dental Clinic application.

## 📋 Table of Contents
- [Frontend Deployment](#frontend-deployment)
  - [GitHub Pages (Free)](#github-pages-free)
  - [Vercel (Free)](#vercel-free)
  - [Netlify (Free)](#netlify-free)
- [Backend Deployment](#backend-deployment)
  - [Render (Free)](#render-free)
  - [Railway (Free)](#railway-free)
  - [Heroku](#heroku)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)

---

## Frontend Deployment

### GitHub Pages (Free)

**✅ Already configured with GitHub Actions!**

1. **Enable GitHub Pages:**
   - Go to your repository: `https://github.com/ritamsen21/bright-smile-dental-clinic`
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select `gh-pages` branch
   - Click **Save**

2. **Automatic Deployment:**
   - Every push to `main` branch triggers automatic deployment
   - Wait 2-3 minutes for the workflow to complete
   - Your site will be live at: `https://ritamsen21.github.io/bright-smile-dental-clinic/`

3. **Manual Deployment:**
   - Go to **Actions** tab in GitHub
   - Click **Deploy to GitHub Pages** workflow
   - Click **Run workflow**

### Vercel (Free)

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Project:**
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Select `bright-smile-dental-clinic`

3. **Configure Build Settings:**
   ```
   Framework Preset: Angular
   Root Directory: frontend
   Build Command: npm run build:prod
   Output Directory: dist/frontend/browser
   ```

4. **Environment Variables:**
   - Add: `NG_BUILD_CACHE=false`

5. **Deploy:**
   - Click **Deploy**
   - Your site will be live at: `https://your-app.vercel.app`

### Netlify (Free)

1. **Sign up at [netlify.com](https://netlify.com)**

2. **New Site from Git:**
   - Click **Add new site** → **Import an existing project**
   - Choose GitHub and select your repository

3. **Build Settings:**
   ```
   Base directory: frontend
   Build command: npm run build:prod
   Publish directory: dist/frontend/browser
   ```

4. **Deploy:**
   - Click **Deploy site**
   - Your site will be live at: `https://your-app.netlify.app`

---

## Backend Deployment

### Render (Free)

**🎯 Recommended for this project**

1. **Sign up at [render.com](https://render.com)**

2. **Create Web Service:**
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Select `bright-smile-dental-clinic`

3. **Configure Service:**
   ```
   Name: bright-smile-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Instance Type:**
   - Select **Free** tier

5. **Environment Variables** (Add these):
   ```
   NODE_ENV=production
   PORT=4000
   MONGODB_URI=<your-mongodb-atlas-uri>
   CORS_ORIGIN=https://ritamsen21.github.io
   JWT_SECRET=your-super-secret-jwt-key-change-this
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

6. **Deploy:**
   - Click **Create Web Service**
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://bright-smile-backend.onrender.com`

7. **Update Frontend:**
   - Update `frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://bright-smile-backend.onrender.com/api'
   };
   ```
   - Commit and push to trigger frontend redeployment

### Railway (Free)

1. **Sign up at [railway.app](https://railway.app)**

2. **New Project:**
   - Click **New Project** → **Deploy from GitHub repo**
   - Select your repository

3. **Configure:**
   ```
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables:**
   - Same as Render configuration above

5. **Generate Domain:**
   - Go to **Settings** → **Networking**
   - Click **Generate Domain**
   - Copy your URL

### Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   heroku create bright-smile-backend
   ```

3. **Add MongoDB:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Configure Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set CORS_ORIGIN=https://ritamsen21.github.io
   heroku config:set EMAIL_HOST=smtp.gmail.com
   heroku config:set EMAIL_PORT=587
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   ```

5. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

---

## Database Setup

### MongoDB Atlas (Free)

1. **Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create Cluster:**
   - Choose **Free M0** tier
   - Select region closest to your backend
   - Click **Create Cluster**

3. **Database Access:**
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Username: `dentalAdmin`
   - Generate secure password
   - Select **Built-in Role**: `Atlas admin`

4. **Network Access:**
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0)
   - For production, restrict to your backend IPs

5. **Get Connection String:**
   - Go to **Clusters** → **Connect**
   - Choose **Connect your application**
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `bright-smile-dental`

6. **Example Connection String:**
   ```
   mongodb+srv://dentalAdmin:<password>@cluster0.xxxxx.mongodb.net/bright-smile-dental?retryWrites=true&w=majority
   ```

7. **Seed Database:**
   After deployment, run seed script:
   ```bash
   cd backend
   MONGODB_URI="your-atlas-uri" npm run seed:doctor
   ```

---

## Environment Variables

### Backend (.env)

```env
NODE_ENV=production
PORT=4000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bright-smile-dental

# CORS
CORS_ORIGIN=https://ritamsen21.github.io

# JWT
JWT_SECRET=your-very-secure-random-string-change-this

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

### Frontend (environment.prod.ts)

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.onrender.com/api'
};
```

---

## 🔐 Security Checklist

- [ ] Generate strong JWT_SECRET (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Use Gmail App Password (not regular password)
- [ ] Set proper CORS_ORIGIN (your frontend URL)
- [ ] Never commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB IP whitelist (restrict access)
- [ ] Set up HTTPS for both frontend and backend
- [ ] Use MongoDB Atlas connection string (not local)

---

## 📊 Deployment Checklist

### Before Deploying:

- [ ] Update `environment.prod.ts` with production backend URL
- [ ] Test production build locally: `cd frontend && npm run build:prod`
- [ ] Create MongoDB Atlas cluster
- [ ] Generate Gmail App Password
- [ ] Set all environment variables

### After Deploying Backend:

- [ ] Test API endpoints: `https://your-backend.onrender.com/api/doctors`
- [ ] Run seed script for doctor data
- [ ] Verify CORS allows frontend origin
- [ ] Test email functionality

### After Deploying Frontend:

- [ ] Test all pages load correctly
- [ ] Verify API calls work (check browser console)
- [ ] Test booking appointment flow
- [ ] Check email notifications arrive
- [ ] Test on mobile devices

---

## 🛠️ Troubleshooting

### GitHub Pages 404 Error

**Problem:** Page shows 404 after deployment

**Solution:** 
1. Check if `gh-pages` branch was created
2. Verify GitHub Pages is enabled in repository settings
3. Wait 5-10 minutes for DNS propagation
4. Clear browser cache

### CORS Errors

**Problem:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
1. Update backend `.env`:
   ```
   CORS_ORIGIN=https://ritamsen21.github.io
   ```
2. Redeploy backend
3. For multiple origins:
   ```
   CORS_ORIGIN=https://ritamsen21.github.io,https://your-vercel-app.vercel.app
   ```

### Backend "Application Error"

**Problem:** Backend doesn't start on Render/Railway

**Solution:**
1. Check build logs for errors
2. Verify all environment variables are set
3. Ensure `npm start` script points to `dist/server.js`
4. Check MongoDB connection string is correct
5. Verify PORT is set to 4000

### Email Not Sending

**Problem:** Appointments book but no emails arrive

**Solution:**
1. Verify Gmail App Password (not regular password)
2. Check "Less secure app access" is OFF (use App Password instead)
3. Enable 2-Factor Authentication
4. Check email logs in backend console
5. Test with a different email provider

### Database Connection Failed

**Problem:** "MongoNetworkError: connection timed out"

**Solution:**
1. Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
2. Verify connection string has correct password
3. Ensure database user has proper permissions
4. Check cluster is not paused (free tier auto-pauses after inactivity)

---

## 🎉 Post-Deployment

Once deployed, your application will be accessible at:

- **Frontend (GitHub Pages):** `https://ritamsen21.github.io/bright-smile-dental-clinic/`
- **Backend (Render):** `https://bright-smile-backend.onrender.com`
- **API Docs:** `https://bright-smile-backend.onrender.com/api/doctors`

### Automatic Updates:

- **Frontend:** Push to `main` → Auto-deploys via GitHub Actions
- **Backend:** Push to `main` → Auto-deploys on Render/Railway
- **Zero downtime deployments** ✅

---

## 💰 Cost Summary

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| GitHub Pages | ✅ Free Forever | 100GB bandwidth/month |
| Vercel | ✅ Free Forever | 100GB bandwidth/month |
| Netlify | ✅ Free Forever | 100GB bandwidth/month |
| Render | ✅ Free Forever | Sleeps after 15min inactivity |
| Railway | ✅ $5 credit/month | ~500 hours runtime |
| MongoDB Atlas | ✅ Free Forever | 512MB storage |

**Total Cost: $0/month** with free tiers! 🎉

---

## 📞 Support

If you encounter issues:

1. Check troubleshooting section above
2. Review deployment logs in respective platforms
3. Verify all environment variables are set correctly
4. Test API endpoints independently
5. Open an issue on GitHub

---

**Built with ❤️ for seamless deployment**
