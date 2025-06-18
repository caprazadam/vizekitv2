<?php
require_once 'config.php';

// Countries data
function getCountries() {
    return [
        ['id' => 1, 'name' => 'Arjantin', 'code' => 'AR', 'flag' => '🇦🇷', 'region' => 'Güney Amerika'],
        ['id' => 2, 'name' => 'Avustralya', 'code' => 'AU', 'flag' => '🇦🇺', 'region' => 'Okyanusya'],
        ['id' => 3, 'name' => 'Avusturya', 'code' => 'AT', 'flag' => '🇦🇹', 'region' => 'Avrupa'],
        ['id' => 4, 'name' => 'Belçika', 'code' => 'BE', 'flag' => '🇧🇪', 'region' => 'Avrupa'],
        ['id' => 5, 'name' => 'Brezilya', 'code' => 'BR', 'flag' => '🇧🇷', 'region' => 'Güney Amerika'],
        ['id' => 6, 'name' => 'Kanada', 'code' => 'CA', 'flag' => '🇨🇦', 'region' => 'Kuzey Amerika'],
        ['id' => 7, 'name' => 'Çin', 'code' => 'CN', 'flag' => '🇨🇳', 'region' => 'Asya'],
        ['id' => 8, 'name' => 'Danimarka', 'code' => 'DK', 'flag' => '🇩🇰', 'region' => 'Avrupa'],
        ['id' => 9, 'name' => 'Fransa', 'code' => 'FR', 'flag' => '🇫🇷', 'region' => 'Avrupa'],
        ['id' => 10, 'name' => 'Almanya', 'code' => 'DE', 'flag' => '🇩🇪', 'region' => 'Avrupa'],
        ['id' => 11, 'name' => 'Yunanistan', 'code' => 'GR', 'flag' => '🇬🇷', 'region' => 'Avrupa'],
        ['id' => 12, 'name' => 'Hindistan', 'code' => 'IN', 'flag' => '🇮🇳', 'region' => 'Asya'],
        ['id' => 13, 'name' => 'İtalya', 'code' => 'IT', 'flag' => '🇮🇹', 'region' => 'Avrupa'],
        ['id' => 14, 'name' => 'Japonya', 'code' => 'JP', 'flag' => '🇯🇵', 'region' => 'Asya'],
        ['id' => 15, 'name' => 'Hollanda', 'code' => 'NL', 'flag' => '🇳🇱', 'region' => 'Avrupa'],
        ['id' => 16, 'name' => 'Norveç', 'code' => 'NO', 'flag' => '🇳🇴', 'region' => 'Avrupa'],
        ['id' => 17, 'name' => 'İspanya', 'code' => 'ES', 'flag' => '🇪🇸', 'region' => 'Avrupa'],
        ['id' => 18, 'name' => 'İsveç', 'code' => 'SE', 'flag' => '🇸🇪', 'region' => 'Avrupa'],
        ['id' => 19, 'name' => 'İsviçre', 'code' => 'CH', 'flag' => '🇨🇭', 'region' => 'Avrupa'],
        ['id' => 20, 'name' => 'İngiltere', 'code' => 'GB', 'flag' => '🇬🇧', 'region' => 'Avrupa'],
        ['id' => 21, 'name' => 'Amerika Birleşik Devletleri', 'code' => 'US', 'flag' => '🇺🇸', 'region' => 'Kuzey Amerika'],
        ['id' => 22, 'name' => 'Rusya', 'code' => 'RU', 'flag' => '🇷🇺', 'region' => 'Avrupa/Asya']
    ];
}

// Services data
function getServices() {
    return [
        [
            'id' => 1,
            'name' => 'Vize Danışmanlığı',
            'description' => 'Herhangi bir destinasyon için vize gereksinimleri, başvuru süreci ve belge hazırlığı konusunda uzman rehberliği.',
            'features' => '["Ücretsiz ilk danışmanlık","Belge inceleme","Başvuru stratejisi"]',
            'icon' => 'user-tie'
        ],
        [
            'id' => 2,
            'name' => 'Belge Hazırlığı',
            'description' => 'Vize başvurunuz için gerekli tüm belgelerin hazırlanmasında profesyonel yardım.',
            'features' => '["Belge kontrol listesi","Form doldurma","Kalite incelemesi"]',
            'icon' => 'file-alt'
        ],
        [
            'id' => 3,
            'name' => 'Başvuru Sunumu',
            'description' => 'Elçilik ve konsolosluklara tüm başvuru sürecini sizin adınıza yönetiyoruz.',
            'features' => '["Elçilik sunumu","Durum takibi","Güvenli işlem"]',
            'icon' => 'paper-plane'
        ],
        [
            'id' => 4,
            'name' => 'Hızlı İşlem',
            'description' => 'Acil seyahat gereksinimleri için öncelikli işlem ile hızlandırılmış vize hizmetleri.',
            'features' => '["24-48 saat işlem","Öncelikli başvuru","Özel destek"]',
            'icon' => 'rocket'
        ],
        [
            'id' => 5,
            'name' => 'Seyahat Sigortası',
            'description' => 'Birçok vize başvurusu için gerekli olan kapsamlı seyahat sigortası kapsamı.',
            'features' => '["Vize uyumlu poliçeler","Anında sertifikalar","Dünya çapında kapsam"]',
            'icon' => 'shield-alt'
        ],
        [
            'id' => 6,
            'name' => '7/24 Destek',
            'description' => 'Vize ile ilgili tüm soru ve endişeleriniz için 24 saat müşteri desteği.',
            'features' => '["Canlı sohbet desteği","Telefon yardımı","E-posta desteği"]',
            'icon' => 'headset'
        ]
    ];
}

// Get country by code
function getCountryByCode($code) {
    $countries = getCountries();
    foreach($countries as $country) {
        if($country['code'] === $code) {
            return $country;
        }
    }
    return null;
}

// Check visa requirement
function checkVisaRequirement($fromCountry, $toCountry, $purpose) {
    // Simplified visa requirement logic
    $visaFreeCountries = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'DK', 'SE', 'NO'];
    $eVisaCountries = ['US', 'AU', 'IN', 'CN'];
    $visaOnArrivalCountries = ['JP'];
    
    $result = [
        'fromCountry' => getCountryByCode($fromCountry),
        'toCountry' => getCountryByCode($toCountry),
        'purpose' => $purpose,
        'visaRequired' => true,
        'eVisaAvailable' => false,
        'visaOnArrival' => false,
        'processingTime' => '5-10 iş günü',
        'fee' => '80-150 EUR',
        'documents' => [
            'Geçerli pasaport',
            'Başvuru formu',
            'Fotoğraf',
            'Seyahat sigortası',
            'Konaklama belgesi',
            'Uçak bileti'
        ]
    ];
    
    if(in_array($toCountry, $visaFreeCountries)) {
        $result['visaRequired'] = false;
        $result['processingTime'] = 'Vize gerekmez';
        $result['fee'] = 'Ücretsiz';
        $result['customMessage'] = 'Türk vatandaşları 90 gün boyunca vizesiz seyahat edebilir.';
    } elseif(in_array($toCountry, $eVisaCountries)) {
        $result['eVisaAvailable'] = true;
        $result['processingTime'] = '3-5 iş günü';
        $result['fee'] = '50-100 USD';
    } elseif(in_array($toCountry, $visaOnArrivalCountries)) {
        $result['visaOnArrival'] = true;
        $result['processingTime'] = 'Varışta';
        $result['fee'] = '30-50 USD';
    }
    
    return $result;
}

// Get service icon mapping
function getServiceIcon($icon) {
    $iconMap = [
        'user-tie' => 'user-tie',
        'file-alt' => 'file-alt',
        'paper-plane' => 'paper-plane',
        'rocket' => 'rocket',
        'shield-alt' => 'shield-alt',
        'headset' => 'headset'
    ];
    
    return $iconMap[$icon] ?? 'cog';
}

// Handle form submissions
function handleFormSubmission() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'] ?? '';
        
        switch($action) {
            case 'visa_check':
                $result = checkVisaRequirement($_POST['fromCountry'], $_POST['toCountry'], $_POST['purpose']);
                header('Content-Type: application/json');
                echo json_encode($result);
                exit;
                
            case 'consultation':
                // Handle consultation form
                $data = [
                    'firstName' => $_POST['firstName'] ?? '',
                    'lastName' => $_POST['lastName'] ?? '',
                    'email' => $_POST['email'] ?? '',
                    'phone' => $_POST['phone'] ?? '',
                    'destinationCountry' => $_POST['destinationCountry'] ?? '',
                    'message' => $_POST['message'] ?? '',
                    'created_at' => date('Y-m-d H:i:s')
                ];
                
                // Here you would save to database
                // For now, just return success
                header('Content-Type: application/json');
                echo json_encode(['success' => true, 'message' => 'Danışmanlık talebiniz alındı. En kısa sürede dönüş yapacağız.']);
                exit;
        }
    }
}

// Call form handler
handleFormSubmission();
?>