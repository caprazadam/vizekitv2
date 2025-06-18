<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - VizeKit</title>
    <meta name="description" content="VizeKit yönetim paneli. Başvuruları yönet, istatistikleri görüntüle.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/css/vizekit-theme.css" rel="stylesheet">
    <style>
        .admin-sidebar {
            background: var(--glass-bg);
            backdrop-filter: blur(15px);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            width: 280px;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        .admin-content {
            margin-left: 280px;
            padding: 2rem;
            min-height: 100vh;
        }

        .sidebar-header {
            padding: 2rem 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-logo {
            font-size: 1.5rem;
            font-weight: bold;
            background: linear-gradient(45deg, var(--primary-purple), var(--neon-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .sidebar-nav {
            padding: 1rem 0;
        }

        .nav-item {
            margin-bottom: 0.5rem;
            padding: 0 1rem;
        }

        .nav-link {
            color: rgba(255, 255, 255, 0.8) !important;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        .nav-link:hover, .nav-link.active {
            background: rgba(255, 255, 255, 0.1);
            color: var(--neon-green) !important;
            transform: translateX(5px);
        }

        .nav-link i {
            width: 20px;
            margin-right: 0.75rem;
        }

        .stats-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .stats-card:hover {
            transform: translateY(-5px);
            border-color: var(--neon-green);
            box-shadow: 0 15px 30px rgba(0, 255, 136, 0.2);
        }

        .stats-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-purple), var(--neon-green), var(--neon-blue));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .stats-card:hover::before {
            opacity: 1;
        }

        .stats-number {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(45deg, var(--neon-green), var(--neon-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .stats-icon {
            font-size: 2rem;
            color: var(--primary-purple);
            opacity: 0.7;
        }

        .data-table {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .table-dark {
            background: transparent;
            color: white;
        }

        .table-dark th {
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
            color: var(--neon-green);
        }

        .table-dark td {
            border-color: rgba(255, 255, 255, 0.1);
        }

        .status-badge {
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .status-pending {
            background: linear-gradient(45deg, #ffa500, rgba(255, 165, 0, 0.3));
            color: white;
        }

        .status-processing {
            background: linear-gradient(45deg, var(--neon-blue), rgba(0, 212, 255, 0.3));
            color: var(--dark-bg);
        }

        .status-approved {
            background: linear-gradient(45deg, var(--neon-green), rgba(0, 255, 136, 0.3));
            color: var(--dark-bg);
        }

        .status-rejected {
            background: linear-gradient(45deg, #ff6b6b, rgba(255, 107, 107, 0.3));
            color: white;
        }

        .action-btn {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.8rem;
            margin: 0.1rem;
            transition: all 0.3s ease;
        }

        .action-btn:hover {
            background: var(--neon-green);
            color: var(--dark-bg);
            border-color: var(--neon-green);
        }

        .logout-btn {
            position: absolute;
            bottom: 2rem;
            left: 1rem;
            right: 1rem;
            background: linear-gradient(45deg, #ff6b6b, rgba(255, 107, 107, 0.3));
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 10px;
            text-decoration: none;
            text-align: center;
            transition: all 0.3s ease;
        }

        .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
            color: white;
        }

        .chart-container {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.7);
        }

        .mobile-toggle {
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: var(--primary-purple);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 10px;
        }

        @media (max-width: 768px) {
            .admin-sidebar {
                transform: translateX(-100%);
            }

            .admin-sidebar.show {
                transform: translateX(0);
            }

            .admin-content {
                margin-left: 0;
                padding: 1rem;
                padding-top: 4rem;
            }

            .mobile-toggle {
                display: block;
            }
        }

        .welcome-card {
            background: linear-gradient(135deg, var(--primary-purple), var(--secondary-purple));
            color: white;
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .welcome-title {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
            opacity: 0.9;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="animated-bg"></div>

    <!-- Mobile Toggle -->
    <button class="mobile-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <div class="admin-sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <i class="fas fa-shield-alt me-2"></i>
                VizeKit Admin
            </div>
            <div class="text-muted small">Yönetim Paneli</div>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-item">
                <a href="#dashboard" class="nav-link active" onclick="showSection('dashboard')">
                    <i class="fas fa-tachometer-alt"></i>
                    Dashboard
                </a>
            </div>
            <div class="nav-item">
                <a href="#applications" class="nav-link" onclick="showSection('applications')">
                    <i class="fas fa-file-alt"></i>
                    Başvurular
                </a>
            </div>
            <div class="nav-item">
                <a href="#consultations" class="nav-link" onclick="showSection('consultations')">
                    <i class="fas fa-comments"></i>
                    Danışmanlık
                </a>
            </div>
            <div class="nav-item">
                <a href="#countries" class="nav-link" onclick="showSection('countries')">
                    <i class="fas fa-globe"></i>
                    Ülke Yönetimi
                </a>
            </div>
            <div class="nav-item">
                <a href="#services" class="nav-link" onclick="showSection('services')">
                    <i class="fas fa-cog"></i>
                    Hizmet Yönetimi
                </a>
            </div>
            <div class="nav-item">
                <a href="#users" class="nav-link" onclick="showSection('users')">
                    <i class="fas fa-users"></i>
                    Kullanıcılar
                </a>
            </div>
            <div class="nav-item">
                <a href="#reports" class="nav-link" onclick="showSection('reports')">
                    <i class="fas fa-chart-bar"></i>
                    Raporlar
                </a>
            </div>
        </nav>

        <a href="/admin-login" class="logout-btn">
            <i class="fas fa-sign-out-alt me-2"></i>
            Çıkış Yap
        </a>
    </div>

    <!-- Main Content -->
    <div class="admin-content">
        <!-- Dashboard Section -->
        <div id="dashboard" class="content-section">
            <div class="welcome-card">
                <div class="welcome-title">Hoş Geldiniz</div>
                <div class="welcome-subtitle">VizeKit Yönetim Paneline hoş geldiniz. Sistem durumu ve güncel istatistikler aşağıda yer almaktadır.</div>
            </div>

            <!-- Stats Cards -->
            <div class="row">
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="stats-card">
                        <div class="d-flex justify-content-between">
                            <div>
                                <div class="stats-number">24</div>
                                <div class="text-muted">Toplam Başvuru</div>
                            </div>
                            <div class="stats-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="stats-card">
                        <div class="d-flex justify-content-between">
                            <div>
                                <div class="stats-number">12</div>
                                <div class="text-muted">Bekleyen Başvuru</div>
                            </div>
                            <div class="stats-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="stats-card">
                        <div class="d-flex justify-content-between">
                            <div>
                                <div class="stats-number">8</div>
                                <div class="text-muted">Yeni Mesaj</div>
                            </div>
                            <div class="stats-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="stats-card">
                        <div class="d-flex justify-content-between">
                            <div>
                                <div class="stats-number">%92</div>
                                <div class="text-muted">Başarı Oranı</div>
                            </div>
                            <div class="stats-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Applications -->
            <div class="data-table">
                <h4 class="mb-4" style="color: var(--neon-green);">
                    <i class="fas fa-file-alt me-2"></i>Son Başvurular
                </h4>
                <div class="table-responsive">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Başvuru No</th>
                                <th>Başvuran</th>
                                <th>Ülke</th>
                                <th>Durum</th>
                                <th>Tarih</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>VK-2025-001</td>
                                <td>Ahmet Yılmaz</td>
                                <td>🇺🇸 ABD</td>
                                <td><span class="status-badge status-pending">Beklemede</span></td>
                                <td>15 Haz 2025</td>
                                <td>
                                    <button class="action-btn" onclick="viewApplication('VK-2025-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" onclick="editApplication('VK-2025-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>VK-2025-002</td>
                                <td>Fatma Kaya</td>
                                <td>🇩🇪 Almanya</td>
                                <td><span class="status-badge status-approved">Onaylandı</span></td>
                                <td>14 Haz 2025</td>
                                <td>
                                    <button class="action-btn" onclick="viewApplication('VK-2025-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" onclick="editApplication('VK-2025-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>VK-2025-003</td>
                                <td>Mehmet Demir</td>
                                <td>🇬🇧 İngiltere</td>
                                <td><span class="status-badge status-processing">İşleniyor</span></td>
                                <td>13 Haz 2025</td>
                                <td>
                                    <button class="action-btn" onclick="viewApplication('VK-2025-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" onclick="editApplication('VK-2025-003')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Chart -->
            <div class="chart-container">
                <div class="text-center">
                    <i class="fas fa-chart-bar" style="font-size: 4rem; color: var(--neon-green); margin-bottom: 1rem;"></i>
                    <h5>Başvuru İstatistikleri</h5>
                    <p>Detaylı istatistik grafikleri burada görüntülenecek</p>
                </div>
            </div>
        </div>

        <!-- Applications Section -->
        <div id="applications" class="content-section" style="display: none;">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Başvuru Yönetimi</h2>
                <button class="btn-neon" onclick="exportApplications()">
                    <i class="fas fa-download me-2"></i>Dışa Aktar
                </button>
            </div>

            <div class="data-table">
                <div class="row mb-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Başvuru ara..." id="searchApplications">
                    </div>
                    <div class="col-md-4">
                        <select class="form-select" id="filterStatus">
                            <option value="">Tüm Durumlar</option>
                            <option value="pending">Beklemede</option>
                            <option value="processing">İşleniyor</option>
                            <option value="approved">Onaylandı</option>
                            <option value="rejected">Reddedildi</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select class="form-select" id="filterCountry">
                            <option value="">Tüm Ülkeler</option>
                            <option value="US">ABD</option>
                            <option value="DE">Almanya</option>
                            <option value="GB">İngiltere</option>
                        </select>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Başvuru No</th>
                                <th>Başvuran</th>
                                <th>E-posta</th>
                                <th>Ülke</th>
                                <th>Amaç</th>
                                <th>Durum</th>
                                <th>Tarih</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody id="applicationsTableBody">
                            <!-- Applications will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Other sections placeholder -->
        <div id="consultations" class="content-section" style="display: none;">
            <h2>Danışmanlık Talepleri</h2>
            <div class="data-table">
                <p>Danışmanlık talepleri burada görüntülenecek</p>
            </div>
        </div>

        <div id="countries" class="content-section" style="display: none;">
            <h2>Ülke Yönetimi</h2>
            <div class="data-table">
                <p>Ülke ve vize bilgileri yönetimi burada yapılacak</p>
            </div>
        </div>

        <div id="services" class="content-section" style="display: none;">
            <h2>Hizmet Yönetimi</h2>
            <div class="data-table">
                <p>Hizmet tanımları ve fiyatlandırma burada yönetilecek</p>
            </div>
        </div>

        <div id="users" class="content-section" style="display: none;">
            <h2>Kullanıcı Yönetimi</h2>
            <div class="data-table">
                <p>Admin kullanıcıları burada yönetilecek</p>
            </div>
        </div>

        <div id="reports" class="content-section" style="display: none;">
            <h2>Raporlar</h2>
            <div class="data-table">
                <p>Detaylı raporlar ve analizler burada görüntülenecek</p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).style.display = 'block';
            
            // Add active class to clicked nav link
            event.target.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('show');
            }
        }

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('show');
        }

        function viewApplication(applicationId) {
            alert('Başvuru detayları: ' + applicationId);
        }

        function editApplication(applicationId) {
            alert('Başvuru düzenleme: ' + applicationId);
        }

        function exportApplications() {
            alert('Başvurular dışa aktarılıyor...');
        }

        // Load applications data
        const applications = [
            {
                id: 'VK-2025-001',
                name: 'Ahmet Yılmaz',
                email: 'ahmet@email.com',
                country: '🇺🇸 ABD',
                purpose: 'Turizm',
                status: 'pending',
                date: '15 Haz 2025'
            },
            {
                id: 'VK-2025-002',
                name: 'Fatma Kaya',
                email: 'fatma@email.com',
                country: '🇩🇪 Almanya',
                purpose: 'İş',
                status: 'approved',
                date: '14 Haz 2025'
            },
            {
                id: 'VK-2025-003',
                name: 'Mehmet Demir',
                email: 'mehmet@email.com',
                country: '🇬🇧 İngiltere',
                purpose: 'Eğitim',
                status: 'processing',
                date: '13 Haz 2025'
            },
            {
                id: 'VK-2025-004',
                name: 'Ayşe Öztürk',
                email: 'ayse@email.com',
                country: '🇫🇷 Fransa',
                purpose: 'Turizm',
                status: 'approved',
                date: '12 Haz 2025'
            },
            {
                id: 'VK-2025-005',
                name: 'Can Arslan',
                email: 'can@email.com',
                country: '🇮🇹 İtalya',
                purpose: 'İş',
                status: 'rejected',
                date: '11 Haz 2025'
            }
        ];

        function loadApplications(filter = {}) {
            const tbody = document.getElementById('applicationsTableBody');
            if (!tbody) return;

            let filteredApps = applications;

            // Apply filters
            if (filter.status) {
                filteredApps = filteredApps.filter(app => app.status === filter.status);
            }
            if (filter.search) {
                filteredApps = filteredApps.filter(app => 
                    app.id.toLowerCase().includes(filter.search.toLowerCase()) ||
                    app.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                    app.email.toLowerCase().includes(filter.search.toLowerCase())
                );
            }

            tbody.innerHTML = filteredApps.map(app => `
                <tr>
                    <td>${app.id}</td>
                    <td>${app.name}</td>
                    <td>${app.email}</td>
                    <td>${app.country}</td>
                    <td>${app.purpose}</td>
                    <td><span class="status-badge status-${app.status}">${getStatusText(app.status)}</span></td>
                    <td>${app.date}</td>
                    <td>
                        <button class="action-btn" onclick="viewApplication('${app.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="editApplication('${app.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        function getStatusText(status) {
            const statusMap = {
                'pending': 'Beklemede',
                'processing': 'İşleniyor',
                'approved': 'Onaylandı',
                'rejected': 'Reddedildi'
            };
            return statusMap[status] || status;
        }

        // Event listeners for filters
        document.addEventListener('DOMContentLoaded', function() {
            loadApplications();

            const searchInput = document.getElementById('searchApplications');
            const statusFilter = document.getElementById('filterStatus');

            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    loadApplications({
                        search: this.value,
                        status: statusFilter?.value
                    });
                });
            }

            if (statusFilter) {
                statusFilter.addEventListener('change', function() {
                    loadApplications({
                        search: searchInput?.value,
                        status: this.value
                    });
                });
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.querySelector('.mobile-toggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(event.target) && 
                !toggle.contains(event.target)) {
                sidebar.classList.remove('show');
            }
        });
    </script>
</body>
</html>