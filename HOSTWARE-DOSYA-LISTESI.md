# VizeKit Hostware Deployment - Yüklenecek Dosyalar

## Gerekli Dosyalar

### 1. Ana Uygulama Dosyaları
```
vizekit/
├── app.js                    ← Entry point
├── package.json              ← hostware-package.json'dan kopyala
├── .htaccess                 ← Apache config
└── dist/                     ← Build edilmiş uygulama
    ├── index.js              ← Server
    └── public/               ← Frontend assets
        ├── index.html
        ├── assets/
        │   ├── index-*.css
        │   └── index-*.js
        └── favicon.ico
```

## Dosya Yükleme Sırası

### Adım 1: Klasör Oluşturma
- cPanel File Manager → public_html
- "vizekit" klasörü oluştur

### Adım 2: Dosya Upload
1. **app.js** yükle
2. **hostware-package.json** → **package.json** olarak yeniden adlandırarak yükle
3. **.htaccess** yükle
4. **dist** klasörünü tamamıyla yükle (içindeki tüm dosyalarla)

### Adım 3: Dosya İzinleri Kontrol
- app.js: 644
- package.json: 644
- dist/index.js: 644
- .htaccess: 644

## Environment Variables (Node.js Selector'da)

```
NODE_ENV=production
PORT=3000
SESSION_SECRET=7716486424-AAF8ctT1Mx_Ty46O-SvDAPXsGdEUsYFL-o
```

## Kritik Noktalar

⚠️ **DİKKAT:** 
- `hostware-package.json` dosyasını mutlaka `package.json` olarak yeniden adlandırın
- `dist` klasörü eksik olursa uygulama çalışmaz
- `app.js` Hostware'in Node.js entry point'i olarak gerekli

## Kontrol Listesi

- [ ] vizekit/ klasörü oluşturuldu
- [ ] app.js yüklendi
- [ ] package.json yüklendi (hostware-package.json'dan)
- [ ] .htaccess yüklendi
- [ ] dist/ klasörü tamamıyla yüklendi
- [ ] Node.js Selector'da Application Root: "vizekit" seçildi
- [ ] npm install çalıştırıldı
- [ ] Environment variables eklendi
- [ ] Uygulama başlatıldı

## Test URL

Kurulum sonrası test edin:
- https://vizekit.com:3000

## Sorun Giderme

**package.json hatası:** hostware-package.json'ı package.json olarak yeniden adlandırdığınızdan emin olun
**npm install hatası:** vizekit/ klasöründe olduğunuzdan emin olun
**Uygulama başlamıyor:** dist/index.js dosyasının var olduğunu kontrol edin