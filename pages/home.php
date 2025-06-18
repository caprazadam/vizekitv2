<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VizeKit - Türk Vatandaşları için Vize Hizmetleri</title>
    <meta name="description" content="Türk vatandaşları için hızlı ve güvenilir vize hizmetleri. Vize kontrol, başvuru ve danışmanlık hizmetleri.">
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

        /* Animated Background */
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

        /* Glass Morphism Effects */
        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            transition: all 0.3s ease;
            padding: 2rem;
        }

        .glass-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
        }

        /* Navigation */
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

        .nav-link:hover {
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

        .nav-link:hover::after {
            width: 100%;
        }

        /* Hero Section */
        .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            padding-top: 120px;
        }

        .hero-title {
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(45deg, white, var(--neon-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
            font-size: 1.3rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 3rem;
            animation: fadeInUp 1s ease-out 0.2s both;
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

        .btn-outline-neon {
            background: transparent;
            color: var(--neon-green);
            border: 2px solid var(--neon-green);
            padding: 13px 28px;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            margin: 0.5rem;
        }

        .btn-outline-neon:hover {
            background: var(--neon-green);
            color: var(--dark-bg);
            box-shadow: 0 0 30px var(--neon-green);
        }

        /* Features Section */
        .features-section {
            padding: 5rem 0;
        }

        .feature-icon {
            font-size: 3rem;
            background: linear-gradient(45deg, var(--primary-purple), var(--neon-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.5rem;
        }

        .section-title {
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 3rem;
            background: linear-gradient(45deg, white, var(--neon-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Floating Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .floating {
            animation: float 6s ease-in-out infinite;
        }

        /* Statistics Section */
        .stats-section {
            padding: 5rem 0;
            background: rgba(0, 0, 0, 0.3);
        }

        .stat-number {
            font-size: 3rem;
            font-weight: bold;
            color: var(--neon-green);
        }

        /* Footer */
        .footer-custom {
            background: rgba(0, 0, 0, 0.5);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 3rem 0 2rem;
        }

        .social-icon {
            color: white;
            font-size: 1.5rem;
            margin: 0 10px;
            transition: all 0.3s ease;
        }

        .social-icon:hover {
            color: var(--neon-green);
            transform: translateY(-3px);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
            }
            
            .section-title {
                font-size: 2rem;
            }
        }

        .navbar-toggler {
            border: 1px solid rgba(255,255,255,0.3);
        }

        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
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
                        <a class="nav-link" href="/application-status">Başvuru Sorgula</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="hero-title">
                        Türk Vatandaşları için<br>
                        <span style="background: linear-gradient(45deg, var(--neon-green), var(--neon-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Vize Hizmetleri</span>
                    </h1>
                    <p class="hero-subtitle">
                        150+ ülke için vize gereksinimleri, başvuru süreci ve uzman danışmanlık hizmetleri. 
                        Seyahat planlarınızı güvenle yapın.
                    </p>
                    <div class="hero-buttons">
                        <a href="/visa-checker" class="btn-neon">
                            <i class="fas fa-search me-2"></i>Vize Kontrol Et
                        </a>
                        <a href="/services" class="btn-outline-neon">
                            <i class="fas fa-concierge-bell me-2"></i>Hizmetlerimiz
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <div class="floating">
                        <i class="fas fa-globe-americas" style="font-size: 15rem; color: rgba(255,255,255,0.1);"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="container">
            <h2 class="section-title">Neden VizeKit?</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <div class="feature-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <h3 class="mb-3">Hızlı Vize Kontrol</h3>
                        <p>150+ ülke için güncel vize gereksinimleri ve süreçleri hakkında anında bilgi alın.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <div class="feature-icon">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <h3 class="mb-3">Uzman Danışmanlık</h3>
                        <p>Deneyimli vize uzmanlarımızdan başvuru sürecinde profesyonel destek alın.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="glass-card text-center">
                        <div class="feature-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3 class="mb-3">Güvenli İşlem</h3>
                        <p>Belgeleriniz 256-bit SSL şifrelemesi ile korunur ve güvenli şekilde işlenir.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3 mb-4">
                    <div class="stat-number">150+</div>
                    <h4>Ülke Desteği</h4>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="stat-number">5000+</div>
                    <h4>Başarılı Başvuru</h4>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="stat-number">%98</div>
                    <h4>Başarı Oranı</h4>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="stat-number">24/7</div>
                    <h4>Destek Hizmeti</h4>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Preview -->
    <section class="features-section">
        <div class="container">
            <h2 class="section-title">Hizmetlerimiz</h2>
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="glass-card">
                        <h4 class="mb-3">
                            <i class="fas fa-comments me-2" style="color: var(--neon-green);"></i>
                            Vize Danışmanlığı
                        </h4>
                        <p class="mb-3">Herhangi bir ülke için vize başvuru sürecinde uzman danışmanlık hizmeti</p>
                        <span class="badge" style="background: var(--neon-green); color: var(--dark-bg); font-size: 1rem;">₺299</span>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="glass-card">
                        <h4 class="mb-3">
                            <i class="fas fa-bolt me-2" style="color: var(--neon-blue);"></i>
                            Hızlı Vize İşleme
                        </h4>
                        <p class="mb-3">Acil vize ihtiyaçlarınız için hızlandırılmış işlem süreci</p>
                        <span class="badge" style="background: var(--neon-blue); color: var(--dark-bg); font-size: 1rem;">₺599</span>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <a href="/services" class="btn-neon">
                    <i class="fas fa-arrow-right me-2"></i>Tüm Hizmetleri Gör
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-custom">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <h5 class="mb-3">VizeKit</h5>
                    <p>Türk vatandaşları için güvenilir vize hizmetleri. Seyahat hayallerinizi gerçeğe dönüştürün.</p>
                </div>
                <div class="col-md-4 mb-4">
                    <h5 class="mb-3">Hızlı Linkler</h5>
                    <ul class="list-unstyled">
                        <li><a href="/visa-checker" class="text-light">Vize Kontrol</a></li>
                        <li><a href="/countries" class="text-light">Ülkeler</a></li>
                        <li><a href="/services" class="text-light">Hizmetler</a></li>
                        <li><a href="/contact" class="text-light">İletişim</a></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-4">
                    <h5 class="mb-3">İletişim</h5>
                    <p><i class="fas fa-phone me-2"></i> +90 850 346 66 46</p>
                    <p><i class="fas fa-envelope me-2"></i> info@vizekit.com</p>
                    <p><i class="fas fa-map-marker-alt me-2"></i> Kahramanmaraş</p>
                </div>
            </div>
            <hr style="border-color: rgba(255,255,255,0.1);">
            <div class="row">
                <div class="col-md-6">
                    <p>&copy; 2025 VizeKit. Tüm hakları saklıdır.</p>
                </div>
                <div class="col-md-6 text-end">
                    <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>