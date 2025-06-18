<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/functions.php';

$services = getServices();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hizmetlerimiz - VizeKit</title>
    <meta name="description" content="Vize danışmanlığı, belge hazırlığı, başvuru sunumu ve daha fazlası. Kapsamlı vize hizmetlerimizi keşfedin.">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <?php include 'includes/navbar.php'; ?>

    <div class="container py-5">
        <div class="text-center mb-5">
            <h1 class="display-5 fw-bold text-gradient mb-3">Hizmetlerimiz</h1>
            <p class="lead text-muted">Vize sürecinizin her aşamasında profesyonel destek</p>
        </div>

        <!-- Services Grid -->
        <div class="row g-4 mb-5">
            <?php foreach($services as $service): ?>
                <div class="col-lg-4 col-md-6">
                    <div class="service-card card h-100 border-0 shadow-lg hover-lift">
                        <div class="card-body p-5">
                            <div class="text-center mb-4">
                                <div class="service-icon mx-auto mb-3">
                                    <i class="fas fa-<?= getServiceIcon($service['icon']) ?> text-gradient fs-1"></i>
                                </div>
                                <h4 class="card-title fw-bold"><?= $service['name'] ?></h4>
                                <p class="card-text text-muted"><?= $service['description'] ?></p>
                            </div>
                            
                            <div class="features-list mb-4">
                                <h6 class="fw-bold mb-3">Özellikler:</h6>
                                <ul class="list-unstyled">
                                    <?php 
                                    $features = json_decode($service['features'], true);
                                    foreach($features as $feature): 
                                    ?>
                                        <li class="mb-2">
                                            <i class="fas fa-check text-success me-2"></i>
                                            <?= $feature ?>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            
                            <div class="text-center">
                                <a href="contact.php?service=<?= urlencode($service['name']) ?>" class="btn btn-gradient w-100">
                                    <i class="fas fa-phone me-2"></i>
                                    Bilgi Al
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Process Section -->
        <section class="py-5 bg-light rounded-4 mb-5">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="h2 fw-bold text-gradient mb-3">Nasıl Çalışıyoruz?</h2>
                    <p class="lead text-muted">4 adımda vize sürecinizi tamamlayın</p>
                </div>
                
                <div class="row g-4">
                    <div class="col-lg-3 col-md-6">
                        <div class="process-step text-center">
                            <div class="step-number bg-gradient-purple text-white">1</div>
                            <h5 class="fw-bold mt-3">Danışmanlık</h5>
                            <p class="text-muted">Ücretsiz ilk görüşmede vize sürecinizi planlıyoruz</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="process-step text-center">
                            <div class="step-number bg-gradient-purple text-white">2</div>
                            <h5 class="fw-bold mt-3">Belge Hazırlığı</h5>
                            <p class="text-muted">Gerekli tüm belgeleri sizin için hazırlıyoruz</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="process-step text-center">
                            <div class="step-number bg-gradient-purple text-white">3</div>
                            <h5 class="fw-bold mt-3">Başvuru Sunumu</h5>
                            <p class="text-muted">Başvurunuzu elçilik/konsolosluğa sunuyoruz</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="process-step text-center">
                            <div class="step-number bg-gradient-purple text-white">4</div>
                            <h5 class="fw-bold mt-3">Takip</h5>
                            <p class="text-muted">Vizeniz hazır olana kadar sürekli takip ediyoruz</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="mb-5">
            <div class="text-center mb-5">
                <h2 class="h2 fw-bold text-gradient mb-3">Sıkça Sorulan Sorular</h2>
                <p class="lead text-muted">En çok merak edilen sorular ve cevapları</p>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    Vize başvuru süreci ne kadar sürer?
                                </button>
                            </h2>
                            <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Vize başvuru süresi ülkeye ve vize türüne göre değişiklik gösterir. Genellikle 5-15 iş günü arasında değişir. Acil durumlar için hızlı işlem seçeneğimiz mevcuttur.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    Hangi belgelere ihtiyacım var?
                                </button>
                            </h2>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Gerekli belgeler hedef ülke ve seyahat amacına göre değişir. Genel olarak pasaport, fotoğraf, başvuru formu, seyahat sigortası ve konaklama belgesi gereklidir. Detaylı listeyi size özel olarak hazırlıyoruz.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    Vize başvurum reddedilirse ne olur?
                                </button>
                            </h2>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Vize reddedilme durumunda red nedenlerini analiz ederek yeni başvuru stratejisi oluşturuyoruz. Uzman ekibimiz size rehberlik ederek başarı şansınızı artırır.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                    Hizmet ücretleriniz nedir?
                                </button>
                            </h2>
                            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Hizmet ücretlerimiz vize türü ve seçtiğiniz hizmet paketine göre değişiklik gösterir. İlk danışmanlık ücretsizdir. Detaylı fiyat bilgisi için bize ulaşın.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                    7/24 destek nasıl çalışıyor?
                                </button>
                            </h2>
                            <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Müşterilerimize telefon, e-posta ve canlı sohbet üzerinden 7/24 destek sağlıyoruz. Acil durumlar için özel destek hattımız mevcuttur.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="text-center py-5 bg-gradient-purple text-white rounded-4">
            <div class="container">
                <h2 class="fw-bold mb-3">Vize Sürecinizi Başlatmaya Hazır mısınız?</h2>
                <p class="lead mb-4">Uzman ekibimizle ücretsiz danışmanlık alın</p>
                <div class="d-flex justify-content-center gap-3 flex-wrap">
                    <a href="contact.php" class="btn btn-light btn-lg px-5">
                        <i class="fas fa-phone me-2"></i>
                        Hemen Ara
                    </a>
                    <a href="visa-checker.php" class="btn btn-outline-light btn-lg px-5">
                        <i class="fas fa-search me-2"></i>
                        Vize Kontrol Et
                    </a>
                </div>
            </div>
        </section>
    </div>

    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
    
    <style>
        .step-number {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .process-step {
            padding: 2rem 1rem;
        }
        
        .accordion-button {
            border-radius: 0.75rem !important;
        }
        
        .accordion-button:not(.collapsed) {
            background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
            color: white;
        }
    </style>
</body>
</html>