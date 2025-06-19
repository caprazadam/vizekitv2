# Railway'de Proje Düzenleme Rehberi

Railway'e deploy edilmiş VizeKit projesini düzenlemek için farklı yöntemler.

## Yöntem 1: Git ile Güncelleme (Önerilen)

### Adım 1: Local Değişiklikler
```bash
# Kodunuzu düzenleyin
# Örnek: client/src/pages/home.tsx dosyasını güncelleyin

# Değişiklikleri commit edin
git add .
git commit -m "Homepage güncellendi"
git push origin main
```

### Adım 2: Otomatik Deploy
- Railway GitHub'ı izliyor
- Push sonrası otomatik deploy başlar
- 2-3 dakikada canlıya alır

## Yöntem 2: Railway CLI ile

### CLI Kurulumu
```bash
npm install -g @railway/cli
railway login
```

### Proje Bağlantısı
```bash
railway link
# Mevcut Railway projenizi seçin
```

### Deploy
```bash
railway up
```

## Yöntem 3: Railway Dashboard

### Web Arayüzü
1. [railway.app](https://railway.app) → Projects
2. VizeKit projenizi seçin
3. Deployments → View Build Logs
4. Settings → Environment Variables

### GitHub Bağlantısı Kontrol
- Settings → Source
- GitHub repository bağlantısı aktif mi kontrol edin

## Environment Variables Güncelleme

### Railway Dashboard'da
1. Project → Variables
2. Yeni variable ekle veya mevcut olanı düzenle
3. Deploy → Restart

### CLI ile
```bash
railway variables set VARIABLE_NAME="value"
railway variables list  # Kontrol için
```

## Database Güncellemeleri

### Drizzle Migration
```bash
# Local'de migration oluştur
npm run db:generate

# Railway'e push et
git add drizzle/
git commit -m "Database migration"
git push origin main

# Railway'de migration çalıştır
railway run npm run db:push
```

### Manuel SQL
```bash
railway connect postgres
# PostgreSQL shell açılır
\dt  # Tabloları listele
SELECT * FROM countries LIMIT 5;
```

## Deployment Logs İzleme

### Real-time Logs
```bash
railway logs --tail
```

### Dashboard'da
- Project → Deployments
- Son deployment'ı tıklayın
- Build ve Runtime logları görün

## Rollback İşlemi

### Önceki Versiyona Dönüş
1. Railway Dashboard → Deployments
2. Çalışan bir önceki deployment'ı seçin
3. "Promote to Production" tıklayın

### Git ile Rollback
```bash
git log --oneline  # Commit geçmişi
git revert HEAD    # Son commit'i geri al
git push origin main
```

## Custom Domain Güncelleme

### Yeni Domain Ekleme
1. Railway → Settings → Domains
2. "Custom Domain" ekle
3. DNS kayıtlarını güncelle:
```
CNAME your-domain.com your-project.railway.app
```

## Performance Monitoring

### Resource Usage
- Railway Dashboard → Metrics
- CPU, Memory, Network kullanımı
- Response time grafikleri

### Health Check
```typescript
// server/routes.ts'ye ekleyin
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

## Troubleshooting

### Build Hatası
```bash
railway logs --deployment [deployment-id]
# Hata mesajlarını inceleyin
```

### Database Bağlantı Hatası
```bash
railway variables list
# DATABASE_URL doğru mu kontrol edin
```

### Port Hatası
```typescript
// server/index.ts - PORT environment variable kullanın
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0');
```

## Hızlı Düzenleme Adımları

### Text Değişikliği
1. GitHub'da dosyayı açın
2. Edit (kalem) ikonuna tıklayın
3. Değişikliği yapın
4. Commit changes
5. Railway otomatik deploy eder

### Dosya Ekleme
```bash
# Yeni dosya oluşturun
touch new-file.tsx

# Git'e ekleyin
git add new-file.tsx
git commit -m "Yeni dosya eklendi"
git push origin main
```

Bu yöntemlerle Railway'deki projenizi kolayca güncelleyebilirsiniz.