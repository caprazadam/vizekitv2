# VizeKit - Hostware.com.tr Kurulum Rehberi

## Adım 1: Dosya Yükleme

1. **cPanel File Manager'ı açın**
2. **public_html klasöründe "vizekit" adında klasör oluşturun**
3. **vizekit klasörüne tüm proje dosyalarını yükleyin:**
   - dist/ klasörü (build edilmiş dosyalar)
   - hostware-package.json dosyasını package.json olarak yükleyin
   - app.js (entry point)
   - .htaccess

## Adım 2: Node.js Aktivasyonu

1. **cPanel → Node.js Selector'a gidin**
2. **ÇÖZÜM - Application Root ayarı:**
   - Node.js Version: 18.x veya 20.x
   - Application Root: **vizekit** (public_html yazmayın!)
   - Application Startup File: app.js
   - Application URL: vizekit.com

**ÖNEMLİ:** "public_html" yazmak yerine "vizekit" veya başka bir klasör adı kullanın. Hostware cPanel'i public_html'i doğrudan Node.js root olarak kabul etmiyor.

## Adım 3: Dependencies Kurulumu

1. **cPanel Terminal'i açın**
2. **Komutları çalıştırın:**
```bash
cd public_html/vizekit
npm install --production
```

## Adım 4: Environment Variables

**Node.js Selector → Environment Variables:**
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=rastgele-gizli-anahtar-buraya
```

## Adım 5: Uygulamayı Başlatma

1. **Node.js Selector → Restart**
2. **Status: Running olmalı**
3. **vizekit.com adresini test edin**

## Sorun Giderme

### Uygulama Çalışmıyorsa:
- cPanel → Node.js Selector → Logs kontrol edin
- Terminal'den: `npm install` tekrar çalıştırın
- Node.js version 18+ seçili olduğundan emin olun

### Domain Ayarları:
- DNS ayarlarının Hostware'i gösterdiğinden emin olun
- SSL sertifikası otomatik aktivasyon için 24 saat bekleyin

### Performans:
- Cloudflare kullanarak hızlandırabilirsiniz
- cPanel'den caching ayarlarını aktif edin

## Önemli Dosyalar

- `app.js` - Ana giriş noktası
- `dist/` - Build edilmiş frontend ve backend
- `package.json` - Dependencies listesi
- `.htaccess` - URL yönlendirme kuralları

## İletişim Bilgileri Test

Kurulum sonrası şu bilgilerin doğru göründüğünden emin olun:
- Telefon: +908503466646
- Email: info@vizekit.com
- Adres: Sakarya Mah. 57015. SK. No: 25, Kahramanmaraş
- WhatsApp: +908503466646

Site başarıyla kurulduğunda tüm vize hizmetleri ve pasaport dosyası yükleme özellikları çalışır durumda olacak.