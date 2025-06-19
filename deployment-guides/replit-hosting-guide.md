# Replit Barındırma Rehberi - VizeKit

Replit'te full-stack uygulama barındırma seçenekleri ve fiyatlandırma.

## Replit Hosting Seçenekleri

### 1. Replit Deployments (Önerilen)

**Özellikler:**
- Otomatik HTTPS
- Custom domain desteği
- Zero-downtime deployments
- Otomatik scaling
- Built-in monitoring

**Kurulum:**
```bash
# Repl oluştur
# Deploy butona tıkla
# Environment variables ayarla
```

**Avantajları:**
- Tek tıkla deployment
- Git entegrasyonu
- Collaboration tools
- IDE entegrasyonu

---

## Fiyatlandırma Yapısı

### Replit Core (Ücretsiz)
- **Compute:** Sınırlı CPU/RAM
- **Storage:** 1GB
- **Bandwidth:** Sınırlı
- **Always-on:** ❌ (idle sonrası uyku)
- **Custom Domain:** ❌
- **Deployment:** Temel özellikler

### Replit Hacker ($7/ay)
- **Compute:** Daha fazla CPU/RAM
- **Storage:** 5GB
- **Bandwidth:** Artırılmış
- **Always-on:** ✅ (5 repl için)
- **Custom Domain:** ❌
- **Private Repls:** ✅

### Replit Pro ($20/ay)
- **Compute:** Professional tier
- **Storage:** 50GB
- **Bandwidth:** Yüksek limit
- **Always-on:** ✅ (unlimited)
- **Custom Domain:** ✅
- **Deployment:** Pro features
- **Team Collaboration:** ✅

### Replit Teams ($20/kullanıcı/ay)
- Pro'nun tüm özellikleri
- Team management
- Advanced collaboration
- Organization billing

---

## Replit Deployments Fiyatlandırması

### Static Deployments
- **Ücretsiz:** 3 deployment
- **Pro:** Unlimited deployments
- **Bandwidth:** Replit limitlerinde

### Autoscale Deployments
- **Base Cost:** $2/ay
- **vCPU:** $10/vCPU/ay
- **RAM:** $3.50/GB/ay
- **Egress:** $0.10/GB

**Örnek Hesaplama:**
```
1 vCPU + 1GB RAM deployment:
$2 (base) + $10 (CPU) + $3.50 (RAM) = $15.50/ay
```

---

## Replit vs Diğer Platformlar

### Maliyet Karşılaştırması

| Platform | Starter Plan | Pro Plan | Custom Domain | Database |
|----------|--------------|----------|---------------|----------|
| **Replit** | $7/ay | $20/ay | Pro'da ✅ | Ayrı ücret |
| **Railway** | $5 kredi | $20/ay | ✅ | Dahil |
| **Vercel** | Ücretsiz | $20/ay | ✅ | Ayrı |
| **Netlify** | Ücretsiz | $19/ay | ✅ | Ayrı |

### Özellik Karşılaştırması

| Özellik | Replit | Railway | Vercel |
|---------|--------|---------|--------|
| **IDE Entegrasyonu** | ✅ Native | ❌ | ❌ |
| **Collaboration** | ✅ Real-time | ❌ | Team planında |
| **Auto-scaling** | ✅ | ✅ | ✅ |
| **Database** | Ayrı servis | ✅ Dahil | Ayrı |
| **Learning Curve** | Kolay | Orta | Orta |

---

## Replit Deployment Kurulumu

### 1. Proje Hazırlığı

**package.json güncelleme:**
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "start": "NODE_ENV=production tsx server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "echo 'Server build complete'"
  }
}
```

**replit.nix (Dependencies):**
```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.npm
    pkgs.postgresql
  ];
}
```

### 2. Environment Variables

**Replit Secrets:**
```bash
DATABASE_URL=postgresql://...
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

### 3. Deployment Konfigürasyonu

**Deploy ayarları:**
- Build Command: `npm run build`
- Start Command: `npm start`
- Root Directory: `/`

---

## Database Seçenekleri

### 1. Replit Database
- **NoSQL:** Key-value store
- **Fiyat:** Pro planında dahil
- **Limit:** 50MB (Pro)

**Kullanım:**
```javascript
import { Database } from "@replit/database";
const db = new Database();

await db.set("key", "value");
const value = await db.get("key");
```

### 2. External Database (Önerilen)

**PostgreSQL için Supabase:**
```bash
# Replit Secrets'e ekle
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
```

**MySQL için PlanetScale:**
```bash
DATABASE_URL=mysql://username:password@hostname:port/database
```

---

## Custom Domain Ayarları

### Replit Pro Domain

**Adım 1:** Domain satın al (Namecheap, Cloudflare)

**Adım 2:** DNS ayarları
```
Type    Name    Value
CNAME   www     your-repl-name.your-username.repl.co
A       @       35.190.215.161
```

**Adım 3:** Replit'te domain ekle
- Deployments → Settings
- Custom Domain ekle
- SSL otomatik aktifleşir

---

## Performance ve Limitler

### Compute Limits

**Ücretsiz Plan:**
- CPU: 0.5 vCPU
- RAM: 0.5GB
- Network: 1GB/ay

**Hacker Plan:**
- CPU: 1 vCPU
- RAM: 1GB
- Network: 10GB/ay

**Pro Plan:**
- CPU: 2 vCPU
- RAM: 2GB
- Network: 100GB/ay

### Storage Limits

- **Code Storage:** Plan limitlerinde
- **File Upload:** 50MB/dosya
- **Database:** Ayrı limitler

---

## Monitoring ve Logging

### Built-in Monitoring

**Replit Console:**
- Real-time logs
- Resource usage
- Error tracking

**Metrics:**
- CPU utilization
- Memory usage
- Network traffic

### External Monitoring

**Sentry Integration:**
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: "replit-production"
});
```

---

## Replit Kullanımı - Artılar ve Eksiler

### Artılar ✅
- **IDE Entegrasyonu:** Kod editörü dahil
- **Collaboration:** Real-time işbirliği
- **Kolay Setup:** Minimal konfigürasyon
- **Learning Friendly:** Eğitim için ideal
- **Package Management:** Otomatik dependency yönetimi

### Eksiler ❌
- **Maliyet:** Pro plan pahalı ($20/ay)
- **Performance:** Diğer platformlardan düşük
- **Vendor Lock-in:** Replit'e bağımlılık
- **Limited Scaling:** Enterprise ölçekte sınırlı
- **Database:** Ayrı servis gerekli

---

## Replit Kullanım Senaryoları

### İdeal Durumlar

**1. Öğrenme ve Prototyping**
- Hızlı test ve geliştirme
- Collaboration gereken projeler
- Eğitim amaçlı projeler

**2. Küçük-Orta Projeler**
- Düşük-orta trafikli uygulamalar
- MVP ve demo projeler
- Hackathon projeleri

### İdeal Olmayan Durumlar

**1. Production Enterprise**
- Yüksek trafik uygulamaları
- Mission-critical sistemler
- Karmaşık microservice architectures

**2. Maliyet Odaklı Projeler**
- Budget kısıtlı projeler
- Uzun vadeli production apps

---

## Migration Stratejisi

### Replit'ten Diğer Platformlara

**1. Code Export:**
```bash
# Git repository oluştur
git init
git add .
git commit -m "Export from Replit"
git push origin main
```

**2. Environment Variables:**
```bash
# Replit Secrets → .env dosyası
echo "DATABASE_URL=..." > .env
echo "NODE_ENV=production" >> .env
```

**3. Deployment:**
- Railway, Vercel, veya Netlify'a deploy
- DNS kayıtlarını güncelle

### Diğer Platformlardan Replit'e

**1. Import Project:**
- GitHub'dan Replit'e import
- Dependencies otomatik yüklenir

**2. Environment Setup:**
- Secrets kısmına variables ekle
- Database bağlantısını test et

---

## Sonuç ve Öneriler

### Replit Kullanmalısınız Eğer:
- ✅ Collaboration önemli
- ✅ IDE entegrasyonu istiyorsunuz
- ✅ Hızlı prototyping yapıyorsunuz
- ✅ Eğitim/öğrenme amaçlı

### Alternatif Kullanmalısınız Eğer:
- ❌ Maliyet kritik ($20/ay çok)
- ❌ Yüksek performance gerekli
- ❌ Production enterprise app
- ❌ Uzun vadeli stability önemli

### VizeKit için Öneri:
**Development:** Replit ideal (collaboration + IDE)
**Production:** Railway/Vercel daha uygun (maliyet + performance)

Bu rehberle Replit'in size uygun olup olmadığını değerlendirebilir ve karar verebilirsiniz.