<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/functions.php';

$countries = getCountries();
$services = getServices();
$popularCountries = array_slice($countries, 0, 8);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VizeKit - Türk Vatandaşları İçin Vize Hizmetleri</title>
    <meta name="description" content="Türk pasaport sahipleri için güvenilir vize danışmanlığı ve başvuru hizmetleri. Vize gereksinimlerini kontrol edin, başvuru yapın.">
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <?php include 'includes/navbar.php'; ?>

    <!-- Hero Section -->
    <section class="hero-section bg-gradient-purple text-white py-5">
        <div class="container">
            <div class="row align-items-center min-vh-75">
                <div class="col-lg-6">
                    <div class="hero-content">
                        <h1 class="display-4 fw-bold mb-4 fade-in">
                            Türk Vatandaşları İçin 
                            <span class="text-light">Vize Hizmetleri</span>
                        </h1>
                        <p class="lead mb-4 opacity-90">
                            Dünya çapında 190+ ülke için güvenilir vize danışmanlığı ve başvuru hizmetleri. 
                            Uzman ekibimizle seyahat hayallerinizi gerçeğe dönüştürün.
                        </p>
                        <div class="hero-stats d-flex gap-4 mb-4">
                            <div class="stat-item">
                                <div class="stat-number">190+</div>
                                <div class="stat-label">Ülke</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">10K+</div>
                                <div class="stat-label">Mutlu Müşteri</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">98%</div>
                                <div class="stat-label">Başarı Oranı</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="hero-form-container">
                        <form id="heroForm" class="hero-form bg-white text-dark p-4 rounded-4 shadow-lg">
                            <h3 class="h4 mb-4 text-center text-gradient fw-bold">Vize Gereksinimini Kontrol Et</h3>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Vatandaşlığınız</label>
                                <select class="form-select" name="fromCountry" required>
                                    <option value="TR" selected>Türkiye 🇹🇷</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Hedef Ülke</label>
                                <select class="form-select" name="toCountry" required>
                                    <option value="">Ülke seçin...</option>
                                    <?php foreach($countries as $country): ?>
                                        <option value="<?= $country['code'] ?>"><?= $country['name'] ?> <?= $country['flag'] ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            
                            <div class="mb-4">
                                <label class="form-label fw-semibold">Seyahat Amacı</label>
                                <select class="form-select" name="purpose" required>
                                    <option value="">Amaç seçin...</option>
                                    <option value="turizm">Turizm</option>
                                    <option value="is">İş</option>
                                    <option value="egitim">Eğitim</option>
                                    <option value="transit">Transit</option>
                                    <option value="diger">Diğer</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="btn btn-gradient w-100 py-3 fw-semibold">
                                <i class="fas fa-search me-2"></i>
                                Vize Gereksinimini Kontrol Et
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Popular Countries Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="h2 fw-bold text-gradient mb-3">Popüler Destinasyonlar</h2>
                <p class="lead text-muted">En çok tercih edilen ülkeler için vize bilgilerine hızlı erişim</p>
            </div>
            <div class="row g-4">
                <?php foreach($popularCountries as $country): ?>
                    <div class="col-lg-3 col-md-6">
                        <div class="country-card card h-100 border-0 shadow-sm hover-lift">
                            <div class="card-body text-center p-4">
                                <div class="country-flag mb-3">
                                    <span class="flag-emoji"><?= $country['flag'] ?></span>
                                </div>
                                <h5 class="card-title fw-bold"><?= $country['name'] ?></h5>
                                <p class="card-text text-muted small mb-3"><?= $country['region'] ?? 'Bölge bilgisi' ?></p>
                                <a href="country.php?code=<?= $country['code'] ?>" class="btn btn-outline-purple btn-sm">
                                    Detay Görüntüle
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="text-center mt-5">
                <a href="countries.php" class="btn btn-gradient px-4 py-2">
                    Tüm Ülkeleri Görüntüle
                    <i class="fas fa-arrow-right ms-2"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-5">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="h2 fw-bold text-gradient mb-3">Hizmetlerimiz</h2>
                <p class="lead text-muted">Vize sürecinizin her aşamasında yanınızdayız</p>
            </div>
            <div class="row g-4">
                <?php foreach($services as $service): ?>
                    <div class="col-lg-4 col-md-6">
                        <div class="service-card card h-100 border-0 shadow-sm hover-lift">
                            <div class="card-body p-4">
                                <div class="service-icon mb-3">
                                    <i class="fas fa-<?= getServiceIcon($service['icon']) ?> text-gradient fs-2"></i>
                                </div>
                                <h5 class="card-title fw-bold"><?= $service['name'] ?></h5>
                                <p class="card-text text-muted"><?= $service['description'] ?></p>
                                <ul class="list-unstyled">
                                    <?php 
                                    $features = json_decode($service['features'], true);
                                    foreach($features as $feature): 
                                    ?>
                                        <li class="mb-1">
                                            <i class="fas fa-check text-success me-2"></i>
                                            <small><?= $feature ?></small>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="text-center mt-5">
                <a href="services.php" class="btn btn-gradient px-4 py-2">
                    Tüm Hizmetleri Görüntüle
                    <i class="fas fa-arrow-right ms-2"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Consultation Form Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="consultation-form bg-white p-5 rounded-4 shadow">
                        <div class="text-center mb-4">
                            <h3 class="h3 fw-bold text-gradient mb-3">Ücretsiz Danışmanlık Talep Et</h3>
                            <p class="text-muted">Uzman ekibimiz size en uygun vize çözümünü sunacak</p>
                        </div>
                        
                        <form id="consultationForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Ad</label>
                                    <input type="text" class="form-control" name="firstName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Soyad</label>
                                    <input type="text" class="form-control" name="lastName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">E-posta</label>
                                    <input type="email" class="form-control" name="email" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Telefon</label>
                                    <input type="tel" class="form-control" name="phone" required>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold">Hedef Ülke</label>
                                    <select class="form-select" name="destinationCountry" required>
                                        <option value="">Ülke seçin...</option>
                                        <?php foreach($countries as $country): ?>
                                            <option value="<?= $country['code'] ?>"><?= $country['name'] ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold">Mesajınız</label>
                                    <textarea class="form-control" name="message" rows="4" placeholder="Vize ile ilgili sorularınızı belirtin..."></textarea>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-gradient px-5 py-3 fw-semibold">
                                        <i class="fas fa-paper-plane me-2"></i>
                                        Danışmanlık Talep Et
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Info Section -->
    <section class="py-5 bg-gradient-purple text-white">
        <div class="container">
            <div class="row text-center g-4">
                <div class="col-md-4">
                    <div class="contact-item">
                        <i class="fas fa-phone-alt fs-2 mb-3"></i>
                        <h5 class="fw-bold">Telefon</h5>
                        <p class="mb-0">+90 850 346 66 46</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="contact-item">
                        <i class="fas fa-envelope fs-2 mb-3"></i>
                        <h5 class="fw-bold">E-posta</h5>
                        <p class="mb-0">info@vizekit.com</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="contact-item">
                        <i class="fas fa-clock fs-2 mb-3"></i>
                        <h5 class="fw-bold">Çalışma Saatleri</h5>
                        <p class="mb-0">7/24 Destek</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php include 'includes/footer.php'; ?>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="assets/js/script.js"></script>
</body>
</html>