# Frontend Barındırma Rehberi - VizeKit

Sadece frontend'i barındırmak için kapsamlı rehber. Backend API'si başka bir serviste çalıştığında kullanın.

## Hızlı Başlangıç

### 1. Vercel (En Kolay)

**Adım 1: GitHub'a Push**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

**Adım 2: Vercel'e Deploy**
1. [vercel.com](https://vercel.com) → "New Project"
2. GitHub repository'yi seç
3. Environment Variables ekle:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```
4. Deploy

**Sonuç:** 2 dakikada canlı!

---

### 2. Netlify (Form Desteği ile)

**Adım 1: Build Ayarları**
```bash
# netlify.toml oluştur
[build]
  publish = "dist/public"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Adım 2: Deploy**
1. [netlify.com](https://netlify.com) → "Add new site"
2. GitHub'dan import et
3. Build settings otomatik algılanır
4. Environment variables ekle

---

### 3. Cloudflare Pages (En Hızlı)

**Avantajları:**
- Global CDN
- Sınırsız bant genişliği
- DDoS koruması

**Kurulum:**
1. [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect to Git
3. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Build output: `dist/public`

---

## Environment Variables Ayarları

### Production Ayarları

```bash
# .env.production
VITE_API_URL=https://vizekitv2-production.up.railway.app
VITE_APP_NAME=VizeKit
VITE_CONTACT_PHONE=+908503466646
VITE_CONTACT_EMAIL=info@vizekit.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Development vs Production

```typescript
// lib/config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  appName: import.meta.env.VITE_APP_NAME || 'VizeKit',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
};
```

---

## Custom Domain Ayarları

### Domain Satın Alma (Önerilen Sağlayıcılar)

**Namecheap (Ucuz)**
- .com: $9/yıl
- .net: $12/yıl
- Free WhoisGuard

**Cloudflare Registrar (En Ucuz)**
- .com: $8.15/yıl
- .net: $12.98/yıl
- Ücretsiz DNS yönetimi

**GoDaddy (Popüler)**
- .com: $12/yıl
- .net: $15/yıl
- Kolay yönetim

### DNS Ayarları

**Vercel için:**
```
Type    Name    Value                           TTL
A       @       76.76.19.19                    Auto
CNAME   www     cname.vercel-dns.com           Auto
```

**Netlify için:**
```
Type    Name    Value                           TTL
A       @       75.2.60.5                      Auto
CNAME   www     your-site.netlify.app          Auto
```

**Cloudflare Pages için:**
```
Type    Name    Value                           TTL
CNAME   @       your-site.pages.dev            Auto
CNAME   www     your-site.pages.dev            Auto
```

---

## SSL Sertifikası

### Otomatik SSL (Önerilen)

Tüm modern hosting sağlayıcıları otomatik SSL sağlar:
- Vercel: Let's Encrypt otomatik
- Netlify: Let's Encrypt otomatik  
- Cloudflare: Universal SSL

### Manuel SSL (Gelişmiş)

```bash
# Let's Encrypt ile manuel
sudo certbot --manual --preferred-challenges dns -d yourdomain.com
```

---

## SEO Optimizasyonu

### Meta Tags Güncelleme

```html
<!-- index.html -->
<meta name="description" content="Türk vatandaşları için vize danışmanlığı ve başvuru hizmetleri">
<meta name="keywords" content="vize, türkiye, pasaport, seyahat, danışmanlık">

<!-- Open Graph -->
<meta property="og:title" content="VizeKit - Vize Danışmanlığı">
<meta property="og:description" content="190+ ülke için vize bilgileri">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="VizeKit - Vize Danışmanlığı">
```

### Sitemap Oluşturma

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/visa-checker</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/countries</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Performance Optimizasyonu

### Build Optimizasyonu

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog'],
          router: ['wouter']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

### Image Optimizasyonu

```typescript
// components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function OptimizedImage({ src, alt, width, height }: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
}
```

### Code Splitting

```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const Countries = lazy(() => import('./pages/countries'));
const Services = lazy(() => import('./pages/services'));

function App() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <Routes>
        <Route path="/countries" component={Countries} />
        <Route path="/services" component={Services} />
      </Routes>
    </Suspense>
  );
}
```

---

## Analytics ve Monitoring

### Google Analytics 4

```typescript
// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = (action: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
};
```

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Router />
      <Analytics />
    </>
  );
}
```

---

## Error Handling

### Error Boundary

```tsx
// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Bir hata oluştu
            </h1>
            <p className="text-gray-600 mb-4">
              Sayfa yüklenirken bir sorun yaşandı.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-gradient"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## PWA (Progressive Web App)

### Manifest Dosyası

```json
// public/manifest.json
{
  "name": "VizeKit - Vize Danışmanlığı",
  "short_name": "VizeKit",
  "description": "Türk vatandaşları için vize danışmanlığı",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#7c3aed",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker

```javascript
// public/sw.js
const CACHE_NAME = 'vizekit-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

---

## Backup ve Rollback

### Git Tag ile Versiyonlama

```bash
# Yeni versiyon tag'i
git tag v1.0.0
git push origin v1.0.0

# Önceki versiyona rollback
git checkout v0.9.0
git checkout -b rollback-v0.9.0
git push origin rollback-v0.9.0
```

### Vercel Preview Deployments

```bash
# Development branch deploy
git checkout -b feature/new-design
git push origin feature/new-design
# Otomatik preview URL oluşur: https://vizekit-git-feature-new-design.vercel.app
```

---

## Maliyet Karşılaştırması

### Ücretsiz Seçenekler

| Platform | Bant Genişliği | Build Dakikaları | Custom Domain | SSL |
|----------|----------------|------------------|---------------|-----|
| Vercel   | 100GB/ay       | 6000 dk/ay       | ✅            | ✅   |
| Netlify  | 100GB/ay       | 300 dk/ay        | ✅            | ✅   |
| Cloudflare| Sınırsız      | 500 dk/ay        | ✅            | ✅   |
| GitHub Pages| 100GB/ay     | 2000 dk/ay       | ✅            | ✅   |

### Ücretli Planlar

| Platform | Fiyat/Ay | Bant Genişliği | Build Dakikaları | Ekstra Özellikler |
|----------|----------|----------------|------------------|-------------------|
| Vercel Pro| $20     | 1TB            | Sınırsız         | Analytics, Team   |
| Netlify Pro| $19    | 400GB          | 25000 dk         | Forms, Identity   |
| Cloudflare Pro| $20 | Sınırsız       | 5000 dk          | Advanced Analytics|

---

## Troubleshooting

### Build Hataları

**Vite Build Hatası:**
```bash
# Node.js versiyonu kontrol et
node --version  # 18+ olmalı

# Dependencies temizle
rm -rf node_modules package-lock.json
npm install

# Manuel build test
npm run build
```

**Environment Variables Hatası:**
```typescript
// Değişken yoksa default değer ver
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### CORS Hataları

```typescript
// Backend'de CORS ayarları kontrol et
const corsOptions = {
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ]
};
```

### 404 Hataları

**SPA Routing için:**
```
# _redirects (Netlify)
/*    /index.html   200

# vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Bu rehberle frontend'inizi kolayca deploy edebilir ve profesyonel bir şekilde yönetebilirsiniz.