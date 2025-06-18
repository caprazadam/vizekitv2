<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hizmetler - VizeKit</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-hover:hover { transform: translateY(-5px); transition: all 0.3s ease; }
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
                    <a href="/countries" class="text-white hover:text-purple-200 transition">Ülkeler</a>
                    <a href="/services" class="text-purple-200 font-semibold">Hizmetler</a>
                    <a href="/contact" class="text-white hover:text-purple-200 transition">İletişim</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Vize Hizmetlerimiz</h1>
            <p class="text-gray-600 max-w-3xl mx-auto">Profesyonel ekibimizle vize sürecinizde size destek oluyoruz. Güvenilir, hızlı ve kaliteli hizmet anlayışımızla yanınızdayız.</p>
        </div>

        <!-- Services Grid -->
        <div class="grid lg:grid-cols-2 gap-8 mb-16">
            <?php foreach($services as $index => $service): ?>
            <div class="bg-white rounded-xl shadow-lg p-8 card-hover">
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2"><?= $service['name'] ?></h3>
                        <p class="text-gray-600"><?= $service['description'] ?></p>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold text-purple-600"><?= $service['price'] ?></div>
                        <div class="text-sm text-gray-500"><?= $service['duration'] ?></div>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Dahil Olan Hizmetler:</h4>
                    <ul class="space-y-2">
                        <?php foreach($service['features'] as $feature): ?>
                        <li class="flex items-center text-gray-600">
                            <span class="text-green-500 mr-2">✓</span>
                            <?= $feature ?>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                
                <button onclick="selectService('<?= $index ?>')" 
                        class="w-full gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition">
                    Hizmeti Seç
                </button>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- Additional Services -->
        <div class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Ek Hizmetler</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center p-6 border border-gray-200 rounded-lg">
                    <div class="text-3xl mb-3">📋</div>
                    <h3 class="font-semibold mb-2">Randevu Alma</h3>
                    <p class="text-gray-600 text-sm mb-3">Konsolosluk randevu işlemleri</p>
                    <div class="font-bold text-purple-600">₺99</div>
                </div>
                <div class="text-center p-6 border border-gray-200 rounded-lg">
                    <div class="text-3xl mb-3">🚀</div>
                    <h3 class="font-semibold mb-2">Acil İşlem</h3>
                    <p class="text-gray-600 text-sm mb-3">24 saat içinde işlem</p>
                    <div class="font-bold text-purple-600">₺299</div>
                </div>
                <div class="text-center p-6 border border-gray-200 rounded-lg">
                    <div class="text-3xl mb-3">🎯</div>
                    <h3 class="font-semibold mb-2">VIP Hizmet</h3>
                    <p class="text-gray-600 text-sm mb-3">Kişisel temsilci desteği</p>
                    <div class="font-bold text-purple-600">₺999</div>
                </div>
            </div>
        </div>

        <!-- Process Steps -->
        <div class="mt-16">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Hizmet Sürecimiz</h2>
            <div class="grid md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">1</span>
                    </div>
                    <h3 class="font-semibold mb-2">Danışmanlık</h3>
                    <p class="text-gray-600 text-sm">İhtiyaçlarınızı analiz ediyoruz</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 class="font-semibold mb-2">Belge Hazırlığı</h3>
                    <p class="text-gray-600 text-sm">Gerekli evrakları hazırlıyoruz</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 class="font-semibold mb-2">Başvuru</h3>
                    <p class="text-gray-600 text-sm">Vize başvurunuzu yapıyoruz</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">4</span>
                    </div>
                    <h3 class="font-semibold mb-2">Takip</h3>
                    <p class="text-gray-600 text-sm">Süreç boyunca sizi bilgilendiriyoruz</p>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-16 gradient-bg rounded-xl p-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-4">Hemen Başlayalım</h2>
            <p class="text-purple-200 mb-6">Vize süreciniz için profesyonel destek almaya hazır mısınız?</p>
            <div class="space-x-4">
                <a href="/contact" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition inline-block">
                    İletişime Geç
                </a>
                <a href="/visa-checker" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition inline-block">
                    Vize Kontrol Et
                </a>
            </div>
        </div>
    </div>

    <script>
    function selectService(serviceIndex) {
        // Store selected service in localStorage and redirect to contact
        localStorage.setItem('selectedService', serviceIndex);
        window.location.href = '/contact';
    }
    </script>

</body>
</html>