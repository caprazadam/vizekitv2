<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
        <a class="navbar-brand fw-bold text-gradient fs-3" href="index.php">VizeKit</a>
        
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <a class="nav-link fw-semibold" href="visa-checker.php">Vize Kontrol</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" href="countries.php">Ülkeler</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" href="services.php">Hizmetler</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" href="application-status.php">Başvuru Sorgula</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" href="about.php">Hakkımızda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" href="contact.php">İletişim</a>
                </li>
            </ul>
            <div class="d-flex">
                <a href="tel:<?= CONTACT_PHONE ?>" class="btn btn-gradient">
                    <i class="fas fa-phone me-2"></i>
                    <?= CONTACT_PHONE ?>
                </a>
            </div>
        </div>
    </div>
    
    <!-- Mobile Offcanvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="navbarOffcanvas">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title text-gradient fw-bold">Menü</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link fw-semibold py-3" href="visa-checker.php">Vize Kontrol</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold py-3" href="countries.php">Ülkeler</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold py-3" href="services.php">Hizmetler</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold py-3" href="application-status.php">Başvuru Sorgula</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold py-3" href="about.php">Hakkımızda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold py-3" href="contact.php">İletişim</a>
                </li>
            </ul>
            <hr>
            <a href="tel:<?= CONTACT_PHONE ?>" class="btn btn-gradient w-100">
                <i class="fas fa-phone me-2"></i>
                <?= CONTACT_PHONE ?>
            </a>
        </div>
    </div>
</nav>