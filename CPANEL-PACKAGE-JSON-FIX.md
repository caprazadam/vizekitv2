# cPanel package.json Tanıma Sorunu - Çözüm

## Durum
- package.json dosyası mevcut: https://vizekit.com/v2/package.json
- Ancak cPanel Node.js Selector onu görmüyor
- "Run NPM Install" butonu inaktif

## Olası Nedenler ve Çözümler

### 1. Dosya İzinleri
```bash
cd public_html/v2
chmod 644 package.json
```

### 2. Dosya Formatı (Windows/Unix)
```bash
cd public_html/v2
dos2unix package.json
```

### 3. Dosyayı Yeniden Oluşturma
```bash
cd public_html/v2
rm package.json
nano package.json
```

İçerik:
```json
{
  "name": "vizekit",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "memorystore": "^1.6.7"
  }
}
```

### 4. Direct NPM Install
cPanel package.json tanımasa bile terminalde çalışır:
```bash
cd public_html/v2
npm install
```

### 5. Node.js Cache Temizleme
```bash
cd public_html/v2
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 6. Manual Dependencies
```bash
cd public_html/v2
npm install express@^4.21.2 express-session@^1.18.1 memorystore@^1.6.7
```

## Test
npm install sonrası:
```bash
ls -la public_html/v2/
```

node_modules klasörü oluşmuş olmalı.

En pratik çözüm terminal üzerinden `npm install` komutunu çalıştırmak.