# VizeKit - HTML5 + Bootstrap 5 + PHP Versiyonu

Türk vatandaşları için kapsamlı vize danışmanlığı platformu. Bu versiyon HTML5, Bootstrap 5 ve PHP ile geliştirilmiştir.

## Özellikler

- **Responsive Tasarım**: Bootstrap 5 ile mobil uyumlu
- **Vize Kontrol Sistemi**: 190+ ülke için vize gereksinimi kontrolü
- **Ülke Bilgileri**: Detaylı ülke ve vize bilgileri
- **Hizmet Kataloğu**: Kapsamlı vize hizmetleri
- **İletişim Formu**: Danışmanlık talep sistemi
- **Modern UI**: Gradient tasarım ve animasyonlar
- **SEO Optimizasyonu**: Arama motoru dostu

## Sistem Gereksinimleri

- PHP 7.4 veya üzeri
- MySQL 5.7 veya üzeri (opsiyonel)
- Apache/Nginx web sunucusu
- SSL sertifikası (production için önerilen)

## Kurulum

### 1. Dosyaları Yükleme

```bash
# Dosyaları web sunucunuzun root dizinine kopyalayın
cp -r html-version/* /var/www/html/
```

### 2. Veritabanı Kurulumu (Opsiyonel)

MySQL kullanmak istiyorsanız:

```sql
CREATE DATABASE vizekit;
USE vizekit;

-- Tablolar için SQL dosyasını çalıştırın
SOURCE database.sql;
```

### 3. Konfigürasyon

`includes/config.php` dosyasını düzenleyin:

```php
// Veritabanı ayarları
$host = 'localhost';
$dbname = 'vizekit';
$username = 'kullanici_adi';
$password = 'sifre';

// Site ayarları
define('SITE_NAME', 'VizeKit');
define('SITE_URL', 'https://yourdomain.com');
define('CONTACT_PHONE', '+908503466646');
define('CONTACT_EMAIL', 'info@vizekit.com');
```

### 4. Dosya İzinleri

```bash
# Apache için izinler
chown -R www-data:www-data /var/www/html/
chmod -R 755 /var/www/html/
```

## Dosya Yapısı

```
html-version/
├── index.php              # Ana sayfa
├── visa-checker.php       # Vize kontrol sayfası
├── countries.php          # Ülkeler listesi
├── services.php           # Hizmetler sayfası
├── contact.php            # İletişim sayfası
├── includes/
│   ├── config.php         # Veritabanı ve site ayarları
│   ├── functions.php      # PHP fonksiyonları
│   ├── navbar.php         # Navigasyon menüsü
│   └── footer.php         # Footer
├── assets/
│   ├── css/
│   │   └── style.css      # Özel CSS dosyası
│   ├── js/
│   │   └── script.js      # JavaScript fonksiyonları
│   └── img/               # Görsel dosyalar
└── README.md              # Bu dosya
```

## Özelleştirme

### CSS Değişiklikleri

`assets/css/style.css` dosyasında:

```css
:root {
    --purple-primary: #7c3aed;
    --purple-secondary: #8b5cf6;
    --gradient-purple: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
}
```

### PHP Fonksiyonları

`includes/functions.php` dosyasında veri fonksiyonlarını düzenleyebilirsiniz:

- `getCountries()`: Ülke verileri
- `getServices()`: Hizmet verileri
- `checkVisaRequirement()`: Vize kontrol mantığı

### JavaScript Özelleştirmesi

`assets/js/script.js` dosyasında:

- Form validasyonları
- AJAX istekleri
- UI animasyonları

## Veritabanı Kullanımı

Statik veri yerine MySQL kullanmak için:

1. `database.sql` dosyasını çalıştırın
2. `includes/functions.php` dosyasındaki fonksiyonları güncelleyin
3. PDO bağlantısını aktif hale getirin

## Apache Konfigürasyonu

`.htaccess` dosyası örneği:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Pretty URLs
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.php [NC,L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

## Nginx Konfigürasyonu

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/html;
    index index.php index.html;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        try_files $uri $uri/ $uri.php?$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## Güvenlik

### Form Güvenliği

- CSRF koruması için token kullanın
- XSS saldırılarına karşı `htmlspecialchars()` kullanın
- SQL injection için PDO prepared statements kullanın

### SSL Sertifikası

Production ortamında mutlaka SSL sertifikası kullanın:

```bash
# Let's Encrypt ile ücretsiz SSL
sudo certbot --apache -d yourdomain.com
```

## Performans Optimizasyonu

### CSS/JS Sıkıştırma

Production için dosyaları sıkıştırın:

```bash
# CSS minify
npm install -g clean-css-cli
cleancss -o assets/css/style.min.css assets/css/style.css

# JS minify
npm install -g uglify-js
uglifyjs assets/js/script.js -o assets/js/script.min.js
```

### Caching

Apache için browser caching:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## Bakım ve Güncelleme

### Log Takibi

PHP hata loglarını takip edin:

```bash
tail -f /var/log/apache2/error.log
```

### Backup

Düzenli yedekleme yapın:

```bash
# Dosya yedekleme
tar -czf vizekit-backup-$(date +%Y%m%d).tar.gz /var/www/html/

# Veritabanı yedekleme
mysqldump -u username -p vizekit > vizekit-backup-$(date +%Y%m%d).sql
```

## Destek

- Teknik destek için dosyaları inceleyin
- CSS/JS sorunları için browser developer tools kullanın
- PHP hataları için error log dosyalarını kontrol edin

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.