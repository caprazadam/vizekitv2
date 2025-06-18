<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/functions.php';

$countries = getCountries();
$visaResult = null;

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'visa_check') {
    $visaResult = checkVisaRequirement($_POST['fromCountry'], $_POST['toCountry'], $_POST['purpose']);
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vize Kontrol - VizeKit</title>
    <meta name="description" content="Türk pasaport sahipleri için vize gereksinimlerini kontrol edin. 190+ ülke için detaylı vize bilgileri.">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <?php include 'includes/navbar.php'; ?>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="text-center mb-5">
                    <h1 class="display-5 fw-bold text-gradient mb-3">Vize Gereksinimi Kontrol</h1>
                    <p class="lead text-muted">Hedef ülkeniz için vize gereksinimlerini öğrenin</p>
                </div>

                <!-- Visa Check Form -->
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-header bg-gradient-purple text-white text-center py-4">
                        <h3 class="card-title mb-0">
                            <i class="fas fa-passport me-2"></i>
                            Vize Kontrol Formu
                        </h3>
                    </div>
                    <div class="card-body p-5">
                        <form method="POST" id="visaCheckForm">
                            <input type="hidden" name="action" value="visa_check">
                            
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="fas fa-flag me-2 text-gradient"></i>
                                        Vatandaşlığınız
                                    </label>
                                    <select class="form-select" name="fromCountry" required>
                                        <option value="TR" selected>Türkiye 🇹🇷</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="fas fa-map-marker-alt me-2 text-gradient"></i>
                                        Hedef Ülke
                                    </label>
                                    <select class="form-select" name="toCountry" required>
                                        <option value="">Ülke seçin...</option>
                                        <?php foreach($countries as $country): ?>
                                            <option value="<?= $country['code'] ?>" <?= (isset($_POST['toCountry']) && $_POST['toCountry'] === $country['code']) ? 'selected' : '' ?>>
                                                <?= $country['name'] ?> <?= $country['flag'] ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="fas fa-suitcase me-2 text-gradient"></i>
                                        Seyahat Amacı
                                    </label>
                                    <div class="row g-2">
                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="purpose" id="turizm" value="turizm" <?= (isset($_POST['purpose']) && $_POST['purpose'] === 'turizm') ? 'checked' : '' ?>>
                                                <label class="form-check-label" for="turizm">
                                                    <i class="fas fa-camera me-1"></i> Turizm
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="purpose" id="is" value="is" <?= (isset($_POST['purpose']) && $_POST['purpose'] === 'is') ? 'checked' : '' ?>>
                                                <label class="form-check-label" for="is">
                                                    <i class="fas fa-briefcase me-1"></i> İş
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="purpose" id="egitim" value="egitim" <?= (isset($_POST['purpose']) && $_POST['purpose'] === 'egitim') ? 'checked' : '' ?>>
                                                <label class="form-check-label" for="egitim">
                                                    <i class="fas fa-graduation-cap me-1"></i> Eğitim
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="purpose" id="transit" value="transit" <?= (isset($_POST['purpose']) && $_POST['purpose'] === 'transit') ? 'checked' : '' ?>>
                                                <label class="form-check-label" for="transit">
                                                    <i class="fas fa-plane me-1"></i> Transit
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="purpose" id="diger" value="diger" <?= (isset($_POST['purpose']) && $_POST['purpose'] === 'diger') ? 'checked' : '' ?>>
                                                <label class="form-check-label" for="diger">
                                                    <i class="fas fa-ellipsis-h me-1"></i> Diğer
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-gradient btn-lg px-5 py-3">
                                        <i class="fas fa-search me-2"></i>
                                        Vize Gereksinimini Kontrol Et
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <?php if ($visaResult): ?>
                <!-- Visa Result -->
                <div class="mt-5">
                    <div class="card shadow-lg border-0 rounded-4 visa-result-card <?= !$visaResult['visaRequired'] ? 'visa-free' : ($visaResult['eVisaAvailable'] ? 'e-visa' : 'visa-required') ?>">
                        <div class="card-header text-center py-4">
                            <div class="row align-items-center">
                                <div class="col-md-5 text-center">
                                    <h4 class="mb-0">
                                        <?= $visaResult['fromCountry']['flag'] ?>
                                        <?= $visaResult['fromCountry']['name'] ?>
                                    </h4>
                                </div>
                                <div class="col-md-2 text-center">
                                    <i class="fas fa-arrow-right fs-2 text-gradient"></i>
                                </div>
                                <div class="col-md-5 text-center">
                                    <h4 class="mb-0">
                                        <?= $visaResult['toCountry']['flag'] ?>
                                        <?= $visaResult['toCountry']['name'] ?>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-5">
                            <div class="text-center mb-4">
                                <?php if (!$visaResult['visaRequired']): ?>
                                    <div class="status-badge success mb-3">
                                        <i class="fas fa-check-circle me-2"></i>
                                        Vize Gerekmiyor
                                    </div>
                                    <h3 class="text-success">Vizesiz Seyahat Edebilirsiniz!</h3>
                                    <p class="text-muted"><?= $visaResult['customMessage'] ?? 'Türk vatandaşları bu ülkeye vizesiz seyahat edebilir.' ?></p>
                                <?php elseif ($visaResult['eVisaAvailable']): ?>
                                    <div class="status-badge warning mb-3">
                                        <i class="fas fa-globe me-2"></i>
                                        E-Vize Mevcut
                                    </div>
                                    <h3 class="text-warning">Online Vize Başvurusu Yapabilirsiniz</h3>
                                    <p class="text-muted">Bu ülke için elektronik vize başvurusu mevcut.</p>
                                <?php elseif ($visaResult['visaOnArrival']): ?>
                                    <div class="status-badge info mb-3">
                                        <i class="fas fa-plane-arrival me-2"></i>
                                        Varışta Vize
                                    </div>
                                    <h3 class="text-info">Varışta Vize Alabilirsiniz</h3>
                                    <p class="text-muted">Bu ülkeye varışta vize alabilirsiniz.</p>
                                <?php else: ?>
                                    <div class="status-badge danger mb-3">
                                        <i class="fas fa-passport me-2"></i>
                                        Vize Gerekli
                                    </div>
                                    <h3 class="text-danger">Vize Başvurusu Gerekli</h3>
                                    <p class="text-muted">Bu ülkeye seyahat için önceden vize başvurusu yapmanız gerekiyor.</p>
                                <?php endif; ?>
                            </div>

                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="info-box bg-light p-4 rounded-3">
                                        <h5 class="fw-bold mb-3">
                                            <i class="fas fa-clock text-gradient me-2"></i>
                                            İşlem Süresi
                                        </h5>
                                        <p class="mb-0 fs-5 fw-semibold"><?= $visaResult['processingTime'] ?></p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box bg-light p-4 rounded-3">
                                        <h5 class="fw-bold mb-3">
                                            <i class="fas fa-euro-sign text-gradient me-2"></i>
                                            Vize Ücreti
                                        </h5>
                                        <p class="mb-0 fs-5 fw-semibold"><?= $visaResult['fee'] ?></p>
                                    </div>
                                </div>
                            </div>

                            <?php if (!empty($visaResult['documents'])): ?>
                            <div class="mt-4">
                                <h5 class="fw-bold mb-3">
                                    <i class="fas fa-file-alt text-gradient me-2"></i>
                                    Gerekli Belgeler
                                </h5>
                                <div class="row g-2">
                                    <?php foreach($visaResult['documents'] as $document): ?>
                                        <div class="col-md-6">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-check text-success me-2"></i>
                                                <span><?= $document ?></span>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                            <?php endif; ?>

                            <div class="text-center mt-5">
                                <a href="contact.php" class="btn btn-gradient btn-lg px-5">
                                    <i class="fas fa-phone me-2"></i>
                                    Ücretsiz Danışmanlık Al
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>