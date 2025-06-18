<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vize Kontrol - VizeKit</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
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
                    <a href="/visa-checker" class="text-purple-200 font-semibold">Vize Kontrol</a>
                    <a href="/countries" class="text-white hover:text-purple-200 transition">Ülkeler</a>
                    <a href="/services" class="text-white hover:text-purple-200 transition">Hizmetler</a>
                    <a href="/contact" class="text-white hover:text-purple-200 transition">İletişim</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Vize Kontrol Sistemi</h1>
            <p class="text-gray-600">Gideceğiniz ülke için vize gereksinimlerini kontrol edin</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8">
            <form id="visaForm" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Vatandaşlık</label>
                        <select name="from_country" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option value="TR">🇹🇷 Türkiye</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Gidilecek Ülke</label>
                        <select name="to_country" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                            <option value="">Ülke seçin...</option>
                            <?php foreach($countries as $country): ?>
                            <option value="<?= $country['code'] ?>"><?= $country['flag'] ?> <?= $country['name'] ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Seyahat Amacı</label>
                    <select name="purpose" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        <option value="">Amaç seçin...</option>
                        <option value="tourism">Turizm</option>
                        <option value="business">İş</option>
                        <option value="education">Eğitim</option>
                        <option value="medical">Tıbbi</option>
                        <option value="transit">Transit</option>
                        <option value="family">Aile Ziyareti</option>
                    </select>
                </div>

                <button type="submit" class="w-full gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition">
                    Vize Gereksinimlerini Kontrol Et
                </button>
            </form>

            <div id="result" class="mt-8 hidden">
                <!-- Results will be displayed here -->
            </div>
        </div>
    </div>

    <script>
    document.getElementById('visaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const result = document.getElementById('result');
        
        // Show loading
        result.className = 'mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg';
        result.innerHTML = '<div class="flex items-center"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>Kontrol ediliyor...</div>';
        
        // Simulate API call
        setTimeout(() => {
            const toCountry = formData.get('to_country');
            const purpose = formData.get('purpose');
            
            // Sample visa requirements (in real app, this would come from database)
            const visaData = {
                'US': { required: true, evisa: false, fee: '$160', processing: '10-15 gün' },
                'DE': { required: false, evisa: false, fee: 'Ücretsiz', processing: 'Vize gerekmez' },
                'GB': { required: true, evisa: false, fee: '£95', processing: '15-20 gün' },
                'JP': { required: false, evisa: false, fee: 'Ücretsiz', processing: 'Vize gerekmez' },
                'CN': { required: true, evisa: true, fee: '$30', processing: '3-5 gün' }
            };
            
            const countryName = [...document.querySelector('[name="to_country"]').options]
                .find(opt => opt.value === toCountry)?.textContent || '';
            
            const visa = visaData[toCountry] || { required: true, evisa: false, fee: '$50', processing: '7-10 gün' };
            
            if (visa.required) {
                result.className = 'mt-8 p-6 bg-red-50 border border-red-200 rounded-lg';
                result.innerHTML = `
                    <h3 class="text-lg font-semibold text-red-800 mb-4">Vize Gerekli - ${countryName}</h3>
                    <div class="space-y-3 text-red-700">
                        <p><strong>Ücret:</strong> ${visa.fee}</p>
                        <p><strong>İşlem Süresi:</strong> ${visa.processing}</p>
                        <p><strong>E-Vize:</strong> ${visa.evisa ? 'Mevcut' : 'Mevcut değil'}</p>
                        <div class="mt-4">
                            <button onclick="startApplication('${toCountry}', '${purpose}')" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                                Vize Başvurusu Başlat
                            </button>
                        </div>
                    </div>
                `;
            } else {
                result.className = 'mt-8 p-6 bg-green-50 border border-green-200 rounded-lg';
                result.innerHTML = `
                    <h3 class="text-lg font-semibold text-green-800 mb-4">Vize Gerekmez - ${countryName}</h3>
                    <p class="text-green-700">Türk vatandaşları ${purpose} amaçlı seyahat için vizeye ihtiyaç duymaz.</p>
                `;
            }
        }, 1500);
    });
    
    function startApplication(country, purpose) {
        window.location.href = `/visa-application?country=${country}&purpose=${purpose}`;
    }
    </script>

</body>
</html>