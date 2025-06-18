# SSH Olmadan cPanel package.json Çözümü

## File Manager ile Düzenleme

### 1. package.json Yeniden Oluştur
**cPanel → File Manager → public_html/v2/**
- package.json dosyasını sil
- **+ File** → "package.json" oluştur
- Edit ile aç, şu içeriği yapıştır:

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

### 2. Terminal Alternatifi Kontrol Et
cPanel'de **Terminal** bölümü var mı bakın:
- **cPanel → Advanced → Terminal**

Varsa npm install çalıştırabilirsiniz.

### 3. Manual Dependency Upload
Terminal yoksa dependencies'i manuel yükleyebiliriz:
1. Lokal bilgisayarda npm install express
2. node_modules klasörünü zip'le  
3. cPanel'e yükle

### 4. Direct Node.js Start
Environment variables ekleyip uygulamayı başlatmayı deneyin:
```
NODE_ENV=production
PORT=3000
SESSION_SECRET=vizekit2025
```

cPanel'de Terminal bölümü var mı kontrol eder misiniz?