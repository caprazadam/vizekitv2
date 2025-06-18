<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ülkeler - VizeKit</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-hover:hover { transform: translateY(-2px); transition: all 0.3s ease; }
    </style>
</head>
<body class="bg-gray-50">
    
    <!-- Navigation -->
    <nav class="gradient-bg shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20">
                <div class="flex items-center">
                    <a href="/"><h1 class="text-2xl font-bold text-white">VizeKit</h1></a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-white hover:text-purple-200 transition">Ana Sayfa</a>
                    <a href="/visa-checker" class="text-white hover:text-purple-200 transition">Vize Kontrol</a>
                    <a href="/countries" class="text-purple-200 font-semibold">Ülkeler</a>
                    <a href="/services" class="text-white hover:text-purple-200 transition">Hizmetler</a>
                    <a href="/contact" class="text-white hover:text-purple-200 transition">İletişim</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Ülkeler ve Vize Bilgileri</h1>
            <p class="text-gray-600">Türk vatandaşları için güncel vize gereksinimleri</p>
        </div>

        <!-- Search -->
        <div class="mb-8">
            <input type="text" id="countrySearch" placeholder="Ülke ara..." 
                   class="w-full max-w-md mx-auto block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
        </div>

        <!-- Countries Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="countriesGrid">
            <?php foreach($countries as $country): ?>
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover country-card" data-name="<?= strtolower($country['name']) ?>">
                <div class="flex items-center mb-4">
                    <div class="text-4xl mr-4"><?= $country['flag'] ?></div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900"><?= $country['name'] ?></h3>
                        <p class="text-gray-500 text-sm"><?= $country['code'] ?></p>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <?php
                    // Sample visa requirements (in real app, this would come from database)
                    $visaStatus = '';
                    $badgeColor = '';
                    $fee = '';
                    $processing = '';
                    
                    switch($country['code']) {
                        case 'US':
                            $visaStatus = 'Vize Gerekli';
                            $badgeColor = 'bg-red-100 text-red-800';
                            $fee = '$160';
                            $processing = '10-15 gün';
                            break;
                        case 'DE':
                        case 'FR':
                        case 'IT':
                        case 'ES':
                        case 'NL':
                        case 'BE':
                        case 'AT':
                            $visaStatus = 'Vize Gerekmez';
                            $badgeColor = 'bg-green-100 text-green-800';
                            $fee = 'Ücretsiz';
                            $processing = 'Vizesiz giriş';
                            break;
                        case 'CN':
                        case 'IN':
                        case 'RU':
                            $visaStatus = 'E-Vize Mevcut';
                            $badgeColor = 'bg-blue-100 text-blue-800';
                            $fee = '$30-60';
                            $processing = '3-7 gün';
                            break;
                        default:
                            $visaStatus = 'Vize Gerekli';
                            $badgeColor = 'bg-yellow-100 text-yellow-800';
                            $fee = '$50-100';
                            $processing = '7-14 gün';
                    }
                    ?>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Vize Durumu:</span>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold <?= $badgeColor ?>"><?= $visaStatus ?></span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Ücret:</span>
                        <span class="font-semibold"><?= $fee ?></span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Süre:</span>
                        <span class="text-sm"><?= $processing ?></span>
                    </div>
                </div>
                
                <div class="mt-6 space-y-2">
                    <button onclick="checkVisa('<?= $country['code'] ?>')" 
                            class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition font-semibold">
                        Detaylı Kontrol
                    </button>
                    <?php if($visaStatus === 'Vize Gerekli' || $visaStatus === 'E-Vize Mevcut'): ?>
                    <button onclick="startApplication('<?= $country['code'] ?>')" 
                            class="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition">
                        Başvuru Başlat
                    </button>
                    <?php endif; ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
    // Search functionality
    document.getElementById('countrySearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.country-card');
        
        cards.forEach(card => {
            const countryName = card.dataset.name;
            if (countryName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    function checkVisa(countryCode) {
        window.location.href = `/visa-checker?country=${countryCode}`;
    }
    
    function startApplication(countryCode) {
        window.location.href = `/visa-application?country=${countryCode}`;
    }
    </script>

</body>
</html>