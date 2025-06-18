<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Başvuru Sorgula - VizeKit</title>
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
                    <a href="/contact" class="text-white hover:text-purple-200 transition">İletişim</a>
                    <a href="/application-status" class="text-purple-200 font-semibold">Başvuru Sorgula</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Başvuru Durumu Sorgula</h1>
            <p class="text-gray-600">Vize başvuru durumunuzu takip edin</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8">
            <form id="statusForm" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Başvuru Numarası</label>
                    <input type="text" name="application_number" placeholder="VK-2025-001" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                    <p class="text-sm text-gray-500 mt-1">Başvuru sırasında verilen referans numarası</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                    <input type="email" name="email" placeholder="ornek@email.com"
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                    <p class="text-sm text-gray-500 mt-1">Başvuru sırasında kullandığınız e-posta</p>
                </div>

                <button type="submit" class="w-full gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition">
                    Durumu Sorgula
                </button>
            </form>

            <div id="result" class="mt-8 hidden">
                <!-- Results will be displayed here -->
            </div>
        </div>

        <!-- Help Section -->
        <div class="mt-12 bg-purple-50 rounded-xl p-8 border border-purple-200">
            <h2 class="text-2xl font-bold text-purple-900 mb-6">Yardım ve Bilgilendirme</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-semibold text-purple-900 mb-3">Başvuru Numarası Nerede?</h3>
                    <ul class="space-y-2 text-purple-700">
                        <li>• Başvuru tamamlandıktan sonra gönderilen e-postada</li>
                        <li>• SMS ile gönderilen onay mesajında</li>
                        <li>• VK-YYYY-XXX formatında (örn: VK-2025-001)</li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-purple-900 mb-3">Başvuru Durumları</h3>
                    <ul class="space-y-2 text-purple-700">
                        <li>• <span class="text-yellow-600">Beklemede:</span> İnceleme aşamasında</li>
                        <li>• <span class="text-blue-600">İşlemde:</span> Konsolosluğa iletildi</li>
                        <li>• <span class="text-green-600">Onaylandı:</span> Vize onaylandı</li>
                        <li>• <span class="text-red-600">Reddedildi:</span> Başvuru reddedildi</li>
                    </ul>
                </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-purple-200">
                <h3 class="font-semibold text-purple-900 mb-3">Sorun mu yaşıyorsunuz?</h3>
                <div class="flex flex-wrap gap-4">
                    <a href="/contact" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                        İletişime Geç
                    </a>
                    <a href="https://wa.me/908503466646" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                        WhatsApp Destek
                    </a>
                    <a href="tel:+908503466646" class="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition">
                        Telefon: +908503466646
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script>
    document.getElementById('statusForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const applicationNumber = formData.get('application_number');
        const email = formData.get('email');
        const result = document.getElementById('result');
        
        // Show loading
        result.className = 'mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg';
        result.innerHTML = '<div class="flex items-center"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>Sorgulanıyor...</div>';
        
        // Simulate API call
        setTimeout(() => {
            // Sample application data
            const applications = {
                'VK-2025-001': {
                    status: 'Beklemede',
                    country: 'Amerika Birleşik Devletleri',
                    date: '2025-06-15',
                    name: 'Ahmet Yılmaz',
                    purpose: 'Turizm',
                    estimatedDate: '2025-06-25',
                    documents: ['Pasaport fotokopisi', 'Fotoğraf', 'Mali belge']
                },
                'VK-2025-002': {
                    status: 'Onaylandı',
                    country: 'Almanya',
                    date: '2025-06-14',
                    name: 'Fatma Kaya',
                    purpose: 'İş',
                    estimatedDate: '2025-06-20',
                    documents: ['Tüm belgeler tamamlandı']
                },
                'VK-2025-003': {
                    status: 'Reddedildi',
                    country: 'İngiltere',
                    date: '2025-06-13',
                    name: 'Mehmet Demir',
                    purpose: 'Eğitim',
                    estimatedDate: '',
                    documents: ['Eksik belgeler mevcut']
                }
            };
            
            const application = applications[applicationNumber.toUpperCase()];
            
            if (application) {
                const statusColors = {
                    'Beklemede': 'bg-yellow-100 border-yellow-400 text-yellow-800',
                    'İşlemde': 'bg-blue-100 border-blue-400 text-blue-800',
                    'Onaylandı': 'bg-green-100 border-green-400 text-green-800',
                    'Reddedildi': 'bg-red-100 border-red-400 text-red-800'
                };
                
                result.className = `mt-8 p-6 ${statusColors[application.status]} border rounded-lg`;
                result.innerHTML = `
                    <div class="mb-4">
                        <h3 class="text-xl font-bold mb-2">Başvuru Durumu: ${application.status}</h3>
                        <div class="grid md:grid-cols-2 gap-4 text-sm">
                            <div><strong>Başvuru No:</strong> ${applicationNumber.toUpperCase()}</div>
                            <div><strong>Başvuran:</strong> ${application.name}</div>
                            <div><strong>Ülke:</strong> ${application.country}</div>
                            <div><strong>Amaç:</strong> ${application.purpose}</div>
                            <div><strong>Başvuru Tarihi:</strong> ${application.date}</div>
                            ${application.estimatedDate ? `<div><strong>Tahmini Sonuç:</strong> ${application.estimatedDate}</div>` : ''}
                        </div>
                    </div>
                    <div class="border-t pt-4">
                        <h4 class="font-semibold mb-2">Belgeler:</h4>
                        <ul class="list-disc list-inside text-sm">
                            ${application.documents.map(doc => `<li>${doc}</li>`).join('')}
                        </ul>
                    </div>
                    ${application.status === 'Onaylandı' ? `
                        <div class="mt-4 p-3 bg-white rounded border">
                            <p class="text-sm font-medium">Vizene hazır! Pasaportunuzu almak için randevu alabilirsiniz.</p>
                        </div>
                    ` : ''}
                `;
            } else {
                result.className = 'mt-8 p-6 bg-red-50 border border-red-200 rounded-lg';
                result.innerHTML = `
                    <h3 class="text-lg font-semibold text-red-800 mb-2">Başvuru Bulunamadı</h3>
                    <p class="text-red-700">Girdiğiniz başvuru numarası veya e-posta adresi ile eşleşen bir başvuru bulunamadı.</p>
                    <div class="mt-4">
                        <p class="text-sm text-red-600">Lütfen bilgilerinizi kontrol edin veya bizimle iletişime geçin.</p>
                    </div>
                `;
            }
        }, 1500);
    });
    </script>

</body>
</html>