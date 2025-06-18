<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - VizeKit</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="bg-gray-50">
    
    <!-- Navigation -->
    <nav class="gradient-bg shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-white">VizeKit Admin</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-purple-200">Hoşgeldiniz, Admin</span>
                    <button onclick="logout()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                        Çıkış
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Stats -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
                <div class="text-2xl font-bold text-blue-600">142</div>
                <div class="text-gray-600">Toplam Başvuru</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="text-2xl font-bold text-green-600">89</div>
                <div class="text-gray-600">Onaylanan</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="text-2xl font-bold text-yellow-600">28</div>
                <div class="text-gray-600">Beklemede</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="text-2xl font-bold text-red-600">12</div>
                <div class="text-gray-600">Reddedilen</div>
            </div>
        </div>

        <!-- Applications Table -->
        <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold text-gray-900">Son Vize Başvuruları</h2>
                    <div class="flex space-x-2">
                        <select class="border border-gray-300 rounded px-3 py-1 text-sm">
                            <option>Tüm Durumlar</option>
                            <option>Beklemede</option>
                            <option>Onaylandı</option>
                            <option>Reddedildi</option>
                        </select>
                        <input type="text" placeholder="Başvuru No..." class="border border-gray-300 rounded px-3 py-1 text-sm">
                    </div>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başvuru No</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başvuran</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ülke</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" id="applicationsTable">
                        <!-- Applications will be loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
    // Check authentication
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = '/admin-login';
    }

    // Sample applications data
    const applications = [
        {
            id: 'VK-2025-001',
            name: 'Ahmet Yılmaz',
            country: 'Amerika Birleşik Devletleri',
            date: '2025-06-15',
            status: 'Beklemede',
            email: 'ahmet@email.com',
            phone: '+905551234567'
        },
        {
            id: 'VK-2025-002',
            name: 'Fatma Kaya',
            country: 'Almanya',
            date: '2025-06-14',
            status: 'Onaylandı',
            email: 'fatma@email.com',
            phone: '+905559876543'
        },
        {
            id: 'VK-2025-003',
            name: 'Mehmet Demir',
            country: 'İngiltere',
            date: '2025-06-13',
            status: 'Reddedildi',
            email: 'mehmet@email.com',
            phone: '+905551111111'
        },
        {
            id: 'VK-2025-004',
            name: 'Ayşe Öztürk',
            country: 'Fransa',
            date: '2025-06-12',
            status: 'Beklemede',
            email: 'ayse@email.com',
            phone: '+905552222222'
        },
        {
            id: 'VK-2025-005',
            name: 'Can Arslan',
            country: 'İtalya',
            date: '2025-06-11',
            status: 'Onaylandı',
            email: 'can@email.com',
            phone: '+905553333333'
        }
    ];

    function loadApplications() {
        const tableBody = document.getElementById('applicationsTable');
        tableBody.innerHTML = '';

        applications.forEach(app => {
            const statusColor = {
                'Beklemede': 'bg-yellow-100 text-yellow-800',
                'Onaylandı': 'bg-green-100 text-green-800',
                'Reddedildi': 'bg-red-100 text-red-800'
            };

            const row = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${app.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${app.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${app.country}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${app.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${statusColor[app.status]}">${app.status}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button onclick="viewApplication('${app.id}')" class="text-blue-600 hover:text-blue-800">Görüntüle</button>
                        <button onclick="updateStatus('${app.id}')" class="text-green-600 hover:text-green-800">Güncelle</button>
                        <button onclick="deleteApplication('${app.id}')" class="text-red-600 hover:text-red-800">Sil</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function viewApplication(id) {
        const app = applications.find(a => a.id === id);
        alert(`Başvuru Detayları:\n\nID: ${app.id}\nAd: ${app.name}\nÜlke: ${app.country}\nE-posta: ${app.email}\nTelefon: ${app.phone}\nDurum: ${app.status}`);
    }

    function updateStatus(id) {
        const newStatus = prompt('Yeni durum (Beklemede/Onaylandı/Reddedildi):');
        if (newStatus && ['Beklemede', 'Onaylandı', 'Reddedildi'].includes(newStatus)) {
            const app = applications.find(a => a.id === id);
            app.status = newStatus;
            loadApplications();
            alert('Durum güncellendi!');
        }
    }

    function deleteApplication(id) {
        if (confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) {
            const index = applications.findIndex(a => a.id === id);
            applications.splice(index, 1);
            loadApplications();
            alert('Başvuru silindi!');
        }
    }

    function logout() {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = '/admin-login';
    }

    // Load applications on page load
    loadApplications();
    </script>

</body>
</html>