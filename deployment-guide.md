# VizeKit - Linux Hosting Deployment Guide

## Sistem Gereksinimleri

- Node.js 18+ 
- npm veya yarn
- Linux hosting (Ubuntu/CentOS/Debian)
- Domain adı (vizekit.com)

## Deployment Adımları

### 1. Dosyaları Sunucuya Yükleyin

```bash
# Proje dosyalarını sunucunuza yükleyin
# tüm dosyaları /var/www/vizekit/ klasörüne kopyalayın
```

### 2. Dependencies Kurun

```bash
cd /var/www/vizekit/
npm install
```

### 3. Production Build Oluşturun

```bash
npm run build
```

### 4. Environment Variables Ayarlayın

`.env` dosyası oluşturun:

```bash
NODE_ENV=production
PORT=3000
```

### 5. PM2 ile Uygulamayı Çalıştırın

```bash
# PM2 kurulumu
npm install -g pm2

# Uygulamayı başlatın
pm2 start "npm run start" --name "vizekit"

# Auto-restart ayarlayın
pm2 startup
pm2 save
```

### 6. Nginx Konfigürasyonu

`/etc/nginx/sites-available/vizekit.com` dosyası:

```nginx
server {
    listen 80;
    server_name vizekit.com www.vizekit.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx

# SSL sertifikası oluşturun
sudo certbot --nginx -d vizekit.com -d www.vizekit.com
```

### 8. Firewall Ayarları

```bash
# Port 80 ve 443'ü açın
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

## Monitoring ve Yönetim

### PM2 Komutları
```bash
pm2 status          # Durum kontrolü
pm2 restart vizekit  # Yeniden başlatma
pm2 logs vizekit     # Log görüntüleme
pm2 stop vizekit     # Durdurma
```

### Log Dosyaları
- Application logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`

## Güncelleme Süreci

```bash
# 1. Yeni dosyaları yükleyin
# 2. Dependencies güncelleyin
npm install

# 3. Yeniden build edin
npm run build

# 4. Uygulamayı yeniden başlatın
pm2 restart vizekit
```

## Backup Önerileri

- Uygulama dosyalarını düzenli yedekleyin
- Database backup'ları alın (eğer kullanıyorsanız)
- SSL sertifikalarını yedekleyin

## Sorun Giderme

### Uygulama Çalışmıyorsa
```bash
pm2 logs vizekit --lines 50
```

### Port Kontrolü
```bash
netstat -tlnp | grep :3000
```

### Nginx Test
```bash
sudo nginx -t
sudo systemctl reload nginx
```