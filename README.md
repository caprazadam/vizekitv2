# Visa Information Platform

A comprehensive visa information platform for Turkish passport holders with administrative tools and user-centric design.

## Technologies
- React.js with TypeScript
- Node.js/Express backend
- PostgreSQL database
- Tailwind CSS
- Drizzle ORM

## Railway Deployment

### Prerequisites
1. GitHub account
2. Railway account (free)

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect Node.js and deploy

3. **Add PostgreSQL Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

4. **Environment Variables**
   Railway automatically sets:
   - `PORT` (for the application)
   - `DATABASE_URL` (for PostgreSQL)
   - `NODE_ENV=production`

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Features
- Visa requirement checker
- Country information
- Application status tracking
- Admin panel
- Consultation booking
- Payment integration ready