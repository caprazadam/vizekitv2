<?php
// VizeKit Environment Configuration
// Update these values for your Hostware hosting environment

return [
    // Database Configuration
    'DB_HOST' => 'localhost',
    'DB_NAME' => 'vizekit_db',
    'DB_USER' => 'root',
    'DB_PASS' => '',
    
    // For Hostware hosting, update these values:
    // 'DB_HOST' => 'localhost',
    // 'DB_NAME' => 'your_cpanel_database_name',
    // 'DB_USER' => 'your_cpanel_database_user',
    // 'DB_PASS' => 'your_cpanel_database_password',
    
    // Site Configuration
    'SITE_NAME' => 'VizeKit',
    'SITE_URL' => 'https://vizekit.com',
    'CONTACT_EMAIL' => 'info@vizekit.com',
    'CONTACT_PHONE' => '+908503466646',
    'CONTACT_ADDRESS' => 'Sakarya Mah. 57015. SK. No: 25, Kahramanmaraş',
    'WHATSAPP_NUMBER' => '+908503466646',
    
    // Admin Configuration
    'ADMIN_USERNAME' => 'admin',
    'ADMIN_PASSWORD_HASH' => '$2y$10$8K1p/a9Y.tCtFj2L6Z5cq.G5vDrL3P/4Y2v8eE5cNX9wB1jR6mS4u', // vizekit2025
    
    // File Upload Configuration
    'UPLOAD_MAX_SIZE' => 5242880, // 5MB
    'UPLOAD_ALLOWED_TYPES' => ['jpg', 'jpeg', 'png', 'pdf'],
    'UPLOAD_PATH' => 'uploads/',
    
    // Email Configuration (for contact forms)
    'SMTP_HOST' => 'smtp.gmail.com',
    'SMTP_PORT' => 587,
    'SMTP_USERNAME' => '',
    'SMTP_PASSWORD' => '',
    'SMTP_FROM_EMAIL' => 'info@vizekit.com',
    'SMTP_FROM_NAME' => 'VizeKit',
];
?>