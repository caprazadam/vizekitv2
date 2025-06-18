<footer class="bg-dark text-white py-5">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4">
                <h5 class="fw-bold text-gradient mb-3">VizeKit</h5>
                <p class="text-light">Türk vatandaşları için güvenilir vize danışmanlığı ve başvuru hizmetleri. Seyahat hayallerinizi gerçeğe dönüştürüyoruz.</p>
                <div class="d-flex gap-3">
                    <a href="#" class="text-light"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-light"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-light"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            
            <div class="col-lg-2 col-md-6">
                <h6 class="fw-bold mb-3">Hızlı Linkler</h6>
                <ul class="list-unstyled">
                    <li><a href="index.php" class="text-light text-decoration-none">Ana Sayfa</a></li>
                    <li><a href="visa-checker.php" class="text-light text-decoration-none">Vize Kontrol</a></li>
                    <li><a href="countries.php" class="text-light text-decoration-none">Ülkeler</a></li>
                    <li><a href="services.php" class="text-light text-decoration-none">Hizmetler</a></li>
                </ul>
            </div>
            
            <div class="col-lg-2 col-md-6">
                <h6 class="fw-bold mb-3">Destek</h6>
                <ul class="list-unstyled">
                    <li><a href="about.php" class="text-light text-decoration-none">Hakkımızda</a></li>
                    <li><a href="contact.php" class="text-light text-decoration-none">İletişim</a></li>
                    <li><a href="application-status.php" class="text-light text-decoration-none">Başvuru Sorgula</a></li>
                    <li><a href="#" class="text-light text-decoration-none">SSS</a></li>
                </ul>
            </div>
            
            <div class="col-lg-4">
                <h6 class="fw-bold mb-3">İletişim Bilgileri</h6>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <i class="fas fa-phone me-2"></i>
                        <a href="tel:<?= CONTACT_PHONE ?>" class="text-light text-decoration-none"><?= CONTACT_PHONE ?></a>
                    </li>
                    <li class="mb-2">
                        <i class="fas fa-envelope me-2"></i>
                        <a href="mailto:<?= CONTACT_EMAIL ?>" class="text-light text-decoration-none"><?= CONTACT_EMAIL ?></a>
                    </li>
                    <li class="mb-2">
                        <i class="fas fa-clock me-2"></i>
                        7/24 Destek
                    </li>
                </ul>
            </div>
        </div>
        
        <hr class="my-4">
        
        <div class="row align-items-center">
            <div class="col-md-6">
                <p class="mb-0">&copy; <?= date('Y') ?> VizeKit. Tüm hakları saklıdır.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <a href="#" class="text-light text-decoration-none me-3">Gizlilik Politikası</a>
                <a href="#" class="text-light text-decoration-none">Kullanım Koşulları</a>
            </div>
        </div>
    </div>
</footer>