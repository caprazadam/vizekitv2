<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VizeKit - Türk Vatandaşları için Vize Hizmetleri</title>
    <meta name="description" content="Türk vatandaşları için hızlı ve güvenilir vize hizmetleri. Vize kontrol, başvuru ve danışmanlık hizmetleri.">
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
                    <h1 class="text-2xl font-bold text-white">VizeKit</h1>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-white hover:text-purple-200 transition">Ana Sayfa</a>
                    <a href="/visa-checker" class="text-white hover:text-purple-200 transition">Vize Kontrol</a>
                    <a href="/countries" class="text-white hover:text-purple-200 transition">Ülkeler</a>
                    <a href="/services" class="text-white hover:text-purple-200 transition">Hizmetler</a>
                    <a href="/contact" class="text-white hover:text-purple-200 transition">İletişim</a>
                    <a href="/application-status" class="text-white hover:text-purple-200 transition">Başvuru Sorgula</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="gradient-bg">
        <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Türk Vatandaşları için<br>
                    <span class="text-purple-200">Vize Hizmetleri</span>
                </h1>
                <p class="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                    150+ ülke için vize gereksinimleri, başvuru süreci ve uzman danışmanlık hizmetleri. 
                    Seyahat planlarınızı güvenle yapın.
                </p>
                <div class="space-x-4">
                    <a href="/visa-checker" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                        Vize Kontrol Et
                    </a>
                    <a href="/services" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                        Hizmetlerimiz
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Neden VizeKit?</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">Türk vatandaşları için özel olarak tasarlanmış, güvenilir ve hızlı vize hizmetleri</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center card-hover bg-gray-50 p-8 rounded-xl">
                    <div class="text-4xl mb-4">🛂</div>
                    <h3 class="text-xl font-semibold mb-4">Hızlı Vize Kontrol</h3>
                    <p class="text-gray-600">150+ ülke için güncel vize gereksinimleri ve süreçleri hakkında anında bilgi alın.</p>
                </div>
                <div class="text-center card-hover bg-gray-50 p-8 rounded-xl">
                    <div class="text-4xl mb-4">👨‍💼</div>
                    <h3 class="text-xl font-semibold mb-4">Uzman Danışmanlık</h3>
                    <p class="text-gray-600">Deneyimli vize uzmanlarımızdan başvuru sürecinde profesyonel destek alın.</p>
                </div>
                <div class="text-center card-hover bg-gray-50 p-8 rounded-xl">
                    <div class="text-4xl mb-4">🔒</div>
                    <h3 class="text-xl font-semibold mb-4">Güvenli İşlem</h3>
                    <p class="text-gray-600">Kişisel bilgileriniz SSL şifreleme ile korunur. %100 güvenli ödeme sistemi.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Section -->
    <div class="py-20 gradient-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 text-center">
                <div>
                    <div class="text-4xl font-bold text-white mb-2">150+</div>
                    <p class="text-purple-200">Desteklenen Ülke</p>
                </div>
                <div>
                    <div class="text-4xl font-bold text-white mb-2">5000+</div>
                    <p class="text-purple-200">Başarılı Başvuru</p>
                </div>
                <div>
                    <div class="text-4xl font-bold text-white mb-2">24/7</div>
                    <p class="text-purple-200">Müşteri Desteği</p>
                </div>
                <div>
                    <div class="text-4xl font-bold text-white mb-2">%98</div>
                    <p class="text-purple-200">Başarı Oranı</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Popular Countries -->
    <div class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Popüler Destinasyonlar</h2>
                <p class="text-gray-600">En çok tercih edilen ülkeler için vize bilgileri</p>
            </div>
            <div class="grid md:grid-cols-6 gap-6">
                <?php 
                $popular_countries = array_slice($countries, 0, 12);
                foreach($popular_countries as $country): 
                ?>
                <div class="text-center card-hover bg-white p-6 rounded-xl shadow-sm">
                    <div class="text-3xl mb-2"><?= $country['flag'] ?></div>
                    <h3 class="font-semibold text-sm"><?= $country['name'] ?></h3>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">VizeKit</h3>
                    <p class="text-gray-400">Türk vatandaşları için güvenilir vize hizmetleri platformu.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Hızlı Linkler</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="/visa-checker" class="hover:text-white transition">Vize Kontrol</a></li>
                        <li><a href="/countries" class="hover:text-white transition">Ülkeler</a></li>
                        <li><a href="/services" class="hover:text-white transition">Hizmetler</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Destek</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="/contact" class="hover:text-white transition">İletişim</a></li>
                        <li><a href="/application-status" class="hover:text-white transition">Başvuru Sorgula</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">İletişim</h4>
                    <div class="space-y-2 text-gray-400">
                        <p>📞 +908503466646</p>
                        <p>📧 info@vizekit.com</p>
                        <p>📍 Sakarya Mah. 57015. SK. No: 25<br>Kahramanmaraş</p>
                        <p>💬 WhatsApp: +908503466646</p>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 VizeKit. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </footer>

</body>
</html>