# VizeKit FTP Deployment - vizekit.com

## Ana Dizine (public_html) Yüklenecek Dosyalar

### 1. Temel Dosyalar
```
public_html/
├── app.js                    ← Entry point
├── package.json              ← HOSTWARE-PRODUCTION-PACKAGE.json'dan
├── .htaccess                 ← Apache config
└── dist/                     ← Build edilmiş uygulama (TÜM KLASÖR)
    ├── index.js
    └── public/
        ├── index.html
        ├── assets/
        └── favicon.ico
```

## FTP Upload Sırası

### Adım 1: Ana Dosyalar
1. **app.js** → public_html/app.js
2. **HOSTWARE-PRODUCTION-PACKAGE.json** → public_html/package.json (yeniden adlandır)
3. **.htaccess** → public_html/.htaccess

### Adım 2: Build Klasörü
4. **dist/** klasörünü tamamıyla public_html/dist/ olarak yükle
   - dist/index.js
   - dist/public/ (tüm alt klasörlerle)

## Klasör Yapısı (Hedef)
```
vizekit.com/public_html/
├── app.js
├── package.json
├── .htaccess
└── dist/
    ├── index.js
    └── public/
        ├── index.html
        ├── assets/
        │   ├── index-*.css
        │   └── index-*.js
        └── favicon.ico
```

## cPanel Node.js Ayarları

### Node.js Selector
- **Application Root:** . (nokta - root directory)
- **Application Startup File:** app.js
- **Node.js Version:** 18.x
- **Application URL:** vizekit.com

### Environment Variables
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=vizekit-secret-2025
```

## Upload Edilmeyecek Dosyalar

### Development Dosyaları (YÜKLEME)
- client/ klasörü
- server/ klasörü
- node_modules/
- .git/
- *.md dosyalar
- vite.config.ts
- tsconfig.json
- tailwind.config.ts

### Sadece Production Dosyaları
✅ app.js
✅ package.json (production version)
✅ .htaccess
✅ dist/ (tamamıyla)

## Test URL'leri

Upload sonrası test edin:
- https://vizekit.com
- https://vizekit.com/visa-checker
- https://vizekit.com/admin-login

## FTP Client Ayarları

### FileZilla Ayarları
- Host: vizekit.com
- Port: 21
- Protocol: FTP
- Transfer Type: Binary (önemli!)

### Upload Modları
- .js, .css, .html → Binary
- Images (.png, .jpg) → Binary
- Text files → Binary (güvenli)

Bu minimal approach ile deployment hızlı ve sorunsuz olacak.