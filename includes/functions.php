<?php
// VizeKit Helper Functions

/**
 * Get country data from database
 */
function getCountries($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM countries ORDER BY name");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        error_log("Error fetching countries: " . $e->getMessage());
        return [];
    }
}

/**
 * Get visa requirements for specific country pair
 */
function getVisaRequirement($pdo, $from_country_id, $to_country_id, $purpose = 'tourism') {
    try {
        $stmt = $pdo->prepare("
            SELECT vr.*, c.name as country_name, c.flag 
            FROM visa_requirements vr 
            JOIN countries c ON c.id = vr.to_country_id 
            WHERE vr.from_country_id = ? AND vr.to_country_id = ? AND vr.purpose = ?
        ");
        $stmt->execute([$from_country_id, $to_country_id, $purpose]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        error_log("Error fetching visa requirement: " . $e->getMessage());
        return null;
    }
}

/**
 * Get all services
 */
function getServices($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM services WHERE active = 1 ORDER BY name");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        error_log("Error fetching services: " . $e->getMessage());
        return [];
    }
}

/**
 * Create new visa application
 */
function createVisaApplication($pdo, $data) {
    try {
        $application_number = 'VK-' . date('Y') . '-' . str_pad(rand(1, 9999), 3, '0', STR_PAD_LEFT);
        
        $stmt = $pdo->prepare("
            INSERT INTO visa_applications 
            (application_number, first_name, last_name, email, phone, birth_date, 
             nationality, address, passport_number, passport_issue_date, passport_expiry_date, 
             country_id, purpose, fee_amount, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        
        $result = $stmt->execute([
            $application_number,
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $data['phone'],
            $data['birth_date'],
            $data['nationality'],
            $data['address'],
            $data['passport_number'],
            $data['passport_issue_date'],
            $data['passport_expiry_date'],
            $data['country_id'],
            $data['purpose'],
            $data['fee_amount']
        ]);
        
        return $result ? $application_number : false;
    } catch(PDOException $e) {
        error_log("Error creating visa application: " . $e->getMessage());
        return false;
    }
}

/**
 * Get visa application by number
 */
function getVisaApplication($pdo, $application_number) {
    try {
        $stmt = $pdo->prepare("
            SELECT va.*, c.name as country_name, c.flag 
            FROM visa_applications va 
            JOIN countries c ON c.id = va.country_id 
            WHERE va.application_number = ?
        ");
        $stmt->execute([$application_number]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        error_log("Error fetching visa application: " . $e->getMessage());
        return null;
    }
}

/**
 * Create consultation request
 */
function createConsultation($pdo, $data) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO consultations 
            (first_name, last_name, email, phone, subject, message, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");
        
        return $stmt->execute([
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $data['phone'],
            $data['subject'],
            $data['message']
        ]);
    } catch(PDOException $e) {
        error_log("Error creating consultation: " . $e->getMessage());
        return false;
    }
}

/**
 * Authenticate admin user
 */
function authenticateAdmin($pdo, $username, $password) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND role = 'admin'");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        return false;
    } catch(PDOException $e) {
        error_log("Error authenticating admin: " . $e->getMessage());
        return false;
    }
}

/**
 * Get admin statistics
 */
function getAdminStats($pdo) {
    try {
        $stats = [];
        
        // Total applications
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM visa_applications");
        $stats['total_applications'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Pending applications
        $stmt = $pdo->query("SELECT COUNT(*) as pending FROM visa_applications WHERE status = 'pending'");
        $stats['pending_applications'] = $stmt->fetch(PDO::FETCH_ASSOC)['pending'];
        
        // Total consultations
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM consultations");
        $stats['total_consultations'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // New consultations
        $stmt = $pdo->query("SELECT COUNT(*) as new FROM consultations WHERE status = 'new'");
        $stats['new_consultations'] = $stmt->fetch(PDO::FETCH_ASSOC)['new'];
        
        return $stats;
    } catch(PDOException $e) {
        error_log("Error fetching admin stats: " . $e->getMessage());
        return [
            'total_applications' => 0,
            'pending_applications' => 0,
            'total_consultations' => 0,
            'new_consultations' => 0
        ];
    }
}

/**
 * Handle file upload
 */
function handleFileUpload($file, $allowed_types = ['jpg', 'jpeg', 'png', 'pdf'], $max_size = 5242880) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'message' => 'Dosya yükleme hatası.'];
    }
    
    if ($file['size'] > $max_size) {
        return ['success' => false, 'message' => 'Dosya boyutu çok büyük (max 5MB).'];
    }
    
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($file_extension, $allowed_types)) {
        return ['success' => false, 'message' => 'İzin verilmeyen dosya türü.'];
    }
    
    $upload_dir = 'uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    $filename = uniqid() . '.' . $file_extension;
    $upload_path = $upload_dir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $upload_path)) {
        return ['success' => true, 'filename' => $filename, 'path' => $upload_path];
    }
    
    return ['success' => false, 'message' => 'Dosya kaydedilemedi.'];
}

/**
 * Format Turkish date
 */
function formatTurkishDate($date) {
    $months = [
        '01' => 'Ocak', '02' => 'Şubat', '03' => 'Mart', '04' => 'Nisan',
        '05' => 'Mayıs', '06' => 'Haziran', '07' => 'Temmuz', '08' => 'Ağustos',
        '09' => 'Eylül', '10' => 'Ekim', '11' => 'Kasım', '12' => 'Aralık'
    ];
    
    $timestamp = strtotime($date);
    $day = date('d', $timestamp);
    $month = $months[date('m', $timestamp)];
    $year = date('Y', $timestamp);
    
    return $day . ' ' . $month . ' ' . $year;
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Generate CSRF token
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>