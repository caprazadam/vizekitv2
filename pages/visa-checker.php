<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vize Kontrol - VizeKit</title>
    <meta name="description" content="Türk vatandaşları için 150+ ülke vize gereksinimlerini kontrol edin. Güncel vize bilgileri ve başvuru süreçleri.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-purple: #6f42c1;
            --secondary-purple: #8e44ad;
            --neon-green: #00ff88;
            --neon-blue: #00d4ff;
            --dark-bg: #1a1a2e;
            --card-bg: #16213e;
            --glass-bg: rgba(255, 255, 255, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, var(--dark-bg) 0%, var(--card-bg) 100%);
            color: white;
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
        }

        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(135deg, var(--dark-bg) 0%, var(--card-bg) 100%);
        }

        .animated-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(111, 66, 193, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0, 212, 255, 0.2) 0%, transparent 50%);
            animation: pulse 4s ease-in-out infinite alternate;
        }

        @keyframes pulse {
            0% { opacity: 0.3; }
            100% { opacity: 0.7; }
        }

        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            transition: all 0.3s ease;
            padding: 2rem;
        }

        .glass-card:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
        }

        .navbar-custom {
            background: rgba(26, 26, 46, 0.9);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 0;
        }

        .navbar-brand {
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(45deg, var(--primary-purple), var(--neon-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-decoration: none;
        }

        .nav-link {
            color: white !important;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-link:hover, .nav-link.active {
            color: var(--neon-green) !important;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--neon-green);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }

        .nav-link:hover::after, .nav-link.active::after {
            width: 100%;
        }

        .page-header {
            padding: 150px 0 80px;
            text-align: center;
        }

        .page-title {
            font-size: 3rem;
            font-weight: bold;
            background: linear-gradient(45deg, white, var(--neon-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }

        .page-subtitle {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 2rem;
        }

        .form-control {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            color: white;
            padding: 12px 15px;
        }

        .form-control:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 136, 0.25);
            color: white;
        }

        .form-control::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }

        .form-select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            color: white;
            padding: 12px 15px;
        }

        .form-select:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 136, 0.25);
            color: white;
        }

        .form-select option {
            background: var(--card-bg);
            color: white;
        }

        .btn-neon {
            background: linear-gradient(45deg, var(--primary-purple), var(--secondary-purple));
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            margin: 0.5rem;
            position: relative;
            overflow: hidden;
        }

        .btn-neon:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(111, 66, 193, 0.4);
            color: white;
        }

        .btn-neon::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.5s ease;
        }

        .btn-neon:hover::before {
            left: 100%;
        }

        .visa-result {
            margin-top: 2rem;
            padding: 2rem;
            border-radius: 15px;
        }

        .visa-required {
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 165, 0, 0.2));
            border: 1px solid rgba(255, 107, 107, 0.5);
        }

        .visa-free {
            background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 212, 255, 0.2));
            border: 1px solid rgba(0, 255, 136, 0.5);
        }

        .result-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .navbar-toggler {
            border: 1px solid rgba(255,255,255,0.3);
        }

        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        @media (max-width: 768px) {
            .page-title {
                font-size: 2rem;
            }
            
            .page-subtitle {
                font-size: 1rem;
            }
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
                        <a class="nav-link active" href="/visa-checker">Vize Kontrol</a>
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
                        <a class="nav-link" href="/application-status">Başvuru Sorgula</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1 class="page-title">Vize Kontrol Sistemi</h1>
            <p class="page-subtitle">Gideceğiniz ülke için vize gereksinimlerini kontrol edin</p>
        </div>
    </section>

    <!-- Visa Checker Form -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="glass-card">
                        <form id="visaForm" class="row g-4">
                            <div class="col-md-6">
                                <label class="form-label">
                                    <i class="fas fa-flag me-2"></i>Vatandaşlık
                                </label>
                                <select name="from_country" class="form-select">
                                    <option value="TR">🇹🇷 Türkiye</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">
                                    <i class="fas fa-globe me-2"></i>Gidilecek Ülke
                                </label>
                                <select name="to_country" class="form-select" required>
                                    <option value="">Ülke seçin...</option>
                                    <?php foreach($countries as $country): ?>
                                    <option value="<?php echo $country['code']; ?>">
                                        <?php echo $country['flag'] . ' ' . $country['name']; ?>
                                    </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label">
                                    <i class="fas fa-suitcase me-2"></i>Seyahat Amacı
                                </label>
                                <select name="purpose" class="form-select">
                                    <option value="tourism">Turizm</option>
                                    <option value="business">İş</option>
                                    <option value="education">Eğitim</option>
                                    <option value="medical">Sağlık</option>
                                    <option value="transit">Transit</option>
                                    <option value="family">Aile Ziyareti</option>
                                </select>
                            </div>
                            <div class="col-12 text-center">
                                <button type="submit" class="btn-neon">
                                    <i class="fas fa-search me-2"></i>Vize Bilgilerini Kontrol Et
                                </button>
                            </div>
                        </form>

                        <!-- Result Area -->
                        <div id="visaResult" style="display: none;" class="visa-result text-center">
                            <div class="result-icon" id="resultIcon"></div>
                            <h3 id="resultTitle"></h3>
                            <p id="resultDescription"></p>
                            <div id="resultDetails" class="mt-4"></div>
                            <div class="mt-4">
                                <a href="/services" class="btn-neon">
                                    <i class="fas fa-concierge-bell me-2"></i>Profesyonel Destek Al
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Info Cards -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <i class="fas fa-clock mb-3" style="font-size: 2rem; color: var(--neon-green);"></i>
                        <h5>Hızlı Kontrol</h5>
                        <p>Saniyeler içinde güncel vize bilgilerine ulaşın</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <i class="fas fa-database mb-3" style="font-size: 2rem; color: var(--neon-blue);"></i>
                        <h5>Güncel Veriler</h5>
                        <p>150+ ülke için sürekli güncellenen vize bilgileri</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <i class="fas fa-users mb-3" style="font-size: 2rem; color: var(--primary-purple);"></i>
                        <h5>Uzman Desteği</h5>
                        <p>Karmaşık durumlar için profesyonel danışmanlık</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('visaForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const toCountry = formData.get('to_country');
            const purpose = formData.get('purpose');
            
            if (!toCountry) {
                alert('Lütfen gidilecek ülkeyi seçin.');
                return;
            }
            
            // Mock data for demonstration
            const visaInfo = {
                'US': {
                    required: true,
                    fee: '$160',
                    time: '10-15 gün',
                    description: 'Amerika Birleşik Devletleri için vize gereklidir.',
                    documents: ['Pasaport', 'Fotoğraf', 'Mali belge', 'Seyahat sigortası']
                },
                'DE': {
                    required: false,
                    description: 'Almanya için vize gerekmemektedir. 90 gün vizesiz kalabilirsiniz.',
                    documents: ['Geçerli pasaport']
                },
                'GB': {
                    required: true,
                    fee: '£95',
                    time: '15-20 gün',
                    description: 'İngiltere için vize gereklidir.',
                    documents: ['Pasaport', 'Fotoğraf', 'Mali belge', 'Konuklama belgesi']
                }
            };
            
            const info = visaInfo[toCountry] || {
                required: true,
                description: 'Bu ülke için vize gereksinimi hakkında detaylı bilgi almak için uzmanlarımızla iletişime geçin.'
            };
            
            showResult(info);
        });
        
        function showResult(info) {
            const resultDiv = document.getElementById('visaResult');
            const icon = document.getElementById('resultIcon');
            const title = document.getElementById('resultTitle');
            const description = document.getElementById('resultDescription');
            const details = document.getElementById('resultDetails');
            
            if (info.required) {
                resultDiv.className = 'visa-result text-center visa-required';
                icon.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i>';
                title.textContent = 'Vize Gereklidir';
            } else {
                resultDiv.className = 'visa-result text-center visa-free';
                icon.innerHTML = '<i class="fas fa-check-circle" style="color: var(--neon-green);"></i>';
                title.textContent = 'Vize Gerekmez';
            }
            
            description.textContent = info.description;
            
            let detailsHTML = '';
            if (info.fee) {
                detailsHTML += `<div class="row"><div class="col-md-6"><strong>Vize Ücreti:</strong> ${info.fee}</div>`;
            }
            if (info.time) {
                detailsHTML += `<div class="col-md-6"><strong>İşlem Süresi:</strong> ${info.time}</div></div>`;
            }
            if (info.documents) {
                detailsHTML += `<div class="mt-3"><strong>Gerekli Belgeler:</strong><ul class="list-unstyled mt-2">`;
                info.documents.forEach(doc => {
                    detailsHTML += `<li><i class="fas fa-check me-2" style="color: var(--neon-green);"></i>${doc}</li>`;
                });
                detailsHTML += '</ul></div>';
            }
            
            details.innerHTML = detailsHTML;
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
    </script>
</body>
</html>