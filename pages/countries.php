<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ülkeler - VizeKit</title>
    <meta name="description" content="150+ ülke için güncel vize bilgileri ve gereksinimleri. Türk vatandaşları için detaylı ülke rehberi.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/css/vizekit-theme.css" rel="stylesheet">
    <style>
        .country-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            transition: all 0.3s ease;
            padding: 1.5rem;
            margin-bottom: 1rem;
        }

        .country-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 15px 30px rgba(0, 255, 136, 0.2);
        }

        .country-flag {
            font-size: 2rem;
            margin-right: 1rem;
        }

        .visa-status {
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .visa-free {
            background: linear-gradient(45deg, var(--neon-green), rgba(0, 255, 136, 0.3));
            color: var(--dark-bg);
        }

        .visa-required {
            background: linear-gradient(45deg, #ff6b6b, rgba(255, 107, 107, 0.3));
            color: white;
        }

        .visa-evisa {
            background: linear-gradient(45deg, var(--neon-blue), rgba(0, 212, 255, 0.3));
            color: var(--dark-bg);
        }

        .search-box {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            color: white;
            padding: 12px 20px;
            width: 100%;
            margin-bottom: 2rem;
        }

        .search-box:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 136, 0.25);
            color: white;
            outline: none;
        }

        .search-box::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }

        .filter-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            margin: 0.2rem;
            transition: all 0.3s ease;
        }

        .filter-btn:hover, .filter-btn.active {
            background: var(--neon-green);
            color: var(--dark-bg);
            border-color: var(--neon-green);
        }

        .page-header {
            padding: 150px 0 80px;
            text-align: center;
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
                        <a class="nav-link active" href="/countries">Ülkeler</a>
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
            <h1 class="page-title">Ülke Rehberi</h1>
            <p class="hero-subtitle">150+ ülke için güncel vize bilgileri ve gereksinimleri</p>
        </div>
    </section>

    <!-- Countries Content -->
    <section class="py-5">
        <div class="container">
            <!-- Search and Filter -->
            <div class="row mb-4">
                <div class="col-lg-8">
                    <input type="text" class="search-box" placeholder="Ülke ara..." id="countrySearch">
                </div>
                <div class="col-lg-4">
                    <div class="text-end">
                        <button class="filter-btn active" data-filter="all">Tümü</button>
                        <button class="filter-btn" data-filter="visa-free">Vizesiz</button>
                        <button class="filter-btn" data-filter="visa-required">Vize Gerekli</button>
                        <button class="filter-btn" data-filter="evisa">E-Vize</button>
                    </div>
                </div>
            </div>

            <!-- Countries Grid -->
            <div class="row" id="countriesContainer">
                <!-- Europe -->
                <div class="col-12 mb-3">
                    <h3 style="color: var(--neon-blue);">
                        <i class="fas fa-map-marker-alt me-2"></i>Avrupa
                    </h3>
                </div>
                
                <div class="col-md-6 country-item" data-category="visa-free">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇩🇪</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Almanya</h5>
                                <p class="mb-2 text-muted">90 gün vizesiz kalış</p>
                                <span class="visa-status visa-free">Vizesiz</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-free">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇫🇷</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Fransa</h5>
                                <p class="mb-2 text-muted">90 gün vizesiz kalış</p>
                                <span class="visa-status visa-free">Vizesiz</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-required">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇬🇧</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">İngiltere</h5>
                                <p class="mb-2 text-muted">Vize gerekli - £95</p>
                                <span class="visa-status visa-required">Vize Gerekli</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-free">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇪🇸</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">İspanya</h5>
                                <p class="mb-2 text-muted">90 gün vizesiz kalış</p>
                                <span class="visa-status visa-free">Vizesiz</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Americas -->
                <div class="col-12 mb-3 mt-4">
                    <h3 style="color: var(--neon-blue);">
                        <i class="fas fa-map-marker-alt me-2"></i>Amerika
                    </h3>
                </div>

                <div class="col-md-6 country-item" data-category="visa-required">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇺🇸</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Amerika Birleşik Devletleri</h5>
                                <p class="mb-2 text-muted">Vize gerekli - $160</p>
                                <span class="visa-status visa-required">Vize Gerekli</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-required">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇨🇦</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Kanada</h5>
                                <p class="mb-2 text-muted">Vize gerekli - CAD $100</p>
                                <span class="visa-status visa-required">Vize Gerekli</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Asia -->
                <div class="col-12 mb-3 mt-4">
                    <h3 style="color: var(--neon-blue);">
                        <i class="fas fa-map-marker-alt me-2"></i>Asya
                    </h3>
                </div>

                <div class="col-md-6 country-item" data-category="evisa">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇨🇳</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Çin</h5>
                                <p class="mb-2 text-muted">E-Vize mevcut - $30</p>
                                <span class="visa-status visa-evisa">E-Vize</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="evisa">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇮🇳</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Hindistan</h5>
                                <p class="mb-2 text-muted">E-Vize mevcut - $25</p>
                                <span class="visa-status visa-evisa">E-Vize</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-free">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇯🇵</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Japonya</h5>
                                <p class="mb-2 text-muted">90 gün vizesiz kalış</p>
                                <span class="visa-status visa-free">Vizesiz</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-free">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇰🇷</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Güney Kore</h5>
                                <p class="mb-2 text-muted">90 gün vizesiz kalış</p>
                                <span class="visa-status visa-free">Vizesiz</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Oceania -->
                <div class="col-12 mb-3 mt-4">
                    <h3 style="color: var(--neon-blue);">
                        <i class="fas fa-map-marker-alt me-2"></i>Okyanusya
                    </h3>
                </div>

                <div class="col-md-6 country-item" data-category="visa-required">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇦🇺</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Avustralya</h5>
                                <p class="mb-2 text-muted">Vize gerekli - AUD $145</p>
                                <span class="visa-status visa-required">Vize Gerekli</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 country-item" data-category="visa-required">
                    <div class="country-card">
                        <div class="d-flex align-items-center">
                            <div class="country-flag">🇳🇿</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Yeni Zelanda</h5>
                                <p class="mb-2 text-muted">Vize gerekli - NZD $208</p>
                                <span class="visa-status visa-required">Vize Gerekli</span>
                            </div>
                            <div>
                                <a href="/visa-checker" class="btn btn-sm btn-outline-light">Detay</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="text-center mt-5">
                <div class="glass-card">
                    <h4 class="mb-3">Aradığınız ülkeyi bulamadınız mı?</h4>
                    <p class="mb-4">150+ ülke için detaylı vize bilgilerine ulaşmak için vize kontrol sistemimizi kullanın.</p>
                    <a href="/visa-checker" class="btn-neon">
                        <i class="fas fa-search me-2"></i>Vize Kontrol Et
                    </a>
                    <a href="/contact" class="btn-outline-neon">
                        <i class="fas fa-envelope me-2"></i>Uzman Danışmanlık
                    </a>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Search functionality
        document.getElementById('countrySearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const countryItems = document.querySelectorAll('.country-item');
            
            countryItems.forEach(item => {
                const countryName = item.querySelector('h5').textContent.toLowerCase();
                if (countryName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const countryItems = document.querySelectorAll('.country-item');
                
                countryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>