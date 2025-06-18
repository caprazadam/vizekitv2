# VizeKit FTP Upload Checklist - vizekit.com

## Kesin Upload Listesi

### FTP ile public_html'e yükle:

1. **app.js** → public_html/app.js
2. **package-for-ftp.json** → public_html/package.json (adını değiştir)
3. **.htaccess** → public_html/.htaccess
4. **dist** klasörü → public_html/dist (tüm içeriğiyle)

## cPanel Node.js Selector

**Application Root:** . (nokta)
**Startup File:** app.js
**Node.js Version:** 18.x
**URL:** vizekit.com

**Environment Variables:**
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=vizekit2025secret
```

## Terminal Komutları

```bash
cd public_html
npm install
```

## Final Kontrol

Upload sonrası public_html yapısı:
```
public_html/
├── app.js
├── package.json (3 dependency ile)
├── .htaccess
└── dist/
    ├── index.js
    └── public/
```

Bu dosyalar ile npm install başarılı olur ve uygulama çalışır.