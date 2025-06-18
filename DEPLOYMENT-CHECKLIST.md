# VizeKit Hostware Deployment Checklist

## Yüklenecek Dosyalar ✓

### Ana Dosyalar (public_html'e)
- [x] `app.js` - Hostware entry point
- [x] `package.json` - Dependencies
- [x] `.htaccess` - Apache configuration
- [x] `dist/` - Build edilmiş uygulama
  - [x] `dist/index.js` - Server
  - [x] `dist/public/` - Frontend assets

### Kurulum Dosyaları
- [x] `HOSTWARE-KURULUM.md` - Türkçe kurulum rehberi
- [x] `hostware-deployment.md` - Detaylı teknik rehber
- [x] `hostware-env-template.txt` - Environment variables

## Hostware cPanel Ayarları

### Node.js Selector
- Node.js Version: **18.x veya 20.x**
- Application Root: **public_html**
- Application Startup File: **app.js**
- Application URL: **vizekit.com**

### Environment Variables
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=rastgele-gizli-anahtar
```

### Terminal Komutları
```bash
cd public_html
npm install --production
```

## Domain Ayarları
- Ana domain: vizekit.com
- SSL: Otomatik Let's Encrypt
- DNS: Hostware nameservers

## Test Edilecek Özellikler

### Ana Sayfalar
- [ ] Ana sayfa (/)
- [ ] Vize kontrol (/visa-checker)
- [ ] Ülkeler (/countries)
- [ ] Hizmetler (/services)
- [ ] İletişim (/contact)
- [ ] Başvuru sorgula (/application-status)

### Özel Özellikler
- [ ] Vize başvuru formu
- [ ] Pasaport dosyası yükleme
- [ ] Admin panel (/admin-login)
- [ ] Responsive tasarım (mobil/tablet)

### İletişim Bilgileri Kontrolü
- [ ] Telefon: +908503466646
- [ ] Email: info@vizekit.com
- [ ] Adres: Kahramanmaraş
- [ ] WhatsApp: +908503466646

## Sorun Giderme

### Uygulama Başlamıyorsa
1. cPanel → Node.js Selector → Logs kontrol
2. Node.js version 18+ seçili olduğundan emin ol
3. `npm install` komutunu tekrar çalıştır

### Sayfa Yüklenmiyor
1. .htaccess dosyasının doğru konumda olduğunu kontrol et
2. Domain DNS ayarlarını kontrol et
3. SSL sertifikası aktif mi kontrol et

### Performance
1. Cloudflare entegrasyonu (opsiyonel)
2. cPanel caching ayarları
3. Image optimization

## Hostware Destek
- cPanel → Support tickets
- Telefon: Hostware müşteri hizmetleri
- Node.js specific issues için teknik destek

Site başarıyla kurulduğunda tüm vize hizmetleri, pasaport dosyası yükleme, admin paneli ve ödeme entegrasyonları çalışır durumda olacak.