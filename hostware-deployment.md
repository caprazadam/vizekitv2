# VizeKit - Hostware.com.tr Deployment Guide

## Hostware Özellikleri
- Node.js desteği ✅
- MySQL database ✅  
- cPanel yönetim paneli
- SSL sertifikası dahil
- PHP ve HTML desteği

## Deployment Adımları

### 1. Dosya Yükleme (cPanel File Manager)
```
public_html/
├── dist/ (build edilen dosyalar)
├── server/
├── shared/
├── package.json
├── ecosystem.config.js
└── .env
```

### 2. Node.js Uygulama Kurulumu

**cPanel → Node.js Selector'dan:**
- Node.js Version: 18.x veya 20.x seçin
- Application Root: `public_html`
- Application URL: vizekit.com
- Application Startup File: `dist/index.js`

### 3. Environment Variables (.env)
```bash
NODE_ENV=production
PORT=3000

# MySQL Database (Hostware'den alacağınız bilgiler)
DATABASE_URL=mysql://kullanici:sifre@localhost:3306/veritabani_adi

# Session Secret
SESSION_SECRET=gizli-anahtar-buraya
```

### 4. MySQL Database Kurulumu

**cPanel → MySQL Databases:**
1. Yeni database oluşturun: `vizekit_db`
2. Database kullanıcısı oluşturun
3. Kullanıcıya tam yetki verin

### 5. Package Dependencies
```bash
# cPanel Terminal'den çalıştırın:
cd public_html
npm install --production
npm run build
```

### 6. Uygulama Başlatma
```bash
# Node.js App'i Restart edin
# cPanel → Node.js Selector → Restart
```

## MySQL Schema (İsteğe Bağlı)

Eğer persistent database istiyorsanız:

```sql
-- Kullanıcılar tablosu
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Başvurular tablosu (örnek)
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_number VARCHAR(50) UNIQUE,
  country VARCHAR(100),
  purpose VARCHAR(100),
  fee VARCHAR(20),
  personal_info JSON,
  passport_info JSON,
  status VARCHAR(50),
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Domain Ayarları

**Hostware Panel → Domain Management:**
- Ana domain: vizekit.com
- Subdomain: www.vizekit.com (redirect)
- SSL: Let's Encrypt otomatik

## Önemli Notlar

### Node.js Sınırlamaları
- Memory limit: Genellikle 512MB-1GB
- CPU usage limits var
- Process restart: cPanel'den manuel

### Dosya Yapısı
```
public_html/
├── dist/           # Build edilmiş files
├── node_modules/   # Dependencies
├── package.json
├── .env
└── ecosystem.config.js
```

### Monitoring
- cPanel → Metrics → Node.js logs
- Error logs: `/home/username/logs/`
- Process status: Node.js Selector

## Sorun Giderme

### Uygulama Çalışmıyorsa
1. cPanel → Node.js Selector → Check logs
2. Memory kullanımını kontrol edin
3. Dependencies eksik olabilir: `npm install`

### Database Bağlantı Sorunu
1. MySQL credentials'ları kontrol edin
2. Database permissions'ları kontrol edin
3. Connection string formatını kontrol edin

### Port Sorunu
- Hostware otomatik port atar
- Genellikle 3000 veya dynamic port

## Backup Stratejisi
1. cPanel → Backup → Full backup oluşturun
2. Database export: phpMyAdmin'den
3. Dosyalar: File Manager'dan zip

## Performans Optimizasyonu
- Static files için cPanel caching açın
- Cloudflare kullanın (ücretsiz plan)
- Image compression yapın
- CSS/JS minification (zaten build'de var)

## Güncelleme Süreci
1. Yeni dosyaları File Manager'dan yükleyin
2. `npm install` çalıştırın
3. `npm run build` çalıştırın
4. Node.js uygulamasını restart edin