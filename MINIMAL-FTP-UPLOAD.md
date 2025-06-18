# VizeKit FTP Upload - Sadece Gerekli Dosyalar

## FTP ile public_html'e Yükle

### 4 Dosya/Klasör
1. **app.js**
2. **HOSTWARE-PRODUCTION-PACKAGE.json** → **package.json** olarak yeniden adlandır
3. **.htaccess** 
4. **dist/** klasörü (tamamıyla)

### Sonuç Yapısı
```
public_html/
├── app.js
├── package.json
├── .htaccess
└── dist/
    ├── index.js
    └── public/
```

## cPanel Ayarları

**Node.js Selector:**
- Application Root: . (nokta)
- Startup File: app.js
- Version: 18.x
- URL: vizekit.com

**Environment Variables:**
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=vizekit2025
```

**Terminal:**
```bash
npm install
```

Bu kadar! Sadece 4 öğe yükleyip Node.js ayarlarını yapın.