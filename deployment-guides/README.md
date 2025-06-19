# VizeKit Deployment Rehberleri

Bu klasörde VizeKit projesini farklı platformlarda deploy etmek için kapsamlı rehberler bulunmaktadır.

## Mevcut Rehberler

### 1. [Ayrı Barındırma Rehberi](separate-hosting-guide.md)
Frontend ve backend'i farklı platformlarda barındırmak için detaylı rehber.

**Kapsam:**
- Frontend: Vercel, Netlify, Cloudflare Pages, GitHub Pages
- Backend: Railway, Render, Heroku, DigitalOcean
- Database: PlanetScale, Supabase, Neon
- CORS konfigürasyonu ve domain ayarları

**En İyi Kombinasyonlar:**
- **Düşük Maliyet:** Vercel Free + Railway Free + Supabase Free (~$5/ay)
- **Production:** Vercel Pro + Railway Pro + PlanetScale (~$69/ay)
- **Enterprise:** Vercel Enterprise + Custom Infrastructure

### 2. [Frontend Barındırma Rehberi](frontend-only-guide.md)
Sadece frontend'i deploy etmek için detaylı rehber.

**Kapsam:**
- Platform karşılaştırması (Vercel, Netlify, Cloudflare)
- Custom domain ve SSL ayarları
- SEO optimizasyonu
- Performance tuning
- PWA implementasyonu
- Analytics entegrasyonu

**Önerilen Platform:** Vercel (React optimizasyonu için)

### 3. [Backend Barındırma Rehberi](backend-only-guide.md)
Node.js backend'ini ayrı deploy etmek için rehber.

**Kapsam:**
- Platform seçenekleri (Railway, Render, Heroku)
- Database bağlantıları
- Environment variables
- CORS ve güvenlik
- Monitoring ve logging
- Performance optimizasyonu

**Önerilen Platform:** Railway (kolay setup ve PostgreSQL entegrasyonu)

## Hızlı Başlangıç Önerileri

### Yeni Başlayanlar İçin
1. **Railway Full Stack Deploy** - En kolay seçenek
   - Tek platformda hem frontend hem backend
   - Built-in PostgreSQL
   - Otomatik SSL

### Orta Düzey Kullanıcılar İçin
2. **Vercel + Railway Kombinasyonu**
   - Frontend: Vercel (React optimizasyonu)
   - Backend: Railway (kolay database)
   - Maliyet: ~$25/ay

### İleri Düzey Kullanıcılar İçin
3. **Multi-Platform Setup**
   - Frontend: Vercel Pro
   - Backend: DigitalOcean App Platform
   - Database: PlanetScale
   - CDN: Cloudflare
   - Monitoring: Sentry + Vercel Analytics

## Platform Karşılaştırması

| Platform | Frontend | Backend | Database | Maliyet/Ay | Zorluk |
|----------|----------|---------|----------|------------|--------|
| Railway | ✅ | ✅ | ✅ PostgreSQL | $5-20 | Kolay |
| Vercel + Railway | ✅ | ✅ | ✅ PostgreSQL | $20-40 | Orta |
| Netlify + Render | ✅ | ✅ | ✅ PostgreSQL | $19-26 | Orta |
| GitHub Pages + Heroku | ✅ | ✅ | ❌ | $7+ | Zor |

## Maliyet Optimizasyonu

### Ücretsiz/Düşük Maliyet Seçenekleri
- **Frontend:** Vercel Free, Netlify Free, Cloudflare Pages
- **Backend:** Railway Free ($5 kredi), Render Free
- **Database:** Supabase Free, PlanetScale Free

### Production Ready Seçenekleri
- **Frontend:** Vercel Pro ($20), Netlify Pro ($19)
- **Backend:** Railway Pro ($20), Render Paid ($7)
- **Database:** PlanetScale Scaler ($29), Supabase Pro ($25)

## Environment Variables Rehberi

### Frontend Variables
```bash
VITE_API_URL=https://your-backend-domain.com
VITE_APP_NAME=VizeKit
VITE_CONTACT_PHONE=+908503466646
VITE_CONTACT_EMAIL=info@vizekit.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Backend Variables
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
JWT_SECRET=your-secret-key
SENTRY_DSN=https://...
```

## SSL ve Domain Rehberi

### Domain Satın Alma
- **Namecheap:** .com $9/yıl
- **Cloudflare Registrar:** .com $8.15/yıl
- **GoDaddy:** .com $12/yıl

### DNS Ayarları
```
# Vercel için
A @ 76.76.19.19
CNAME www cname.vercel-dns.com

# Netlify için
A @ 75.2.60.5
CNAME www your-site.netlify.app

# Railway için
CNAME api your-backend.railway.app
```

## Performance Best Practices

### Frontend Optimizasyonu
- Code splitting ile lazy loading
- Image optimization
- Bundle size minimization
- CDN kullanımı
- Service Worker ile caching

### Backend Optimizasyonu
- Redis caching
- Database indexing
- Rate limiting
- Compression middleware
- Health check endpoints

## Monitoring ve Analytics

### Frontend Monitoring
- **Vercel Analytics:** Built-in performance metrics
- **Google Analytics 4:** User behavior tracking
- **Sentry:** Error tracking

### Backend Monitoring
- **Railway Metrics:** Built-in server metrics
- **Sentry:** Error tracking ve performance
- **Uptime Robot:** Uptime monitoring

## Security Checklist

### Frontend Security
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] CSP headers configured
- [ ] XSS protection enabled

### Backend Security
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation active
- [ ] SQL injection protection
- [ ] Security headers set

## Backup ve Recovery

### Automated Backups
- Database: Günlük otomatik backup
- Code: Git repository backup
- Environment: Variables export

### Recovery Plan
- Database restore procedures
- Rollback strategies
- Emergency contact procedures

## Destek ve Community

### Resmi Dokümantasyon
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)

### Community Resources
- Railway Discord
- Vercel GitHub Discussions
- Stack Overflow

## Deployment Checklist

### Deployment Öncesi
- [ ] Environment variables ayarlandı
- [ ] Database migration tamamlandı
- [ ] CORS ayarları güncellendi
- [ ] SSL sertifikaları hazır
- [ ] Domain DNS kayıtları güncellendi
- [ ] Test deployment yapıldı

### Deployment Sonrası
- [ ] Frontend yükleme testi
- [ ] API endpoint testleri
- [ ] Form gönderim testleri
- [ ] Mobile responsive test
- [ ] SEO meta tag kontrolleri
- [ ] Analytics kurulumu
- [ ] Error monitoring aktif
- [ ] Backup sistemleri çalışıyor

Bu rehberler ile VizeKit projenizi profesyonel şekilde deploy edebilir ve yönetebilirsiniz.