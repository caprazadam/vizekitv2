# Ayrı Barındırma Seçenekleri Rehberi - VizeKit

Frontend ve backend'i ayrı platformlarda barındırmak için detaylı rehber.

## İçindekiler
1. [Frontend Barındırma Seçenekleri](#frontend-barındırma)
2. [Backend Barındırma Seçenekleri](#backend-barındırma)
3. [Veritabanı Seçenekleri](#veritabanı-seçenekleri)
4. [Bağlantı Yapılandırması](#bağlantı-yapılandırması)
5. [SSL ve Domain Ayarları](#ssl-ve-domain)
6. [Performans Optimizasyonu](#performans-optimizasyonu)

---

## Frontend Barındırma Seçenekleri

### 1. Vercel (Önerilen)

**Avantajları:**
- React/Next.js için optimize edilmiş
- Otomatik HTTPS
- Global CDN
- Sınırsız bant genişliği
- Otomatik deployment

**Kurulum:**
```bash
# Vercel CLI kurulumu
npm i -g vercel

# Proje build
npm run build

# Deploy
vercel --prod
```

**Vercel Konfigürasyonu (vercel.json):**
```json
{
  "name": "vizekit-frontend",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend-domain.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend-domain.com"
  }
}
```

**Limitler:**
- Free: 100GB bant genişliği/ay
- Pro: $20/ay - 1TB bant genişliği

---

### 2. Netlify

**Avantajları:**
- Kolay kullanım
- Form handling
- Split testing
- Branch previews

**Kurulum:**
```bash
# Netlify CLI kurulumu
npm install netlify-cli -g

# Build ve deploy
npm run build
netlify deploy --prod --dir=dist/public
```

**Netlify Konfigürasyonu (_redirects):**
```
/api/* https://your-backend-domain.com/api/:splat 200
/* /index.html 200
```

**netlify.toml:**
```toml
[build]
  publish = "dist/public"
  command = "npm run build"

[build.environment]
  VITE_API_URL = "https://your-backend-domain.com"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-domain.com/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Limitler:**
- Free: 100GB bant genişliği/ay
- Pro: $19/ay - 400GB bant genişliği

---

### 3. GitHub Pages (Sadece Static)

**Kurulum:**
```bash
# gh-pages paketi
npm install --save-dev gh-pages

# package.json'a ekle
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist/public"
}

# Deploy
npm run deploy
```

**GitHub Actions (.github/workflows/deploy.yml):**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

**Limitler:**
- Tamamen ücretsiz
- Public repository gerekli
- 1GB storage limiti

---

### 4. Cloudflare Pages

**Avantajları:**
- Ücretsiz CDN
- Sınırsız bant genişliği
- Workers integration

**Kurulum:**
1. Cloudflare hesabı oluştur
2. Pages sekmesine git
3. GitHub repository'yi bağla
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist/public`

**Environment Variables:**
```
VITE_API_URL=https://your-backend-domain.com
NODE_VERSION=18
```

---

## Backend Barındırma Seçenekleri

### 1. Railway (Önerilen)

**Kurulum:**
```bash
# Railway CLI
npm install -g @railway/cli

# Login ve deploy
railway login
railway init
railway up
```

**railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

**Limitler:**
- Free: $5 kredi/ay
- Pro: $20/ay - $20 kredi

---

### 2. Render

**Avantajları:**
- Kolay kurulum
- Auto-deploy
- Ücretsiz PostgreSQL

**Web Service Ayarları:**
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node

**Environment Variables:**
```
DATABASE_URL=your-postgres-url
NODE_ENV=production
PORT=10000
```

**Limitler:**
- Free: 512MB RAM, sleep after 15min inactivity
- Paid: $7/ay - 512MB RAM, no sleep

---

### 3. Heroku

**Kurulum:**
```bash
# Heroku CLI kurulumu
npm install -g heroku

# Git ve Heroku
git init
heroku create vizekit-backend
git add .
git commit -m "Initial commit"
git push heroku main
```

**Procfile:**
```
web: npm start
```

**Limitler:**
- No free tier (minimum $5/ay)
- Dyno $7/ay

---

### 4. DigitalOcean App Platform

**Kurulum:**
1. DigitalOcean hesabı oluştur
2. App Platform'a git
3. GitHub repository'yi bağla

**App Spec:**
```yaml
name: vizekit-backend
services:
- name: api
  source_dir: /
  github:
    repo: your-username/vizekit-backend
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: NODE_ENV
    value: production
```

**Limitler:**
- $5/ay - 512MB RAM

---

## Veritabanı Seçenekleri

### 1. PlanetScale (MySQL)

**Avantajları:**
- Serverless MySQL
- Branching özelliği
- Auto-scaling

**Kurulum:**
```bash
# PlanetScale CLI
npm install -g @planetscale/cli

# Database oluştur
pscale auth login
pscale database create vizekit
pscale connect vizekit main
```

**Connection String:**
```
DATABASE_URL=mysql://username:password@hostname:port/database?sslaccept=strict
```

**Limitler:**
- Free: 1 database, 1GB storage
- Scaler: $29/ay - 10GB storage

---

### 2. Supabase (PostgreSQL)

**Kurulum:**
1. Supabase.com'da hesap oluştur
2. Yeni proje oluştur
3. Database URL'yi kopyala

**Connection String:**
```
DATABASE_URL=postgresql://postgres:password@db.hostname.supabase.co:5432/postgres
```

**Drizzle Migration:**
```bash
# Supabase URL'yi .env'e ekle
echo "DATABASE_URL=your-supabase-url" >> .env

# Migration çalıştır
npm run db:push
```

**Limitler:**
- Free: 500MB database, 2GB transfer
- Pro: $25/ay - 8GB database

---

### 3. Neon (PostgreSQL)

**Avantajları:**
- Serverless PostgreSQL
- Branching
- Auto-pause

**Kurulum:**
1. Neon.tech'te hesap oluştur
2. Database oluştur
3. Connection string'i kopyala

**Limitler:**
- Free: 512MB storage
- Scale: $19/ay - 4GB storage

---

## Bağlantı Yapılandırması

### Frontend Konfigürasyonu

**Environment Variables (.env.production):**
```bash
VITE_API_URL=https://your-backend-domain.com
VITE_APP_NAME=VizeKit
VITE_CONTACT_PHONE=+908503466646
VITE_CONTACT_EMAIL=info@vizekit.com
```

**API Client Güncelleme (lib/queryClient.ts):**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  });

  return throwIfResNotOk(response);
}
```

---

### Backend CORS Konfigürasyonu

**Express CORS Ayarları (server/index.ts):**
```typescript
import cors from 'cors';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-frontend-domain.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

---

## SSL ve Domain Ayarları

### Custom Domain Ekleme

**Vercel:**
1. Vercel dashboard → Settings → Domains
2. Add domain
3. DNS kayıtlarını güncelle:
   ```
   CNAME www your-app.vercel.app
   A @ 76.76.19.19
   ```

**Netlify:**
1. Site settings → Domain management
2. Add custom domain
3. DNS ayarları:
   ```
   CNAME www your-app.netlify.app
   A @ 75.2.60.5
   ```

**Railway:**
1. Settings → Domains
2. Custom domain ekle
3. CNAME kaydı:
   ```
   CNAME your-domain railway.app
   ```

---

### DNS Konfigürasyonu

**Cloudflare DNS (Önerilen):**
```
Type    Name    Content                         TTL
A       @       Frontend-IP-Address            Auto
CNAME   www     your-domain.com                Auto
CNAME   api     your-backend-domain.com        Auto
TXT     @       v=spf1 include:_spf.google.com ~all
```

---

## Performans Optimizasyonu

### Frontend Optimizasyonu

**Vite Build Konfigürasyonu:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          utils: ['clsx', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

---

### Backend Optimizasyonu

**Redis Cache:**
```typescript
import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// Cache middleware
export const cacheMiddleware = (duration = 300) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await redisClient.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      const originalJson = res.json;
      res.json = function(body) {
        redisClient.setex(key, duration, JSON.stringify(body));
        return originalJson.call(this, body);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};
```

---

## Maliyet Analizi

### Düşük Maliyet Seçenekleri (0-10$/ay)

**Free Tier Kombinasyonu:**
- Frontend: Vercel Free (100GB/ay)
- Backend: Railway Free ($5 kredi/ay)
- Database: Supabase Free (500MB)
- Domain: Namecheap (.com $9/yıl)

**Toplam: ~$5-10/ay**

### Orta Maliyet Seçenekleri (20-50$/ay)

**Production Ready:**
- Frontend: Vercel Pro ($20/ay)
- Backend: Railway Pro ($20/ay)
- Database: PlanetScale Scaler ($29/ay)

**Toplam: ~$69/ay**

### Yüksek Trafik Seçenekleri (100$+/ay)

**Enterprise:**
- Frontend: Vercel Enterprise
- Backend: DigitalOcean Kubernetes
- Database: AWS RDS
- CDN: AWS CloudFront

---

## Deployment Checklist

### Deployment Öncesi
- [ ] Environment variables ayarlandı
- [ ] Database migration tamamlandı
- [ ] CORS ayarları güncellendi
- [ ] SSL sertifikaları hazır
- [ ] Domain DNS kayıtları güncellendi

### Deployment Sonrası
- [ ] Frontend yükleme testi
- [ ] API endpoint testleri
- [ ] Form gönderim testleri
- [ ] Mobile responsive test
- [ ] SEO meta tag kontrolleri

Bu rehber ile frontend ve backend'inizi ayrı platformlarda güvenle barındırabilir, maliyetleri optimize edebilir ve performansı maksimize edebilirsiniz.