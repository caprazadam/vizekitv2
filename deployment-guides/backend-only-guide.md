# Backend API Barındırma Rehberi - VizeKit

Node.js/Express backend'ini ayrı olarak barındırmak için detaylı rehber.

## Hızlı Başlangıç

### Railway (Önerilen)

**1. Railway CLI Kurulumu:**
```bash
npm install -g @railway/cli
railway login
```

**2. Proje Hazırlığı:**
```bash
# PORT environment variable için güncelleme
# server/index.ts
const port = process.env.PORT || 5000;
```

**3. Deploy:**
```bash
railway init
railway up
```

**4. Environment Variables:**
```bash
railway variables set DATABASE_URL=your-postgres-url
railway variables set NODE_ENV=production
```

---

## Platform Seçenekleri

### 1. Railway

**Avantajları:**
- Kolay kurulum
- Built-in PostgreSQL
- Git-based deployment
- Auto-scaling

**Konfigürasyon (railway.json):**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Pricing:**
- Free: $5 kredi/ay
- Pro: $20/ay

---

### 2. Render

**Avantajları:**
- Ücretsiz PostgreSQL
- SSL otomatik
- Zero-downtime deploys

**Web Service Ayarları:**
```
Name: vizekit-backend
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
```

**Environment Variables:**
```
DATABASE_URL=postgresql://user:pass@host:5432/db
NODE_ENV=production
PORT=10000
```

**Health Check:**
```typescript
// server/routes.ts içine ekle
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
```

**Pricing:**
- Free: 512MB RAM, sleep after 15min
- Paid: $7/ay

---

### 3. Heroku

**Procfile:**
```
web: npm start
```

**Heroku CLI Commands:**
```bash
heroku create vizekit-backend
heroku addons:create heroku-postgresql:mini
git push heroku main
```

**Environment Variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=postgres://...
```

**Pricing:**
- Basic: $7/ay
- Standard: $25/ay

---

### 4. DigitalOcean App Platform

**App Spec (.do/app.yaml):**
```yaml
name: vizekit-backend
services:
- name: api
  source_dir: /
  github:
    repo: your-username/vizekit-backend
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  health_check:
    http_path: /api/health
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
    
databases:
- name: db
  engine: PG
  version: "13"
  size: db-s-dev-database
```

**Pricing:**
- Basic: $5/ay
- Professional: $12/ay

---

## Database Seçenekleri

### 1. Railway PostgreSQL

**Kurulum:**
```bash
# Railway dashboard'da
railway add postgresql
```

**Connection:**
```typescript
// server/storage.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);
```

---

### 2. Supabase

**Setup:**
1. [supabase.com](https://supabase.com) → New project
2. SQL Editor'da tablo oluştur
3. API Keys → anon public

**Connection:**
```bash
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

**Migration:**
```bash
npm run db:push
```

---

### 3. PlanetScale (MySQL)

**Setup:**
```bash
npm install -g @planetscale/cli
pscale auth login
pscale database create vizekit
```

**Drizzle Config (MySQL):**
```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './shared/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

---

## Environment Variables

### Production Variables

```bash
# Essential
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...

# Optional
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://yourdomain.com

# Monitoring
SENTRY_DSN=https://...
LOG_LEVEL=info
```

### Development vs Production

```typescript
// server/config.ts
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production'
};
```

---

## CORS Konfigürasyonu

### Express CORS Setup

```typescript
// server/index.ts
import cors from 'cors';
import { config } from './config';

const corsOptions = {
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count']
};

app.use(cors(corsOptions));

// Pre-flight için
app.options('*', cors(corsOptions));
```

### Multiple Frontend Domains

```typescript
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://yourdomain.com',
      'https://www.yourdomain.com',
      'https://vizekit.vercel.app',
      'http://localhost:3000' // Development
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
};
```

---

## SSL ve Security

### HTTPS Redirect

```typescript
// server/middleware/security.ts
export const enforceHTTPS = (req: Request, res: Response, next: NextFunction) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
};

app.use(enforceHTTPS);
```

### Security Headers

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

---

## Monitoring ve Logging

### Structured Logging

```typescript
// server/utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Usage
logger.info('Server started', { port: config.port });
logger.error('Database connection failed', { error: error.message });
```

### Error Tracking

```typescript
// server/middleware/errorHandler.ts
import * as Sentry from '@sentry/node';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', { 
    error: err.message, 
    stack: err.stack,
    url: req.url,
    method: req.method 
  });

  Sentry.captureException(err);

  res.status(500).json({
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};

app.use(errorHandler);
```

---

## Performance Optimizasyonu

### Redis Caching

```typescript
// server/middleware/cache.ts
import redis from 'redis';

const client = redis.createClient({
  url: process.env.REDIS_URL
});

export const cacheMiddleware = (duration = 300) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const originalJson = res.json;
      res.json = function(body) {
        client.setex(key, duration, JSON.stringify(body));
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

// Usage
app.get('/api/countries', cacheMiddleware(3600), getCountries);
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

app.use('/api/auth/', authLimiter);
```

---

## Database Migration

### Drizzle Migrations

```typescript
// drizzle/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL!;
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);
  
  await migrate(db, { migrationsFolder: 'drizzle' });
  await client.end();
};

runMigrations().catch(console.error);
```

**Package.json scripts:**
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "tsx drizzle/migrate.ts",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio"
  }
}
```

---

## Health Checks

### Comprehensive Health Check

```typescript
// server/routes/health.ts
import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    status: 'healthy',
    services: {
      database: 'unknown',
      redis: 'unknown'
    }
  };

  try {
    // Database check
    await db.execute('SELECT 1');
    checks.services.database = 'healthy';
  } catch (error) {
    checks.services.database = 'unhealthy';
    checks.status = 'degraded';
  }

  try {
    // Redis check (if using)
    await redisClient.ping();
    checks.services.redis = 'healthy';
  } catch (error) {
    checks.services.redis = 'unhealthy';
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(checks);
};
```

---

## Backup ve Recovery

### Database Backup

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

### Environment Backup

```bash
# .env backup
cp .env .env.backup.$(date +%Y%m%d)

# Railway variables export
railway variables --json > railway-vars-$(date +%Y%m%d).json
```

---

## Deployment Automation

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Backend

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway login --browserless
          railway up --detach
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Troubleshooting

### Common Issues

**Port Binding Error:**
```typescript
// Ensure PORT environment variable is used
const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

**Database Connection Issues:**
```typescript
// Add connection retry logic
const connectWithRetry = async () => {
  try {
    await db.execute('SELECT 1');
    console.log('Database connected');
  } catch (error) {
    console.log('Database connection failed, retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};
```

**Memory Issues:**
```bash
# Check memory usage
railway logs --tail

# Increase memory limit in Railway
railway variables set NODE_OPTIONS="--max-old-space-size=512"
```

---

## Monitoring Dashboard

### Simple Monitoring

```typescript
// server/routes/metrics.ts
export const getMetrics = (req: Request, res: Response) => {
  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  };
  
  res.json(metrics);
};
```

Bu rehberle backend API'nizi güvenli ve verimli şekilde deploy edebilirsiniz.