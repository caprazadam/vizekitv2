<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim - VizeKit</title>
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
                    <a href="/visa-checker" class="text-white hover:text-purple-200 transition">Vize Kontrol</a>
                    <a href="/countries" class="text-white hover:text-purple-200 transition">Ülkeler</a>
                    <a href="/services" class="text-white hover:text-purple-200 transition">Hizmetler</a>
                    <a href="/contact" class="text-purple-200 font-semibold">İletişim</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
            <p class="text-gray-600">Vize hizmetleri hakkında sorularınız için bizimle iletişime geçin</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Bize Yazın</h2>
                <form class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                            <input type="text" name="first_name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                            <input type="text" name="last_name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                        <input type="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                        <input type="tel" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                        <select name="subject" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                            <option value="">Konu seçin...</option>
                            <option value="visa_info">Vize Bilgisi</option>
                            <option value="application">Başvuru Durumu</option>
                            <option value="services">Hizmetler</option>
                            <option value="payment">Ödeme</option>
                            <option value="other">Diğer</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Mesaj</label>
                        <textarea name="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required></textarea>
                    </div>
                    <button type="submit" class="w-full gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition">
                        Mesaj Gönder
                    </button>
                </form>
            </div>

            <!-- Contact Information -->
            <div class="space-y-8">
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="text-2xl mr-4">📞</div>
                            <div>
                                <h3 class="font-semibold text-gray-900">Telefon</h3>
                                <p class="text-gray-600">+908503466646</p>
                                <p class="text-sm text-gray-500">Pazartesi - Cuma: 09:00 - 18:00</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="text-2xl mr-4">📧</div>
                            <div>
                                <h3 class="font-semibold text-gray-900">E-posta</h3>
                                <p class="text-gray-600">info@vizekit.com</p>
                                <p class="text-sm text-gray-500">24 saat içinde yanıt veriyoruz</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="text-2xl mr-4">📍</div>
                            <div>
                                <h3 class="font-semibold text-gray-900">Adres</h3>
                                <p class="text-gray-600">Sakarya Mah. 57015. SK. No: 25<br>Kahramanmaraş</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="text-2xl mr-4">💬</div>
                            <div>
                                <h3 class="font-semibold text-gray-900">WhatsApp</h3>
                                <p class="text-gray-600">+908503466646</p>
                                <a href="https://wa.me/908503466646" class="text-green-600 hover:text-green-700 text-sm font-medium">WhatsApp'tan mesaj gönder</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Çalışma Saatleri</h2>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Pazartesi - Cuma</span>
                            <span class="font-semibold">09:00 - 18:00</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Cumartesi</span>
                            <span class="font-semibold">10:00 - 16:00</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Pazar</span>
                            <span class="text-red-600">Kapalı</span>
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 rounded-xl p-8 border border-purple-200">
                    <h3 class="text-lg font-semibold text-purple-900 mb-4">Hızlı Destek</h3>
                    <p class="text-purple-700 mb-4">Acil vize danışmanlığı için WhatsApp hattımızı kullanabilirsiniz.</p>
                    <a href="https://wa.me/908503466646" class="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                        <span class="mr-2">💬</span>
                        WhatsApp Destek
                    </a>
                </div>
            </div>
        </div>
    </div>

</body>
</html>