<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim - VizeKit</title>
    <meta name="description" content="VizeKit ile iletişime geçin. Vize danışmanlığı ve destek için uzmanlarımızla konuşun.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/css/vizekit-theme.css" rel="stylesheet">
    <style>
        .contact-info-card {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            height: 100%;
        }

        .contact-info-card:hover {
            transform: translateY(-5px);
            border-color: var(--neon-green);
            box-shadow: 0 15px 30px rgba(0, 255, 136, 0.2);
        }

        .contact-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary-purple), var(--secondary-purple));
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            transition: all 0.3s ease;
        }

        .contact-info-card:hover .contact-icon {
            background: linear-gradient(45deg, var(--neon-green), var(--neon-blue));
            transform: scale(1.1);
        }

        .contact-icon i {
            font-size: 2rem;
            color: white;
        }

        .page-header {
            padding: 150px 0 80px;
            text-align: center;
        }

        .contact-form {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 3rem;
        }

        .floating-label {
            position: relative;
            margin-bottom: 2rem;
        }

        .floating-label input,
        .floating-label select,
        .floating-label textarea {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            color: white;
            padding: 1rem;
            width: 100%;
            font-size: 1rem;
        }

        .floating-label input:focus,
        .floating-label select:focus,
        .floating-label textarea:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 136, 0.25);
            outline: none;
        }

        .floating-label label {
            position: absolute;
            top: 1rem;
            left: 1rem;
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.3s ease;
            pointer-events: none;
            background: transparent;
        }

        .floating-label input:focus + label,
        .floating-label input:not(:placeholder-shown) + label,
        .floating-label select:focus + label,
        .floating-label textarea:focus + label,
        .floating-label textarea:not(:placeholder-shown) + label {
            top: -0.5rem;
            left: 0.75rem;
            font-size: 0.8rem;
            color: var(--neon-green);
            background: var(--dark-bg);
            padding: 0 0.5rem;
        }

        .floating-label option {
            background: var(--card-bg);
            color: white;
        }

        .map-container {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2rem;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.8);
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }

        .social-link {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary-purple), var(--secondary-purple));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            background: linear-gradient(45deg, var(--neon-green), var(--neon-blue));
            transform: translateY(-3px);
            color: white;
            box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
        }

        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #25d366, #128c7e);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .whatsapp-float:hover {
            transform: scale(1.1);
            color: white;
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.6);
        }

        .success-message {
            background: linear-gradient(45deg, var(--neon-green), rgba(0, 255, 136, 0.3));
            color: var(--dark-bg);
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            display: none;
        }

        .error-message {
            background: linear-gradient(45deg, #ff6b6b, rgba(255, 107, 107, 0.3));
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            display: none;
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
                        <a class="nav-link active" href="/contact">İletişim</a>
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
            <h1 class="page-title">İletişim</h1>
            <p class="hero-subtitle">Vize sürecinizde size yardımcı olmaktan mutluluk duyarız</p>
        </div>
    </section>

    <!-- Contact Info -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <div class="contact-info-card">
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <h4 class="mb-3">Telefon</h4>
                        <p class="mb-2">7/24 Destek Hattı</p>
                        <a href="tel:+908503466646" class="text-white text-decoration-none">
                            <strong>+90 850 346 66 46</strong>
                        </a>
                    </div>
                </div>

                <div class="col-lg-4 mb-4">
                    <div class="contact-info-card">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <h4 class="mb-3">E-posta</h4>
                        <p class="mb-2">Hızlı Yanıt Garantisi</p>
                        <a href="mailto:info@vizekit.com" class="text-white text-decoration-none">
                            <strong>info@vizekit.com</strong>
                        </a>
                    </div>
                </div>

                <div class="col-lg-4 mb-4">
                    <div class="contact-info-card">
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <h4 class="mb-3">Adres</h4>
                        <p class="mb-2">Merkez Ofis</p>
                        <address class="mb-0">
                            <strong>Sakarya Mah. 57015. SK.<br>
                            No: 25, Kahramanmaraş</strong>
                        </address>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form & Map -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mb-4">
                    <div class="contact-form">
                        <h3 class="mb-4 text-center">Bizimle İletişime Geçin</h3>
                        
                        <div class="success-message" id="successMessage">
                            <i class="fas fa-check-circle me-2"></i>
                            Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                        </div>

                        <div class="error-message" id="errorMessage">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                        </div>

                        <form id="contactForm" class="needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="floating-label">
                                        <input type="text" id="firstName" name="first_name" placeholder=" " required>
                                        <label for="firstName">Ad *</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="floating-label">
                                        <input type="text" id="lastName" name="last_name" placeholder=" " required>
                                        <label for="lastName">Soyad *</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="floating-label">
                                        <input type="email" id="email" name="email" placeholder=" " required>
                                        <label for="email">E-posta *</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="floating-label">
                                        <input type="tel" id="phone" name="phone" placeholder=" ">
                                        <label for="phone">Telefon</label>
                                    </div>
                                </div>
                            </div>

                            <div class="floating-label">
                                <select id="subject" name="subject" required>
                                    <option value="">Konu seçin...</option>
                                    <option value="visa_info">Vize Bilgisi</option>
                                    <option value="application">Başvuru Süreci</option>
                                    <option value="services">Hizmetler</option>
                                    <option value="payment">Ödeme</option>
                                    <option value="other">Diğer</option>
                                </select>
                                <label for="subject">Konu *</label>
                            </div>

                            <div class="floating-label">
                                <textarea id="message" name="message" rows="5" placeholder=" " required></textarea>
                                <label for="message">Mesajınız *</label>
                            </div>

                            <div class="text-center">
                                <button type="submit" class="btn-neon">
                                    <i class="fas fa-paper-plane me-2"></i>Mesaj Gönder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="map-container">
                        <div class="text-center">
                            <i class="fas fa-map-marked-alt" style="font-size: 4rem; color: var(--neon-green); margin-bottom: 1rem;"></i>
                            <h5>Kahramanmaraş Merkez</h5>
                            <p>Sakarya Mahallesi<br>57015. Sokak No: 25</p>
                            <a href="https://maps.google.com/?q=Kahramanmaraş" target="_blank" class="btn-outline-neon btn-sm">
                                <i class="fas fa-external-link-alt me-2"></i>Haritada Görüntüle
                            </a>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="social-links">
                        <a href="#" class="social-link" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-link" title="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Working Hours -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="glass-card text-center">
                        <h3 class="mb-4">Çalışma Saatleri</h3>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <h5 style="color: var(--neon-green);">Hafta İçi</h5>
                                <p class="mb-0">Pazartesi - Cuma<br><strong>09:00 - 18:00</strong></p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <h5 style="color: var(--neon-blue);">Hafta Sonu</h5>
                                <p class="mb-0">Cumartesi<br><strong>10:00 - 16:00</strong></p>
                            </div>
                        </div>
                        <hr style="border-color: rgba(255,255,255,0.2);">
                        <p class="mb-0">
                            <i class="fas fa-headset me-2" style="color: var(--neon-green);"></i>
                            Acil durumlar için 7/24 telefon desteği mevcuttur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- WhatsApp Float Button -->
    <a href="https://wa.me/908503466646" class="whatsapp-float" target="_blank" title="WhatsApp">
        <i class="fab fa-whatsapp" style="font-size: 1.5rem;"></i>
    </a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Basic validation
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                successMessage.style.display = 'block';
                form.reset();
                form.classList.remove('was-validated');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });

        // Floating label animation fix
        document.querySelectorAll('.floating-label input, .floating-label select, .floating-label textarea').forEach(element => {
            element.addEventListener('blur', function() {
                if (this.value !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    </script>
</body>
</html>