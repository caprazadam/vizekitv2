<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Giriş - VizeKit</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center">
    
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">VizeKit Admin</h1>
            <p class="text-gray-600">Yönetici paneline giriş yapın</p>
        </div>

        <form id="adminLogin" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
                <input type="text" name="username" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                <input type="password" name="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
            </div>

            <button type="submit" class="w-full gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition">
                Giriş Yap
            </button>
        </form>

        <div class="mt-6 text-center">
            <a href="/" class="text-purple-600 hover:text-purple-700 text-sm">Ana sayfaya dön</a>
        </div>

        <div id="error" class="mt-4 hidden p-3 bg-red-100 border border-red-400 text-red-700 rounded"></div>
    </div>

    <script>
    document.getElementById('adminLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const username = formData.get('username');
        const password = formData.get('password');
        
        // Simple admin authentication (in production, use proper backend authentication)
        if (username === 'admin' && password === 'vizekit2025') {
            sessionStorage.setItem('adminLoggedIn', 'true');
            window.location.href = '/admin';
        } else {
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = 'Kullanıcı adı veya şifre hatalı!';
            errorDiv.classList.remove('hidden');
        }
    });
    </script>

</body>
</html>