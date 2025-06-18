<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hizmetlerimiz - VizeKit</title>
    <meta name="description" content="Vize danışmanlığı, hızlı işlem, belge çeviri ve form doldurma hizmetleri. Profesyonel vize destek hizmetleri.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/css/vizekit-theme.css" rel="stylesheet">
    <style>
        .service-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            transition: all 0.3s ease;
            padding: 2.5rem;
            height: 100%;
            position: relative;
            overflow: hidden;
        }

        .service-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
        }

        .service-card::before {
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

        .service-card:hover::before {
            opacity: 1;
        }

        .service-icon {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            background: linear-gradient(45deg, var(--primary-purple), var(--secondary-purple));
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
            background: linear-gradient(45deg, var(--neon-green), var(--neon-blue));
            transform: rotateY(180deg);
        }

        .service-icon i {
            font-size: 2rem;
            color: white;
        }

        .service-price {
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(45deg, var(--neon-green), var(--neon-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }

        .service-features {
            list-style: none;
            padding: 0;
            margin-bottom: 2rem;
        }

        .service-features li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.5rem;
        }

        .service-features li::before {
            content: '\f00c';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            position: absolute;
            left: 0;
            color: var(--neon-green);
        }

        .page-header {
            padding: 150px 0 80px;
            text-align: center;
        }

        .pricing-toggle {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            padding: 0.5rem;
            margin-bottom: 3rem;
            display: inline-flex;
        }

        .pricing-toggle button {
            background: transparent;
            border: none;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            transition: all 0.3s ease;
        }

        .pricing-toggle button.active {
            background: var(--neon-green);
            color: var(--dark-bg);
        }

        .popular-badge {
            position: absolute;
            top: -10px;
            right: 20px;
            background: linear-gradient(45deg, var(--neon-green), var(--neon-blue));
            color: var(--dark-bg);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
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
                        <a class="nav-link active" href="/services">Hizmetler</a>
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
            <h1 class="page-title">Hizmetlerimiz</h1>
            <p class="hero-subtitle">Profesyonel vize hizmetleri ile seyahat hayallerinizi gerçeğe dönüştürün</p>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-5">
        <div class="container">
            <!-- Pricing Toggle -->
            <div class="text-center mb-5">
                <div class="pricing-toggle">
                    <button class="active" data-type="individual">Bireysel</button>
                    <button data-type="corporate">Kurumsal</button>
                </div>
            </div>

            <!-- Services Grid -->
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <h4 class="mb-3">Vize Danışmanlığı</h4>
                        <div class="service-price">₺299</div>
                        <p class="mb-4">Herhangi bir ülke için vize başvuru sürecinde uzman danışmanlık hizmeti</p>
                        <ul class="service-features">
                            <li>Kişisel danışmanlık</li>
                            <li>Belge kontrolü</li>
                            <li>Form doldurma desteği</li>
                            <li>Süreç takibi</li>
                        </ul>
                        <a href="/contact" class="btn-neon w-100">Hizmet Al</a>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service-card">
                        <div class="popular-badge">Popüler</div>
                        <div class="service-icon">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <h4 class="mb-3">Hızlı Vize İşleme</h4>
                        <div class="service-price">₺599</div>
                        <p class="mb-4">Acil vize ihtiyaçlarınız için hızlandırılmış işlem süreci</p>
                        <ul class="service-features">
                            <li>Öncelikli işlem</li>
                            <li>24/7 destek</li>
                            <li>Hızlı sonuçlandırma</li>
                            <li>Express teslimat</li>
                        </ul>
                        <a href="/contact" class="btn-neon w-100">Hizmet Al</a>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-language"></i>
                        </div>
                        <h4 class="mb-3">Belge Çeviri</h4>
                        <div class="service-price">₺150</div>
                        <p class="mb-4">Vize başvurusu için gerekli belgelerin profesyonel çevirisi</p>
                        <ul class="service-features">
                            <li>Yeminli çeviri</li>
                            <li>Apostil işlemi</li>
                            <li>Express teslimat</li>
                            <li>Kalite garantisi</li>
                        </ul>
                        <a href="/contact" class="btn-neon w-100">Hizmet Al</a>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-edit"></i>
                        </div>
                        <h4 class="mb-3">Vize Formu Doldurma</h4>
                        <div class="service-price">₺199</div>
                        <p class="mb-4">Karmaşık vize formlarının uzmanlar tarafından doldurulması</p>
                        <ul class="service-features">
                            <li>Hatasız form</li>
                            <li>Kontrol edilen bilgiler</li>
                            <li>Revizyon dahil</li>
                            <li>Online teslimat</li>
                        </ul>
                        <a href="/contact" class="btn-neon w-100">Hizmet Al</a>
                    </div>
                </div>
            </div>

            <!-- Premium Services -->
            <div class="row mt-5">
                <div class="col-12 mb-4">
                    <h2 class="section-title">Premium Hizmetler</h2>
                </div>

                <div class="col-lg-6 mb-4">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-crown"></i>
                        </div>
                        <h4 class="mb-3">VIP Vize Paketi</h4>
                        <div class="service-price">₺1,499</div>
                        <p class="mb-4">Baştan sona tüm vize sürecinizin profesyoneller tarafından yönetilmesi</p>
                        <ul class="service-features">
                            <li>Kişisel vize uzmanı</li>
                            <li>Tüm belgeler dahil</li>
                            <li>Randevu alımı</li>
                            <li>Süreç takibi</li>
                            <li>Garanti hizmeti</li>
                        </ul>
                        <a href="/contact" class="btn-neon w-100">Hizmet Al</a>
                    </div>
                </div>

                <div class="col-lg-6 mb-4">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <h4 class="mb-3">Kurumsal Vize Hizmetleri</h4>
                        <div class="service-price">Özel Fiyat</div>
                        <p class="mb-4">Şirketler ve kurumlar için toplu vize başvuru hizmetleri</p>
                        <ul class="service-features">
                            <li>Toplu başvuru</li>
                            <li>Özel fiyatlandırma</li>
                            <li>Kurumsal destek</li>
                            <li>Raporlama</li>
                            <li>Öncelikli hizmet</li>
                        </ul>
                        <a href="/contact" class="btn-neon w-100">Teklif Al</a>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="row mt-5">
                <div class="col-12 mb-4">
                    <h2 class="section-title">Sık Sorulan Sorular</h2>
                </div>
                <div class="col-lg-8 mx-auto">
                    <div class="accordion" id="faqAccordion">
                        <div class="glass-card mb-3">
                            <div class="accordion-header">
                                <button class="btn btn-link text-white w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    <i class="fas fa-question-circle me-2"></i>Vize başvuru süreci ne kadar sürer?
                                </button>
                            </div>
                            <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="mt-3">
                                    <p>Vize başvuru süresi ülkeye ve vize türüne göre değişiklik gösterir. Genellikle 5-15 iş günü arasında sonuçlanır.</p>
                                </div>
                            </div>
                        </div>

                        <div class="glass-card mb-3">
                            <div class="accordion-header">
                                <button class="btn btn-link text-white w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    <i class="fas fa-question-circle me-2"></i>Vize red durumunda ücret iade edilir mi?
                                </button>
                            </div>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="mt-3">
                                    <p>Vize reddedilmesi durumunda hizmet bedelinin %50'si iade edilir. Başvuru ücretleri iade edilmez.</p>
                                </div>
                            </div>
                        </div>

                        <div class="glass-card mb-3">
                            <div class="accordion-header">
                                <button class="btn btn-link text-white w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    <i class="fas fa-question-circle me-2"></i>Hangi ödeme yöntemlerini kabul ediyorsunuz?
                                </button>
                            </div>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="mt-3">
                                    <p>Kredi kartı, banka havalesi, EFT ve nakit ödeme seçeneklerini kabul ediyoruz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="text-center mt-5">
                <div class="glass-card">
                    <h3 class="mb-3">Hizmetlerimiz Hakkında Daha Fazla Bilgi</h3>
                    <p class="mb-4">Vize sürecinizde profesyonel destek almak için uzmanlarımızla iletişime geçin.</p>
                    <a href="/contact" class="btn-neon me-3">
                        <i class="fas fa-envelope me-2"></i>İletişime Geç
                    </a>
                    <a href="/visa-checker" class="btn-outline-neon">
                        <i class="fas fa-search me-2"></i>Vize Kontrol Et
                    </a>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Pricing toggle
        document.querySelectorAll('.pricing-toggle button').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.pricing-toggle button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update prices based on selection
                const type = this.getAttribute('data-type');
                // Add pricing logic here if needed
            });
        });
    </script>
</body>
</html>