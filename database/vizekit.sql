-- VizeKit Database Schema
-- MySQL Database Tables

-- Create database (run this first in cPanel MySQL)
-- CREATE DATABASE vizekit_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'operator') DEFAULT 'operator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(3) UNIQUE NOT NULL,
    flag VARCHAR(10) NOT NULL,
    region VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visa requirements table
CREATE TABLE IF NOT EXISTS visa_requirements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_country_id INT NOT NULL,
    to_country_id INT NOT NULL,
    purpose ENUM('tourism', 'business', 'education', 'medical', 'transit', 'family') NOT NULL,
    visa_required BOOLEAN DEFAULT TRUE,
    evisa_available BOOLEAN DEFAULT FALSE,
    visa_on_arrival BOOLEAN DEFAULT FALSE,
    fee VARCHAR(50),
    processing_time VARCHAR(50),
    documents TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (from_country_id) REFERENCES countries(id),
    FOREIGN KEY (to_country_id) REFERENCES countries(id),
    UNIQUE KEY unique_visa_req (from_country_id, to_country_id, purpose)
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price VARCHAR(20) NOT NULL,
    duration VARCHAR(50),
    features JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Visa applications table
CREATE TABLE IF NOT EXISTS visa_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    birth_date DATE,
    nationality VARCHAR(50),
    address TEXT,
    passport_number VARCHAR(20),
    passport_issue_date DATE,
    passport_expiry_date DATE,
    passport_image_path VARCHAR(255),
    country_id INT NOT NULL,
    purpose ENUM('tourism', 'business', 'education', 'medical', 'transit', 'family') NOT NULL,
    status ENUM('pending', 'processing', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    fee_amount DECIMAL(10,2),
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    notes TEXT,
    estimated_completion_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject ENUM('visa_info', 'application', 'services', 'payment', 'other') NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: vizekit2025)
INSERT IGNORE INTO users (username, password, email, role) VALUES 
('admin', '$2y$10$8K1p/a9Y.tCtFj2L6Z5cq.G5vDrL3P/4Y2v8eE5cNX9wB1jR6mS4u', 'admin@vizekit.com', 'admin');

-- Insert sample countries
INSERT IGNORE INTO countries (name, code, flag, region) VALUES 
('Türkiye', 'TR', '🇹🇷', 'Asia'),
('Amerika Birleşik Devletleri', 'US', '🇺🇸', 'North America'),
('Almanya', 'DE', '🇩🇪', 'Europe'),
('Fransa', 'FR', '🇫🇷', 'Europe'),
('İngiltere', 'GB', '🇬🇧', 'Europe'),
('İtalya', 'IT', '🇮🇹', 'Europe'),
('İspanya', 'ES', '🇪🇸', 'Europe'),
('Kanada', 'CA', '🇨🇦', 'North America'),
('Avustralya', 'AU', '🇦🇺', 'Oceania'),
('Japonya', 'JP', '🇯🇵', 'Asia'),
('Güney Kore', 'KR', '🇰🇷', 'Asia'),
('Çin', 'CN', '🇨🇳', 'Asia'),
('Hindistan', 'IN', '🇮🇳', 'Asia'),
('Brezilya', 'BR', '🇧🇷', 'South America'),
('Arjantin', 'AR', '🇦🇷', 'South America'),
('Meksika', 'MX', '🇲🇽', 'North America'),
('Rusya', 'RU', '🇷🇺', 'Europe'),
('Güney Afrika', 'ZA', '🇿🇦', 'Africa'),
('Mısır', 'EG', '🇪🇬', 'Africa'),
('İsrail', 'IL', '🇮🇱', 'Asia'),
('Malezya', 'MY', '🇲🇾', 'Asia'),
('Tayland', 'TH', '🇹🇭', 'Asia'),
('Singapur', 'SG', '🇸🇬', 'Asia'),
('Yeni Zelanda', 'NZ', '🇳🇿', 'Oceania'),
('Hollanda', 'NL', '🇳🇱', 'Europe'),
('Belçika', 'BE', '🇧🇪', 'Europe'),
('İsviçre', 'CH', '🇨🇭', 'Europe'),
('Avusturya', 'AT', '🇦🇹', 'Europe'),
('Norveç', 'NO', '🇳🇴', 'Europe'),
('İsveç', 'SE', '🇸🇪', 'Europe'),
('Danimarka', 'DK', '🇩🇰', 'Europe');

-- Insert sample services
INSERT IGNORE INTO services (name, description, price, duration, features) VALUES 
('Vize Danışmanlığı', 'Herhangi bir ülke için vize başvuru sürecinde uzman danışmanlık hizmeti', '₺299', '1 saat', '["Kişisel danışmanlık", "Belge kontrolü", "Form doldurucu desteği"]'),
('Hızlı Vize İşleme', 'Acil vize ihtiyaçlarınız için hızlandırılmış işlem süreci', '₺599', '24-48 saat', '["Öncelikli işlem", "24/7 destek", "Hızlı sonuçlandırma"]'),
('Belge Çeviri', 'Vize başvurusu için gerekli belgelerin profesyonel çevirisi', '₺150', 'Sayfa başı', '["Yeminli çeviri", "Apostil işlemi", "Express teslimat"]'),
('Vize Formu Doldurma', 'Karmaşık vize formlarının uzmanlar tarafından doldurulması', '₺199', '2-3 gün', '["Hatasız form", "Kontrol edilen bilgiler", "Revizyon dahil"]');

-- Insert sample visa requirements (Turkey to other countries)
INSERT IGNORE INTO visa_requirements (from_country_id, to_country_id, purpose, visa_required, evisa_available, visa_on_arrival, fee, processing_time, documents) VALUES 
(1, 2, 'tourism', TRUE, FALSE, FALSE, '$160', '10-15 gün', 'Pasaport, Fotoğraf, Mali belge, Seyahat sigortası'),
(1, 3, 'tourism', FALSE, FALSE, FALSE, 'Ücretsiz', 'Vizesiz giriş', 'Sadece geçerli pasaport'),
(1, 4, 'tourism', FALSE, FALSE, FALSE, 'Ücretsiz', 'Vizesiz giriş', 'Sadece geçerli pasaport'),
(1, 5, 'tourism', TRUE, FALSE, FALSE, '£95', '15-20 gün', 'Pasaport, Fotoğraf, Mali belge, Konuklama belgesi'),
(1, 12, 'tourism', TRUE, TRUE, FALSE, '$30', '3-5 gün', 'Pasaport, Fotoğraf, Online başvuru'),
(1, 13, 'tourism', TRUE, TRUE, FALSE, '$25', '2-4 gün', 'Pasaport, Fotoğraf, Online başvuru');

-- Insert sample applications
INSERT IGNORE INTO visa_applications (application_number, first_name, last_name, email, phone, country_id, purpose, status, fee_amount, created_at) VALUES 
('VK-2025-001', 'Ahmet', 'Yılmaz', 'ahmet@email.com', '+905551234567', 2, 'tourism', 'pending', 160.00, '2025-06-15 10:00:00'),
('VK-2025-002', 'Fatma', 'Kaya', 'fatma@email.com', '+905559876543', 3, 'business', 'approved', 0.00, '2025-06-14 14:30:00'),
('VK-2025-003', 'Mehmet', 'Demir', 'mehmet@email.com', '+905551111111', 5, 'education', 'rejected', 95.00, '2025-06-13 09:15:00'),
('VK-2025-004', 'Ayşe', 'Öztürk', 'ayse@email.com', '+905552222222', 4, 'tourism', 'processing', 0.00, '2025-06-12 16:45:00'),
('VK-2025-005', 'Can', 'Arslan', 'can@email.com', '+905553333333', 6, 'business', 'approved', 0.00, '2025-06-11 11:20:00');