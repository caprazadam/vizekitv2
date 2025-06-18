<?php
session_start();

// Country data
$countries = [
    ['name' => 'Amerika Birleşik Devletleri', 'code' => 'US', 'flag' => '🇺🇸'],
    ['name' => 'Almanya', 'code' => 'DE', 'flag' => '🇩🇪'],
    ['name' => 'Fransa', 'code' => 'FR', 'flag' => '🇫🇷'],
    ['name' => 'İngiltere', 'code' => 'GB', 'flag' => '🇬🇧'],
    ['name' => 'İtalya', 'code' => 'IT', 'flag' => '🇮🇹'],
    ['name' => 'İspanya', 'code' => 'ES', 'flag' => '🇪🇸'],
    ['name' => 'Kanada', 'code' => 'CA', 'flag' => '🇨🇦'],
    ['name' => 'Avustralya', 'code' => 'AU', 'flag' => '🇦🇺'],
    ['name' => 'Japonya', 'code' => 'JP', 'flag' => '🇯🇵'],
    ['name' => 'Güney Kore', 'code' => 'KR', 'flag' => '🇰🇷'],
    ['name' => 'Çin', 'code' => 'CN', 'flag' => '🇨🇳'],
    ['name' => 'Hindistan', 'code' => 'IN', 'flag' => '🇮🇳'],
    ['name' => 'Brezilya', 'code' => 'BR', 'flag' => '🇧🇷'],
    ['name' => 'Arjantin', 'code' => 'AR', 'flag' => '🇦🇷'],
    ['name' => 'Meksika', 'code' => 'MX', 'flag' => '🇲🇽'],
    ['name' => 'Rusya', 'code' => 'RU', 'flag' => '🇷🇺'],
    ['name' => 'Güney Afrika', 'code' => 'ZA', 'flag' => '🇿🇦'],
    ['name' => 'Mısır', 'code' => 'EG', 'flag' => '🇪🇬'],
    ['name' => 'İsrail', 'code' => 'IL', 'flag' => '🇮🇱'],
    ['name' => 'Malezya', 'code' => 'MY', 'flag' => '🇲🇾'],
    ['name' => 'Tayland', 'code' => 'TH', 'flag' => '🇹🇭'],
    ['name' => 'Singapur', 'code' => 'SG', 'flag' => '🇸🇬'],
    ['name' => 'Yeni Zelanda', 'code' => 'NZ', 'flag' => '🇳🇿'],
    ['name' => 'Hollanda', 'code' => 'NL', 'flag' => '🇳🇱'],
    ['name' => 'Belçika', 'code' => 'BE', 'flag' => '🇧🇪'],
    ['name' => 'İsviçre', 'code' => 'CH', 'flag' => '🇨🇭'],
    ['name' => 'Avusturya', 'code' => 'AT', 'flag' => '🇦🇹'],
    ['name' => 'Norveç', 'code' => 'NO', 'flag' => '🇳🇴'],
    ['name' => 'İsveç', 'code' => 'SE', 'flag' => '🇸🇪'],
    ['name' => 'Danimarka', 'code' => 'DK', 'flag' => '🇩🇰']
];

// Services data
$services = [
    [
        'name' => 'Vize Danışmanlığı',
        'description' => 'Herhangi bir ülke için vize başvuru sürecinde uzman danışmanlık hizmeti',
        'price' => '₺299',
        'duration' => '1 saat',
        'features' => ['Kişisel danışmanlık', 'Belge kontrolü', 'Form doldurucu desteği']
    ],
    [
        'name' => 'Hızlı Vize İşleme',
        'description' => 'Acil vize ihtiyaçlarınız için hızlandırılmış işlem süreci',
        'price' => '₺599',
        'duration' => '24-48 saat',
        'features' => ['Öncelikli işlem', '24/7 destek', 'Hızlı sonuçlandırma']
    ],
    [
        'name' => 'Belge Çeviri',
        'description' => 'Vize başvurusu için gerekli belgelerin profesyonel çevirisi',
        'price' => '₺150',
        'duration' => 'Sayfa başı',
        'features' => ['Yeminli çeviri', 'Apostil işlemi', 'Express teslimat']
    ],
    [
        'name' => 'Vize Formu Doldurma',
        'description' => 'Karmaşık vize formlarının uzmanlar tarafından doldurulması',
        'price' => '₺199',
        'duration' => '2-3 gün',
        'features' => ['Hatasız form', 'Kontrol edilen bilgiler', 'Revizyon dahil']
    ]
];

// Router
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Remove /v2 prefix if exists
$path = str_replace('/v2', '', $path);

// Handle different routes
switch ($path) {
    case '/':
        include 'pages/home.php';
        break;
    case '/visa-checker':
        include 'pages/visa-checker.php';
        break;
    case '/countries':
        include 'pages/countries.php';
        break;
    case '/services':
        include 'pages/services.php';
        break;
    case '/contact':
        include 'pages/contact.php';
        break;
    case '/admin-login':
        include 'pages/admin-login.php';
        break;
    case '/admin':
        include 'pages/admin.php';
        break;
    case '/application-status':
        include 'pages/application-status.php';
        break;
    case '/api/visa-check':
        include 'api/visa-check.php';
        break;
    case '/api/visa-application':
        include 'api/visa-application.php';
        break;
    default:
        include 'pages/404.php';
        break;
}
?>