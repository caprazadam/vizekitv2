<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/functions.php';

$countries = getCountries();
$selectedService = $_GET['service'] ?? '';
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim - VizeKit</title>
    <meta name="description" content="VizeKit ile iletişime geçin. Vize danışmanlığı için bize ulaşın. 7/24 destek hattımız hizmetinizde.">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <?php include 'includes/navbar.php'; ?>

    <div class="container py-5">
        <div class="text-center mb-5">
            <h1 class="display-5 fw-bold text-gradient mb-3">İletişim</h1>
            <p class="lead text-muted">Vize süreciniz için profesyonel destek alın</p>
        </div>

        <div class="row g-5">
            <!-- Contact Form -->
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-header bg-gradient-purple text-white text-center py-4">
                        <h3 class="card-title mb-0">
                            <i class="fas fa-envelope me-2"></i>
                            Bize Ulaşın
                        </h3>
                    </div>
                    <div class="card-body p-5">
                        <form id="contactForm">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Ad *</label>
                                    <input type="text" class="form-control" name="firstName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Soyad *</label>
                                    <input type="text" class="form-control" name="lastName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">E-posta *</label>
                                    <input type="email" class="form-control" name="email" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Telefon *</label>
                                    <input type="tel" class="form-control" name="phone" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">İlgilendiğiniz Hizmet</label>
                                    <select class="form-select" name="service">
                                        <option value="">Hizmet seçin...</option>
                                        <option value="Vize Danışmanlığı" <?= $selectedService === 'Vize Danışmanlığı' ? 'selected' : '' ?>>Vize Danışmanlığı</option>
                                        <option value="Belge Hazırlığı" <?= $selectedService === 'Belge Hazırlığı' ? 'selected' : '' ?>>Belge Hazırlığı</option>
                                        <option value="Başvuru Sunumu" <?= $selectedService === 'Başvuru Sunumu' ? 'selected' : '' ?>>Başvuru Sunumu</option>
                                        <option value="Hızlı İşlem" <?= $selectedService === 'Hızlı İşlem' ? 'selected' : '' ?>>Hızlı İşlem</option>
                                        <option value="Seyahat Sigortası" <?= $selectedService === 'Seyahat Sigortası' ? 'selected' : '' ?>>Seyahat Sigortası</option>
                                        <option value="7/24 Destek" <?= $selectedService === '7/24 Destek' ? 'selected' : '' ?>>7/24 Destek</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Hedef Ülke</label>
                                    <select class="form-select" name="destinationCountry">
                                        <option value="">Ülke seçin...</option>
                                        <?php foreach($countries as $country): ?>
                                            <option value="<?= $country['code'] ?>"><?= $country['name'] ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold">Mesajınız *</label>
                                    <textarea class="form-control" name="message" rows="5" placeholder="Vize ile ilgili sorularınızı, seyahat planlarınızı ve özel durumlarınızı belirtin..." required></textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="privacy" required>
                                        <label class="form-check-label" for="privacy">
                                            <a href="#" class="text-decoration-none">Gizlilik politikasını</a> okudum ve kabul ediyorum
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-gradient btn-lg px-5 py-3">
                                        <i class="fas fa-paper-plane me-2"></i>
                                        Mesajı Gönder
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Contact Info -->
            <div class="col-lg-4">
                <div class="contact-info">
                    <!-- Phone -->
                    <div class="card shadow-sm border-0 rounded-4 mb-4">
                        <div class="card-body p-4 text-center">
                            <div class="contact-icon mb-3">
                                <i class="fas fa-phone-alt fs-2 text-gradient"></i>
                            </div>
                            <h5 class="fw-bold">Telefon</h5>
                            <p class="text-muted mb-3">7/24 Destek Hattı</p>
                            <a href="tel:<?= CONTACT_PHONE ?>" class="btn btn-gradient">
                                <?= CONTACT_PHONE ?>
                            </a>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="card shadow-sm border-0 rounded-4 mb-4">
                        <div class="card-body p-4 text-center">
                            <div class="contact-icon mb-3">
                                <i class="fas fa-envelope fs-2 text-gradient"></i>
                            </div>
                            <h5 class="fw-bold">E-posta</h5>
                            <p class="text-muted mb-3">24 saat içinde yanıt</p>
                            <a href="mailto:<?= CONTACT_EMAIL ?>" class="btn btn-outline-purple">
                                <?= CONTACT_EMAIL ?>
                            </a>
                        </div>
                    </div>

                    <!-- WhatsApp -->
                    <div class="card shadow-sm border-0 rounded-4 mb-4">
                        <div class="card-body p-4 text-center">
                            <div class="contact-icon mb-3">
                                <i class="fab fa-whatsapp fs-2 text-success"></i>
                            </div>
                            <h5 class="fw-bold">WhatsApp</h5>
                            <p class="text-muted mb-3">Anında iletişim</p>
                            <a href="https://wa.me/908503466646" class="btn btn-success">
                                WhatsApp'ta Yaz
                            </a>
                        </div>
                    </div>

                    <!-- Working Hours -->
                    <div class="card shadow-sm border-0 rounded-4">
                        <div class="card-body p-4">
                            <h5 class="fw-bold text-center mb-4">
                                <i class="fas fa-clock text-gradient me-2"></i>
                                Çalışma Saatleri
                            </h5>
                            <ul class="list-unstyled mb-0">
                                <li class="d-flex justify-content-between mb-2">
                                    <span>Pazartesi - Cuma:</span>
                                    <span class="fw-semibold">09:00 - 18:00</span>
                                </li>
                                <li class="d-flex justify-content-between mb-2">
                                    <span>Cumartesi:</span>
                                    <span class="fw-semibold">10:00 - 16:00</span>
                                </li>
                                <li class="d-flex justify-content-between mb-2">
                                    <span>Pazar:</span>
                                    <span class="fw-semibold">Kapalı</span>
                                </li>
                                <li class="text-center mt-3">
                                    <span class="badge bg-gradient-purple">7/24 Acil Destek</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAQ Section -->
        <section class="mt-5 pt-5">
            <div class="text-center mb-5">
                <h2 class="h2 fw-bold text-gradient mb-3">Hızlı Cevaplar</h2>
                <p class="lead text-muted">En sık sorulan sorular</p>
            </div>
            
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-3">
                                <i class="fas fa-clock text-gradient me-2"></i>
                                Ne kadar sürede dönüş yapıyorsunuz?
                            </h5>
                            <p class="text-muted mb-0">
                                Telefon ve WhatsApp mesajlarına anında, e-posta mesajlarına ise 2 saat içinde yanıt veriyoruz.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-3">
                                <i class="fas fa-money-bill text-gradient me-2"></i>
                                İlk danışmanlık ücretli mi?
                            </h5>
                            <p class="text-muted mb-0">
                                İlk danışmanlık görüşmemiz tamamen ücretsizdir. Vize sürecinizi ve seçeneklerinizi detaylı olarak değerlendiririz.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-3">
                                <i class="fas fa-shield-alt text-gradient me-2"></i>
                                Bilgilerim güvende mi?
                            </h5>
                            <p class="text-muted mb-0">
                                Tüm kişisel bilgileriniz SSL şifreleme ile korunur ve hiçbir şekilde üçüncü taraflarla paylaşılmaz.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-3">
                                <i class="fas fa-headset text-gradient me-2"></i>
                                Acil durumda nasıl ulaşırım?
                            </h5>
                            <p class="text-muted mb-0">
                                Acil durumlar için 7/24 destek hattımızı arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
    <script>
        // Contact form handler
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                action: 'consultation',
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                destinationCountry: formData.get('destinationCountry'),
                message: formData.get('message')
            };
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gönderiliyor...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('includes/functions.php', {
                    method: 'POST',
                    body: new URLSearchParams(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    VizeKit.showToast(result.message, 'success');
                    e.target.reset();
                } else {
                    VizeKit.showToast(result.message || 'Bir hata oluştu.', 'error');
                }
                
            } catch (error) {
                VizeKit.showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    </script>
</body>
</html>