# Deployment Guide for Ateeb's Portfolio

## 🚀 GitHub Deployment Steps

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `portfolio` or `ateeb-portfolio`
4. Make it **Public** (for free hosting)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git and Push to GitHub
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Portfolio website with backend API"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Set Up Environment Variables
For the backend to work, you need to set up environment variables:

#### Option A: Local Development
Create a `.env` file in your project root:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=3000
```

#### Option B: Production Deployment
For production deployment, you'll need to set environment variables on your hosting platform.

### Step 4: Deploy to Hosting Platform

#### Option A: Render (Recommended - Free)
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `ateeb-portfolio`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Port**: `3000`
6. Add Environment Variables:
   - `EMAIL_USER`: your-gmail@gmail.com
   - `EMAIL_PASS`: your-gmail-app-password
7. Click "Create Web Service"

#### Option B: Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your portfolio repository
6. Add environment variables in the Variables tab
7. Deploy

#### Option C: Heroku
1. Go to [Heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub repository
4. Add environment variables in Settings
5. Deploy

### Step 5: Update Frontend for Production
After deployment, update the frontend to use your production URL:

In `script.js`, change the fetch URL to your deployed backend:
```javascript
// Replace with your actual deployment URL
const response = await fetch('https://your-app-name.onrender.com/api/contact', {
    // ... rest of the code
});
```

### Step 6: Test Everything
1. Visit your deployed portfolio
2. Test the contact form
3. Check if emails are being sent
4. Test all links and functionality

## 🔧 Gmail Setup for Email

### 1. Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → Turn it on

### 2. Generate App Password
1. Go to Security → 2-Step Verification → App passwords
2. Select "Mail" and "Other (Custom name)"
3. Name it "Portfolio Contact Form"
4. Copy the generated password
5. Use this password in your `.env` file

## 📁 File Structure
```
portfolio/
├── server.js          # Backend API
├── package.json       # Dependencies
├── index.html         # Portfolio frontend
├── style.css          # Styles
├── script.js          # Frontend JS
├── ateeb.jpg          # Profile photo
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
├── DEPLOYMENT.md      # This file
└── .env              # Environment variables (create this)
```

## 🚨 Important Notes

### Security
- Never commit your `.env` file
- Use environment variables for sensitive data
- The `.gitignore` file will prevent accidental commits

### Email Configuration
- Use Gmail with App Password (not regular password)
- Test email functionality before deploying
- Monitor email delivery in your Gmail

### Domain Setup (Optional)
- You can connect a custom domain later
- Update DNS settings to point to your hosting platform

## 🐛 Troubleshooting

### Email Not Working
1. Check Gmail app password is correct
2. Ensure 2FA is enabled
3. Check server logs for errors
4. Verify environment variables are set

### Deployment Issues
1. Check build logs for errors
2. Ensure all dependencies are in `package.json`
3. Verify start command is correct
4. Check environment variables are set

### CORS Issues
- The server is configured with CORS enabled
- If issues persist, check the frontend URL matches backend

## 📞 Support
If you encounter any issues:
1. Check the server logs
2. Verify all environment variables
3. Test locally first
4. Check hosting platform documentation

## 🎉 Success!
Once deployed, your portfolio will be live with:
- ✅ Professional design
- ✅ Contact form with email functionality
- ✅ Responsive layout
- ✅ All your projects and achievements
- ✅ Social media links
- ✅ Backend API for email handling 