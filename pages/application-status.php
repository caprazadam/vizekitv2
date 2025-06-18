<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Başvuru Sorgula - VizeKit</title>
    <meta name="description" content="Vize başvuru durumunuzu sorgulayın. Başvuru numaranızla anlık durum takibi yapın.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/css/vizekit-theme.css" rel="stylesheet">
    <style>
        .page-header {
            padding: 150px 0 80px;
            text-align: center;
        }

        .search-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 3rem;
            margin-bottom: 3rem;
        }

        .status-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            transition: all 0.3s ease;
        }

        .status-card:hover {
            transform: translateY(-5px);
            border-color: var(--neon-green);
            box-shadow: 0 15px 30px rgba(0, 255, 136, 0.2);
        }

        .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.9rem;
            display: inline-block;
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

        .status-completed {
            background: linear-gradient(45deg, var(--primary-purple), rgba(111, 66, 193, 0.3));
            color: white;
        }

        .timeline {
            position: relative;
            padding-left: 2rem;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, var(--neon-green), var(--neon-blue));
        }

        .timeline-item {
            position: relative;
            margin-bottom: 2rem;
            padding-left: 2rem;
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 8px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--neon-green);
        }

        .timeline-item.active::before {
            background: var(--neon-blue);
            box-shadow: 0 0 20px var(--neon-blue);
        }

        .timeline-item.pending::before {
            background: rgba(255, 255, 255, 0.3);
        }

        .search-input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            color: white;
            padding: 15px 20px;
            font-size: 1.1rem;
            text-align: center;
            letter-spacing: 2px;
        }

        .search-input:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 136, 0.25);
            color: white;
        }

        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: normal;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-item:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: var(--neon-green);
        }

        .document-list {
            list-style: none;
            padding: 0;
        }

        .document-list li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.5rem;
        }

        .document-list li::before {
            content: '\f15b';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            position: absolute;
            left: 0;
            color: var(--neon-blue);
        }

        .result-container {
            display: none;
        }

        .no-result {
            text-align: center;
            padding: 3rem;
            color: rgba(255, 255, 255, 0.7);
        }
    </style>
</head>
<body>
    <div class="animated-bg"></div>
    
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
        <div class="container">
            <a class="navbar-brand" href="/">
                <i class="fas fa-passport me-2"></i>VizeKit
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Ana Sayfa</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/visa-checker">Vize Kontrol</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/countries">Ülkeler</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/services">Hizmetler</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">İletişim</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/application-status">Başvuru Sorgula</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1 class="page-title">Başvuru Sorgula</h1>
            <p class="hero-subtitle">Vize başvuru durumunuzu anlık olarak takip edin</p>
        </div>
    </section>

    <!-- Search Section -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="search-card">
                        <div class="text-center mb-4">
                            <i class="fas fa-search" style="font-size: 3rem; color: var(--neon-green); margin-bottom: 1rem;"></i>
                            <h3>Başvuru Numaranızı Girin</h3>
                            <p class="text-muted">Başvuru numaranız VK-2025-XXX formatında olmalıdır</p>
                        </div>
                        
                        <form id="searchForm" class="mb-4">
                            <div class="row">
                                <div class="col-md-8 mb-3">
                                    <input type="text" id="applicationNumber" class="form-control search-input" 
                                           placeholder="VK-2025-001" pattern="VK-[0-9]{4}-[0-9]{3}" required>
                                </div>
                                <div class="col-md-4">
                                    <button type="submit" class="btn-neon w-100">
                                        <i class="fas fa-search me-2"></i>Sorgula
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div class="text-center">
                            <small class="text-muted">
                                Başvuru numaranızı hatırlamıyor musunuz? 
                                <a href="/contact" class="text-white">İletişime geçin</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Results Section -->
    <section class="py-5">
        <div class="container">
            <div id="resultContainer" class="result-container">
                <div class="row">
                    <div class="col-lg-8 mb-4">
                        <div class="status-card">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h4 id="applicationNumberResult" class="mb-2"></h4>
                                    <p class="text-muted mb-0" id="countryResult"></p>
                                </div>
                                <span id="statusBadge" class="status-badge"></span>
                            </div>

                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="info-item">
                                        <span class="info-label">Başvuran:</span>
                                        <span id="applicantName"></span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">E-posta:</span>
                                        <span id="applicantEmail"></span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Telefon:</span>
                                        <span id="applicantPhone"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-item">
                                        <span class="info-label">Başvuru Tarihi:</span>
                                        <span id="applicationDate"></span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Tahmini Teslim:</span>
                                        <span id="estimatedDate"></span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Ücret:</span>
                                        <span id="feeAmount"></span>
                                    </div>
                                </div>
                            </div>

                            <div id="notesSection" style="display: none;">
                                <h5 class="mb-3" style="color: var(--neon-blue);">
                                    <i class="fas fa-sticky-note me-2"></i>Notlar
                                </h5>
                                <p id="applicationNotes" class="mb-0"></p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="status-card">
                            <h5 class="mb-4" style="color: var(--neon-green);">
                                <i class="fas fa-clock me-2"></i>Süreç Takibi
                            </h5>
                            <div class="timeline">
                                <div class="timeline-item active">
                                    <h6>Başvuru Alındı</h6>
                                    <small class="text-muted">Başvurunuz sistem tarafından alındı</small>
                                </div>
                                <div class="timeline-item active" id="processingStep">
                                    <h6>İnceleme Aşaması</h6>
                                    <small class="text-muted">Belgeleriniz inceleniyor</small>
                                </div>
                                <div class="timeline-item pending" id="approvalStep">
                                    <h6>Onay Aşaması</h6>
                                    <small class="text-muted">Son kontroller yapılıyor</small>
                                </div>
                                <div class="timeline-item pending" id="completedStep">
                                    <h6>Tamamlandı</h6>
                                    <small class="text-muted">Vize işleminiz tamamlandı</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Result -->
            <div id="noResult" class="result-container">
                <div class="glass-card">
                    <div class="no-result">
                        <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--neon-blue); margin-bottom: 1rem;"></i>
                        <h4>Başvuru Bulunamadı</h4>
                        <p>Girdiğiniz başvuru numarası sistemimizde bulunamadı. Lütfen numarayı kontrol ederek tekrar deneyin.</p>
                        <a href="/contact" class="btn-outline-neon">
                            <i class="fas fa-envelope me-2"></i>Destek Al
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Info Section -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <i class="fas fa-clock mb-3" style="font-size: 2rem; color: var(--neon-green);"></i>
                        <h5>Anlık Takip</h5>
                        <p>Başvuru durumunuzu 7/24 anlık olarak takip edebilirsiniz</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <i class="fas fa-bell mb-3" style="font-size: 2rem; color: var(--neon-blue);"></i>
                        <h5>SMS Bildirimleri</h5>
                        <p>Durum değişikliklerinde otomatik SMS bilgilendirmesi</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <i class="fas fa-headset mb-3" style="font-size: 2rem; color: var(--primary-purple);"></i>
                        <h5>Destek</h5>
                        <p>Herhangi bir sorunuz için 7/24 canlı destek hizmeti</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const applicationNumber = document.getElementById('applicationNumber').value.trim();
            const resultContainer = document.getElementById('resultContainer');
            const noResult = document.getElementById('noResult');
            
            // Hide previous results
            resultContainer.style.display = 'none';
            noResult.style.display = 'none';
            
            // Mock data for demonstration
            const mockApplications = {
                'VK-2025-001': {
                    applicantName: 'Ahmet Yılmaz',
                    email: 'ahmet@email.com',
                    phone: '+90 555 123 45 67',
                    country: '🇺🇸 Amerika Birleşik Devletleri',
                    purpose: 'Turizm',
                    status: 'pending',
                    statusText: 'Beklemede',
                    applicationDate: '15 Haziran 2025',
                    estimatedDate: '30 Haziran 2025',
                    fee: '$160',
                    notes: 'Belgeleriniz inceleme aşamasında. Ek belge talep edilebilir.'
                },
                'VK-2025-002': {
                    applicantName: 'Fatma Kaya',
                    email: 'fatma@email.com',
                    phone: '+90 555 987 65 43',
                    country: '🇩🇪 Almanya',
                    purpose: 'İş',
                    status: 'approved',
                    statusText: 'Onaylandı',
                    applicationDate: '14 Haziran 2025',
                    estimatedDate: '25 Haziran 2025',
                    fee: 'Ücretsiz',
                    notes: 'Vize başvurunuz onaylandı. Pasaportunuzu teslim alabilirsiniz.'
                },
                'VK-2025-003': {
                    applicantName: 'Mehmet Demir',
                    email: 'mehmet@email.com',
                    phone: '+90 555 111 11 11',
                    country: '🇬🇧 İngiltere',
                    purpose: 'Eğitim',
                    status: 'processing',
                    statusText: 'İşleniyor',
                    applicationDate: '13 Haziran 2025',
                    estimatedDate: '28 Haziran 2025',
                    fee: '£95',
                    notes: 'Başvurunuz konsolosluk tarafından değerlendiriliyor.'
                }
            };
            
            const application = mockApplications[applicationNumber];
            
            if (application) {
                // Show result
                showApplicationResult(application, applicationNumber);
                resultContainer.style.display = 'block';
                resultContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show no result
                noResult.style.display = 'block';
                noResult.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        function showApplicationResult(app, number) {
            document.getElementById('applicationNumberResult').textContent = number;
            document.getElementById('countryResult').textContent = app.country + ' - ' + app.purpose;
            document.getElementById('applicantName').textContent = app.applicantName;
            document.getElementById('applicantEmail').textContent = app.email;
            document.getElementById('applicantPhone').textContent = app.phone;
            document.getElementById('applicationDate').textContent = app.applicationDate;
            document.getElementById('estimatedDate').textContent = app.estimatedDate;
            document.getElementById('feeAmount').textContent = app.fee;
            
            // Status badge
            const statusBadge = document.getElementById('statusBadge');
            statusBadge.textContent = app.statusText;
            statusBadge.className = `status-badge status-${app.status}`;
            
            // Notes
            if (app.notes) {
                document.getElementById('applicationNotes').textContent = app.notes;
                document.getElementById('notesSection').style.display = 'block';
            }
            
            // Update timeline
            updateTimeline(app.status);
        }
        
        function updateTimeline(status) {
            const steps = ['processingStep', 'approvalStep', 'completedStep'];
            
            // Reset all steps
            steps.forEach(stepId => {
                const step = document.getElementById(stepId);
                step.classList.remove('active');
                step.classList.add('pending');
            });
            
            // Activate steps based on status
            if (status === 'processing' || status === 'approved' || status === 'completed') {
                document.getElementById('processingStep').classList.add('active');
                document.getElementById('processingStep').classList.remove('pending');
            }
            
            if (status === 'approved' || status === 'completed') {
                document.getElementById('approvalStep').classList.add('active');
                document.getElementById('approvalStep').classList.remove('pending');
            }
            
            if (status === 'completed') {
                document.getElementById('completedStep').classList.add('active');
                document.getElementById('completedStep').classList.remove('pending');
            }
        }
        
        // Auto-format application number input
        document.getElementById('applicationNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9VK-]/g, '');
            
            if (!value.startsWith('VK-')) {
                value = 'VK-' + value.replace('VK-', '');
            }
            
            // Format: VK-YYYY-XXX
            if (value.length > 3) {
                const parts = value.substring(3);
                if (parts.length <= 4) {
                    value = 'VK-' + parts;
                } else {
                    value = 'VK-' + parts.substring(0, 4) + '-' + parts.substring(4, 7);
                }
            }
            
            e.target.value = value.toUpperCase();
        });
    </script>
</body>
</html>