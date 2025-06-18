-- VizeKit Database Schema
-- MySQL database structure for the visa platform

CREATE DATABASE IF NOT EXISTS vizekit;
USE vizekit;

-- Countries table
CREATE TABLE countries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(3) NOT NULL UNIQUE,
    flag VARCHAR(10) NOT NULL,
    region VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    features JSON,
    icon VARCHAR(50),
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visa requirements table
CREATE TABLE visa_requirements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    from_country_id INT,
    to_country_id INT,
    purpose VARCHAR(50),
    visa_required BOOLEAN DEFAULT TRUE,
    e_visa_available BOOLEAN DEFAULT FALSE,
    visa_on_arrival BOOLEAN DEFAULT FALSE,
    processing_time VARCHAR(100),
    fee VARCHAR(50),
    documents JSON,
    custom_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_country_id) REFERENCES countries(id),
    FOREIGN KEY (to_country_id) REFERENCES countries(id)
);

-- Consultations table
CREATE TABLE consultations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    destination_country VARCHAR(3),
    service VARCHAR(200),
    message TEXT,
    status ENUM('pending', 'contacted', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications table (for visa applications)
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    application_number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    purpose VARCHAR(50) NOT NULL,
    fee VARCHAR(50) NOT NULL,
    personal_info JSON NOT NULL,
    passport_info JSON NOT NULL,
    payment_method VARCHAR(50),
    status ENUM('payment_received', 'reviewing', 'approved', 'rejected') DEFAULT 'payment_received',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_processing_date DATE,
    notes TEXT
);

-- Insert sample countries data
INSERT INTO countries (name, code, flag, region) VALUES
('Arjantin', 'AR', '🇦🇷', 'Güney Amerika'),
('Avustralya', 'AU', '🇦🇺', 'Okyanusya'),
('Avusturya', 'AT', '🇦🇹', 'Avrupa'),
('Belçika', 'BE', '🇧🇪', 'Avrupa'),
('Brezilya', 'BR', '🇧🇷', 'Güney Amerika'),
('Kanada', 'CA', '🇨🇦', 'Kuzey Amerika'),
('Çin', 'CN', '🇨🇳', 'Asya'),
('Danimarka', 'DK', '🇩🇰', 'Avrupa'),
('Fransa', 'FR', '🇫🇷', 'Avrupa'),
('Almanya', 'DE', '🇩🇪', 'Avrupa'),
('Yunanistan', 'GR', '🇬🇷', 'Avrupa'),
('Hindistan', 'IN', '🇮🇳', 'Asya'),
('İtalya', 'IT', '🇮🇹', 'Avrupa'),
('Japonya', 'JP', '🇯🇵', 'Asya'),
('Hollanda', 'NL', '🇳🇱', 'Avrupa'),
('Norveç', 'NO', '🇳🇴', 'Avrupa'),
('İspanya', 'ES', '🇪🇸', 'Avrupa'),
('İsveç', 'SE', '🇸🇪', 'Avrupa'),
('İsviçre', 'CH', '🇨🇭', 'Avrupa'),
('İngiltere', 'GB', '🇬🇧', 'Avrupa'),
('Amerika Birleşik Devletleri', 'US', '🇺🇸', 'Kuzey Amerika'),
('Rusya', 'RU', '🇷🇺', 'Avrupa/Asya');

-- Insert sample services data
INSERT INTO services (name, description, features, icon, price) VALUES
('Vize Danışmanlığı', 'Herhangi bir destinasyon için vize gereksinimleri, başvuru süreci ve belge hazırlığı konusunda uzman rehberliği.', '["Ücretsiz ilk danışmanlık","Belge inceleme","Başvuru stratejisi"]', 'user-tie', NULL),
('Belge Hazırlığı', 'Vize başvurunuz için gerekli tüm belgelerin hazırlanmasında profesyonel yardım.', '["Belge kontrol listesi","Form doldurma","Kalite incelemesi"]', 'file-alt', NULL),
('Başvuru Sunumu', 'Elçilik ve konsolosluklara tüm başvuru sürecini sizin adınıza yönetiyoruz.', '["Elçilik sunumu","Durum takibi","Güvenli işlem"]', 'paper-plane', NULL),
('Hızlı İşlem', 'Acil seyahat gereksinimleri için öncelikli işlem ile hızlandırılmış vize hizmetleri.', '["24-48 saat işlem","Öncelikli başvuru","Özel destek"]', 'rocket', NULL),
('Seyahat Sigortası', 'Birçok vize başvurusu için gerekli olan kapsamlı seyahat sigortası kapsamı.', '["Vize uyumlu poliçeler","Anında sertifikalar","Dünya çapında kapsam"]', 'shield-alt', NULL),
('7/24 Destek', 'Vize ile ilgili tüm soru ve endişeleriniz için 24 saat müşteri desteği.', '["Canlı sohbet desteği","Telefon yardımı","E-posta desteği"]', 'headset', NULL);

-- Insert sample visa requirements (for demo purposes)
INSERT INTO visa_requirements (from_country_id, to_country_id, purpose, visa_required, e_visa_available, visa_on_arrival, processing_time, fee, documents, custom_message) 
SELECT 
    tr.id as from_country_id,
    de.id as to_country_id,
    'turizm' as purpose,
    FALSE as visa_required,
    FALSE as e_visa_available,
    FALSE as visa_on_arrival,
    'Vize gerekmez' as processing_time,
    'Ücretsiz' as fee,
    '["Geçerli pasaport","Geri dönüş bileti"]' as documents,
    'Türk vatandaşları 90 gün boyunca vizesiz seyahat edebilir.' as custom_message
FROM countries tr, countries de 
WHERE tr.code = 'TR' AND de.code = 'DE';

INSERT INTO visa_requirements (from_country_id, to_country_id, purpose, visa_required, e_visa_available, visa_on_arrival, processing_time, fee, documents) 
SELECT 
    tr.id as from_country_id,
    us.id as to_country_id,
    'turizm' as purpose,
    TRUE as visa_required,
    TRUE as e_visa_available,
    FALSE as visa_on_arrival,
    '3-5 iş günü' as processing_time,
    '50-100 USD' as fee,
    '["Geçerli pasaport","Başvuru formu","Fotoğraf","Seyahat sigortası"]' as documents
FROM countries tr, countries us 
WHERE tr.code = 'TR' AND us.code = 'US';

-- Create indexes for better performance
CREATE INDEX idx_countries_code ON countries(code);
CREATE INDEX idx_visa_req_countries ON visa_requirements(from_country_id, to_country_id);
CREATE INDEX idx_consultations_email ON consultations(email);
CREATE INDEX idx_applications_number ON applications(application_number);
CREATE INDEX idx_applications_status ON applications(status);

-- Create views for easier data access
CREATE VIEW visa_check_view AS
SELECT 
    vr.id,
    fc.name as from_country_name,
    fc.code as from_country_code,
    fc.flag as from_country_flag,
    tc.name as to_country_name,
    tc.code as to_country_code,
    tc.flag as to_country_flag,
    vr.purpose,
    vr.visa_required,
    vr.e_visa_available,
    vr.visa_on_arrival,
    vr.processing_time,
    vr.fee,
    vr.documents,
    vr.custom_message
FROM visa_requirements vr
JOIN countries fc ON vr.from_country_id = fc.id
JOIN countries tc ON vr.to_country_id = tc.id;

-- Stored procedure for visa checking
DELIMITER //

CREATE PROCEDURE CheckVisaRequirement(
    IN from_code VARCHAR(3),
    IN to_code VARCHAR(3),
    IN travel_purpose VARCHAR(50)
)
BEGIN
    SELECT 
        fc.name as from_country_name,
        fc.code as from_country_code,
        fc.flag as from_country_flag,
        tc.name as to_country_name,
        tc.code as to_country_code,
        tc.flag as to_country_flag,
        travel_purpose as purpose,
        COALESCE(vr.visa_required, TRUE) as visa_required,
        COALESCE(vr.e_visa_available, FALSE) as e_visa_available,
        COALESCE(vr.visa_on_arrival, FALSE) as visa_on_arrival,
        COALESCE(vr.processing_time, '5-10 iş günü') as processing_time,
        COALESCE(vr.fee, '80-150 EUR') as fee,
        COALESCE(vr.documents, '["Geçerli pasaport","Başvuru formu","Fotoğraf","Seyahat sigortası","Konaklama belgesi","Uçak bileti"]') as documents,
        vr.custom_message
    FROM countries fc
    CROSS JOIN countries tc
    LEFT JOIN visa_requirements vr ON (
        vr.from_country_id = fc.id 
        AND vr.to_country_id = tc.id 
        AND (vr.purpose = travel_purpose OR vr.purpose IS NULL)
    )
    WHERE fc.code = from_code AND tc.code = to_code
    LIMIT 1;
END //

DELIMITER ;

-- Function to generate application numbers
DELIMITER //

CREATE FUNCTION GenerateApplicationNumber() 
RETURNS VARCHAR(20)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE app_count INT;
    DECLARE app_number VARCHAR(20);
    
    SELECT COUNT(*) INTO app_count FROM applications;
    SET app_number = CONCAT('VK', YEAR(NOW()), LPAD(app_count + 1, 6, '0'));
    
    RETURN app_number;
END //

DELIMITER ;

-- Trigger to auto-generate application numbers
DELIMITER //

CREATE TRIGGER before_application_insert 
BEFORE INSERT ON applications
FOR EACH ROW
BEGIN
    IF NEW.application_number IS NULL OR NEW.application_number = '' THEN
        SET NEW.application_number = GenerateApplicationNumber();
    END IF;
    
    IF NEW.estimated_processing_date IS NULL THEN
        SET NEW.estimated_processing_date = DATE_ADD(CURDATE(), INTERVAL 10 DAY);
    END IF;
END //

DELIMITER ;

-- Create admin user table (optional)
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('admin', 'operator') DEFAULT 'operator',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password_hash, email, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@vizekit.com', 'admin');

-- Grant permissions (adjust as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON vizekit.* TO 'vizekit_user'@'localhost' IDENTIFIED BY 'secure_password';
-- FLUSH PRIVILEGES;