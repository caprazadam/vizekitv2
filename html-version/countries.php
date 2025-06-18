<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/functions.php';

$countries = getCountries();

// Group countries by region
$regions = [];
foreach($countries as $country) {
    $region = $country['region'] ?? 'Diğer';
    if (!isset($regions[$region])) {
        $regions[$region] = [];
    }
    $regions[$region][] = $country;
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ülkeler - VizeKit</title>
    <meta name="description" content="190+ ülke için detaylı vize bilgileri. Türk pasaport sahipleri için ülke bazında vize gereksinimleri.">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <?php include 'includes/navbar.php'; ?>

    <div class="container py-5">
        <div class="text-center mb-5">
            <h1 class="display-5 fw-bold text-gradient mb-3">Ülkeler</h1>
            <p class="lead text-muted">190+ ülke için vize bilgilerine erişin</p>
        </div>

        <!-- Search and Filter -->
        <div class="row mb-5">
            <div class="col-lg-8 mx-auto">
                <div class="card shadow-sm border-0 rounded-4">
                    <div class="card-body p-4">
                        <div class="row g-3">
                            <div class="col-md-8">
                                <div class="search-container">
                                    <i class="fas fa-search search-icon"></i>
                                    <input type="text" class="form-control search-input" placeholder="Ülke ara..." id="countrySearch">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <select class="form-select" id="regionFilter">
                                    <option value="all">Tüm Bölgeler</option>
                                    <?php foreach(array_keys($regions) as $region): ?>
                                        <option value="<?= $region ?>"><?= $region ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Countries Grid -->
        <div class="row g-4" id="countriesGrid">
            <?php foreach($countries as $country): ?>
                <div class="col-lg-3 col-md-4 col-sm-6 country-item" data-region="<?= $country['region'] ?? 'Diğer' ?>" data-name="<?= strtolower($country['name']) ?>">
                    <div class="country-card card h-100 border-0 shadow-sm hover-lift">
                        <div class="card-body text-center p-4">
                            <div class="country-flag mb-3">
                                <span class="flag-emoji"><?= $country['flag'] ?></span>
                            </div>
                            <h5 class="card-title fw-bold mb-2"><?= $country['name'] ?></h5>
                            <p class="card-text text-muted small mb-3"><?= $country['region'] ?? 'Bölge bilgisi' ?></p>
                            <div class="d-grid gap-2">
                                <a href="country.php?code=<?= $country['code'] ?>" class="btn btn-outline-purple btn-sm">
                                    <i class="fas fa-info-circle me-1"></i>
                                    Detaylar
                                </a>
                                <a href="visa-checker.php?to=<?= $country['code'] ?>" class="btn btn-gradient btn-sm">
                                    <i class="fas fa-passport me-1"></i>
                                    Vize Kontrol
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- No Results Message -->
        <div id="noResults" class="text-center py-5" style="display: none;">
            <i class="fas fa-search fs-1 text-muted mb-3"></i>
            <h4 class="text-muted">Aradığınız kriterlere uygun ülke bulunamadı</h4>
            <p class="text-muted">Lütfen arama kriterlerinizi değiştirin</p>
        </div>
    </div>

    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
    <script>
        // Country search and filter functionality
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('countrySearch');
            const regionFilter = document.getElementById('regionFilter');
            const countryItems = document.querySelectorAll('.country-item');
            const noResults = document.getElementById('noResults');

            function filterCountries() {
                const searchTerm = searchInput.value.toLowerCase();
                const selectedRegion = regionFilter.value;
                let visibleCount = 0;

                countryItems.forEach(item => {
                    const countryName = item.dataset.name;
                    const countryRegion = item.dataset.region;
                    
                    const matchesSearch = countryName.includes(searchTerm);
                    const matchesRegion = selectedRegion === 'all' || countryRegion === selectedRegion;
                    
                    if (matchesSearch && matchesRegion) {
                        item.style.display = '';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }

            searchInput.addEventListener('input', filterCountries);
            regionFilter.addEventListener('change', filterCountries);
        });
    </script>
</body>
</html>