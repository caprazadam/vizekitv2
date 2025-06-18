# VizeKit Database Setup

## Hostware cPanel MySQL Kurulumu

### 1. Database Oluşturma
cPanel → MySQL Databases:
- Database Name: `vizekit_db`
- Create Database

### 2. User Oluşturma
- Username: `vizekit_user`
- Password: (güçlü şifre)
- Create User

### 3. User'ı Database'e Bağlama
- Add User to Database
- All Privileges seç

### 4. Tabloları Import Etme
cPanel → phpMyAdmin:
- vizekit_db seç
- Import → Choose File
- vizekit.sql yükle
- Go

### 5. Config Güncelleme
config/env.php dosyasını güncelleyin:
```php
'DB_HOST' => 'localhost',
'DB_NAME' => 'cpanel_username_vizekit_db',
'DB_USER' => 'cpanel_username_vizekit_user',
'DB_PASS' => 'your_password',
```

## Tablo Yapısı
- users: Admin kullanıcıları
- countries: Ülke bilgileri
- visa_requirements: Vize gereksinimleri
- services: Hizmet bilgileri
- visa_applications: Vize başvuruları
- consultations: İletişim mesajları

## Default Admin
- Username: admin
- Password: vizekit2025