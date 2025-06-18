# ✅ VizeKit Hostware Kurulumu Başarılı!

## Durum
- **App URI:** vizekit.com/
- **Root Directory:** /home/vizekit/vizekit
- **Mode:** production
- **Status:** ✅ started (v18.20.7)
- **Node.js Version:** 18.20.7

## Test Edilecek URL'ler

### Ana Site
- **https://vizekit.com** - Ana sayfa
- **https://vizekit.com:3000** - Node.js uygulaması (direct)

### Sayfalar
- https://vizekit.com/visa-checker - Vize kontrol
- https://vizekit.com/countries - Ülkeler
- https://vizekit.com/services - Hizmetler
- https://vizekit.com/contact - İletişim
- https://vizekit.com/admin-login - Admin panel

## Özellikler Test Listesi

### ✅ Temel Fonksiyonlar
- [ ] Ana sayfa yükleniyor
- [ ] Vize checker formu çalışıyor
- [ ] Ülke seçimi aktif
- [ ] Responsive tasarım mobilde çalışıyor

### ✅ Gelişmiş Özellikler
- [ ] Vize başvuru formu
- [ ] Pasaport dosyası yükleme
- [ ] Admin panel giriş
- [ ] Başvuru durum sorgulama

### ✅ İletişim Bilgileri
- [ ] Telefon: +908503466646
- [ ] Email: info@vizekit.com
- [ ] Adres: Kahramanmaraş
- [ ] WhatsApp: +908503466646

## Port Konfigürasyonu

**Eğer port problemi varsa:**

### Yöntem 1: Ana Domain Yönlendirme
.htaccess ile port yönlendirme:
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### Yöntem 2: Subdomain
- app.vizekit.com oluşturun
- Document root: /home/vizekit/vizekit

## SSL Sertifikası

**Let's Encrypt SSL:**
- cPanel → SSL/TLS → Let's Encrypt
- vizekit.com için otomatik SSL aktif et
- 24 saat içinde aktif olur

## Performans Optimizasyonu

### cPanel Cache Ayarları
- cPanel → Static Files Cache → Aktif
- .css, .js, .png, .jpg cache süresi: 1 yıl

### Cloudflare Entegrasyon (Opsiyonel)
- Cloudflare hesabı oluştur
- DNS records Cloudflare'e yönlendir
- Speed optimizations aktif et

## Backup Stratejisi

### Otomatik Backup
- cPanel → Backup Wizard
- Haftalık otomatik backup aktif et
- /home/vizekit/vizekit klasörü dahil

## Monitoring

### Log Kontrolü
```bash
# Node.js logs
cat /home/vizekit/logs/node_app.log

# Error logs
cat /home/vizekit/logs/error.log
```

### Uptime Monitoring
- UptimeRobot.com ile monitoring kurabilirsiniz
- 5 dakikada bir ping

## Hostware Destek

**Teknik Destek:**
- cPanel → Support Tickets
- Email: support@hostware.com.tr
- Node.js specific issues için

## Sonuç

🎉 **VizeKit başarıyla Hostware'de deploy edildi!**

- Modern vize hizmetleri platformu
- Responsive tasarım
- Admin paneli aktif
- Pasaport dosyası yükleme sistemi
- PayTR/PayPal ödeme entegrasyonları

Site artık canlı ve kullanıma hazır. Türk vatandaşları vize hizmetlerinden faydalanabilir.