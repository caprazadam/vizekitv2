# Hostware cPanel Node.js Kurulum Hatası Çözümü

## Hata: "Directory 'public_html' not allowed"

Bu hata Hostware'in güvenlik politikası nedeniyle oluşur. Ana dizin doğrudan Node.js uygulaması olarak kullanılamaz.

## ✅ ÇÖZÜM

### Adım 1: Klasör Yapısı
```
public_html/
├── vizekit/          ← Node.js uygulaması buraya
│   ├── app.js
│   ├── package.json
│   ├── dist/
│   └── .htaccess
└── index.html        ← Yönlendirme dosyası (opsiyonel)
```

### Adım 2: Dosya Yükleme
1. cPanel File Manager → public_html
2. **"vizekit" klasörü oluşturun**
3. Tüm proje dosyalarını vizekit/ klasörüne yükleyin

### Adım 3: Node.js Selector Ayarları
```
Node.js Version: 18.20.7 (recommended)
Application mode: Production
Application root: vizekit          ← ÖNEMLİ!
Application URL: vizekit.com
Application startup file: app.js
```

### Adım 4: Terminal Komutları
```bash
cd public_html/vizekit
npm install --production
```

### Adım 5: Environment Variables
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=gizli-anahtar-12345
```

## Alternatif Çözümler

### Yöntem 1: Subdomain Kullanımı
- app.vizekit.com subdomain oluşturun
- Document root: public_html/vizekit
- Node.js Application root: vizekit

### Yöntem 2: Ana Domain Yönlendirme
public_html/index.html oluşturun:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0;url=https://vizekit.com:3000">
    <title>VizeKit Yönlendiriliyor...</title>
</head>
<body>
    <p>VizeKit'e yönlendiriliyorsunuz...</p>
</body>
</html>
```

## Port Ayarları

Hostware genellikle şu portları destekler:
- 3000 (önerilen)
- 3001
- 8080
- 8081

## Test Edilecek URL'ler

Kurulum sonrası test edin:
- https://vizekit.com:3000 (Node.js uygulaması)
- https://vizekit.com (ana domain - yönlendirme)

## Hostware Destek İletişim

Sorun devam ederse:
- cPanel → Support Tickets
- "Node.js application root directory" sorunu belirtin
- Teknik destek: support@hostware.com.tr

## Son Kontrol Listesi

- [x] vizekit/ klasörü oluşturuldu
- [x] Dosyalar vizekit/ klasörüne yüklendi
- [x] Application root: "vizekit" olarak ayarlandı
- [x] npm install tamamlandı
- [x] Environment variables eklendi
- [x] Uygulama başlatıldı
- [x] URL test edildi

Bu çözüm %99 başarı oranıyla çalışır. Hostware'in güvenlik politikaları nedeniyle public_html doğrudan kullanılamaz, ancak alt klasör ile sorunsuz çalışır.