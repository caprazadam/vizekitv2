# cPanel NPM Install Butonu Aktif Değil - Çözüm

## Sorun
"Run NPM Install" butonu gri/inaktif görünüyor çünkü package.json dosyası public_html/v2/ klasöründe bulunamıyor.

## Çözüm

### Adım 1: package.json Dosyasını Kontrol Edin
cPanel File Manager → public_html/v2/ klasöründe şu dosyalar olmalı:
- package.json
- app.js  
- .htaccess
- dist/ klasörü

### Adım 2: package.json Yükleyin
Eğer package.json yoksa:
1. package-for-ftp.json dosyasını indirin
2. FTP veya cPanel File Manager ile public_html/v2/ klasörüne yükleyin
3. Dosya adını package.json olarak değiştirin

### Adım 3: Dosya İçeriğini Kontrol Edin
package.json içeriği:
```json
{
  "name": "vizekit",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "dependencies": {
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "memorystore": "^1.6.7"
  }
}
```

### Adım 4: Node.js Sayfasını Yenileyin
1. Tarayıcıda sayfayı yenileyin (F5)
2. Node.js Selector sayfasını tekrar açın
3. "Run NPM Install" butonu artık aktif olmalı

### Adım 5: Alternatif Terminal Yöntemi
cPanel Terminal'den:
```bash
cd public_html/v2
npm install
```

Bu komut package.json'daki dependencies kurar.

## Final Kontrol

public_html/v2/ klasöründe şu yapı olmalı:
```
v2/
├── package.json
├── app.js
├── .htaccess
├── node_modules/ (npm install sonrası)
└── dist/
    ├── index.js
    └── public/
```

npm install tamamlandığında Node.js uygulaması başlatılabilir.