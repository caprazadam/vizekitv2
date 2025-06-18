# cPanel File Manager ile package.json Çözümü

## SSH Erişimi Olmadan Çözüm

### Adım 1: File Manager ile package.json Düzenleme
1. **cPanel → File Manager**
2. **public_html/v2/** klasörüne git
3. **package.json** dosyasına sağ tık → **Edit**
4. İçeriği tamamen sil ve şunu yapıştır:

```json
{
  "name": "vizekit",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "memorystore": "^1.6.7"
  }
}
```

5. **Save Changes** tıkla

### Adım 2: Dosya İzinlerini Kontrol Et
1. package.json dosyasına sağ tık → **Permissions**
2. **644** olarak ayarla
3. **Change Permissions** tıkla

### Adım 3: Node.js Sayfasını Yenile
1. Node.js Selector sayfasını kapat
2. Tekrar aç: **cPanel → Software → Node.js Selector**
3. **VIZEKIT.COM/** uygulamasını seç
4. "Run NPM Install" butonu artık aktif olmalı

### Adım 4: Alternative - Manual Dependencies
Eğer hala çalışmazsa, cPanel'de **Terminal** var mı kontrol et:
- cPanel → **Advanced → Terminal**

Terminal varsa:
```bash
cd public_html/v2
npm install
```

### Adım 5: Environment Variables
npm install başarılı olduktan sonra:
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=vizekit2025secret
```

Bu adımlarla package.json sorunu çözülür ve uygulama başlar.