<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Girişi - VizeKit</title>
    <meta name="description" content="VizeKit admin panel girişi. Yönetici hesabı ile sisteme giriş yapın.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/css/vizekit-theme.css" rel="stylesheet">
    <style>
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
        }

        .login-card {
            background: var(--glass-bg);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            padding: 3rem;
            width: 100%;
            max-width: 450px;
            position: relative;
            overflow: hidden;
        }

        .login-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-purple), var(--neon-green), var(--neon-blue));
        }

        .login-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .login-logo {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            background: linear-gradient(45deg, var(--primary-purple), var(--secondary-purple));
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            animation: float 6s ease-in-out infinite;
        }

        .login-logo i {
            font-size: 2.5rem;
            color: white;
        }

        .login-title {
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(45deg, white, var(--neon-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }

        .login-subtitle {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
        }

        .floating-label {
            position: relative;
            margin-bottom: 1.5rem;
        }

        .floating-label input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            color: white;
            padding: 1rem 1rem 1rem 3rem;
            width: 100%;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .floating-label input:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--neon-green);
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 136, 0.25);
            outline: none;
        }

        .floating-label input::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }

        .floating-label i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.6);
            font-size: 1.1rem;
        }

        .password-toggle {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            font-size: 1.1rem;
        }

        .password-toggle:hover {
            color: var(--neon-green);
        }

        .login-btn {
            background: linear-gradient(45deg, var(--primary-purple), var(--secondary-purple));
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 15px;
            font-weight: 600;
            width: 100%;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(111, 66, 193, 0.4);
            color: white;
        }

        .login-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.5s ease;
        }

        .login-btn:hover::before {
            left: 100%;
        }

        .alert-custom {
            background: linear-gradient(45deg, #ff6b6b, rgba(255, 107, 107, 0.3));
            border: 1px solid rgba(255, 107, 107, 0.5);
            color: white;
            border-radius: 15px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: none;
        }

        .security-notice {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 1rem;
            margin-top: 2rem;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .security-notice i {
            color: var(--neon-blue);
            margin-right: 0.5rem;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .back-link {
            position: absolute;
            top: 2rem;
            left: 2rem;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }

        .back-link:hover {
            color: var(--neon-green);
            transform: translateX(-5px);
        }
    </style>
</head>
<body>
    <div class="animated-bg"></div>
    
    <a href="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
    </a>

    <div class="login-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="login-card">
                        <div class="login-header">
                            <div class="login-logo">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h1 class="login-title">Admin Paneli</h1>
                            <p class="login-subtitle">Yönetici hesabınızla giriş yapın</p>
                        </div>

                        <div class="alert-custom" id="errorAlert">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <span id="errorMessage">Kullanıcı adı veya şifre hatalı!</span>
                        </div>

                        <form id="loginForm">
                            <div class="floating-label">
                                <i class="fas fa-user"></i>
                                <input type="text" id="username" name="username" placeholder="Kullanıcı Adı" required>
                            </div>

                            <div class="floating-label">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="password" name="password" placeholder="Şifre" required>
                                <button type="button" class="password-toggle" onclick="togglePassword()">
                                    <i class="fas fa-eye" id="toggleIcon"></i>
                                </button>
                            </div>

                            <button type="submit" class="login-btn">
                                <i class="fas fa-sign-in-alt me-2"></i>
                                Giriş Yap
                            </button>
                        </form>

                        <div class="security-notice">
                            <i class="fas fa-info-circle"></i>
                            Bu alan sadece yetkili personel içindir. Tüm giriş denemeleri kayıt altına alınır.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorAlert = document.getElementById('errorAlert');
            
            // Hide previous error
            errorAlert.style.display = 'none';
            
            // Simple authentication check (in production, this should be server-side)
            if (username === 'admin' && password === 'vizekit2025') {
                // Success - redirect to admin panel
                window.location.href = '/admin';
            } else {
                // Show error
                errorAlert.style.display = 'block';
                
                // Shake animation
                document.querySelector('.login-card').style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    document.querySelector('.login-card').style.animation = '';
                }, 500);
            }
        });
        
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleIcon = document.getElementById('toggleIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
        
        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
        
        // Auto-focus on username field
        document.getElementById('username').focus();
        
        // Enter key navigation
        document.getElementById('username').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('password').focus();
            }
        });
    </script>
</body>
</html>