# Thiết Lập Infrastructure (MVP)

## 1. Database Setup

### 1.1 MySQL Container
```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: hotel_db
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin@123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql_data:
```

### 1.2 Database Backup
```bash
#!/bin/bash
# backup.sh

# Backup MySQL database
docker exec hotel-db mysqldump -u root -proot hotel_db > backup_$(date +%Y%m%d).sql

# Compress backup
gzip backup_$(date +%Y%m%d).sql
```

## 2. Logging

### 2.1 Console Logging
```typescript
// src/utils/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      error: error?.message || error
    }));
  }
};
```

### 2.2 Error Tracking (Optional)
```typescript
// src/utils/error-tracker.ts
import * as Sentry from '@sentry/node';

export const initErrorTracking = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV
    });
  }
};
```

## 3. Performance Optimization

### 3.1 Basic Caching
```typescript
// src/utils/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cache = {
  get: async (key: string) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  set: async (key: string, value: any, ttl?: number) => {
    const stringValue = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, stringValue);
    } else {
      await redis.set(key, stringValue);
    }
  }
};
```

### 3.2 Rate Limiting
```typescript
// src/middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 4. Security

### 4.1 Basic Security Headers
```typescript
// src/middleware/security.ts
import helmet from 'helmet';

export const securityMiddleware = [
  helmet(),
  (req: any, res: any, next: any) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  }
];
```

### 4.2 Environment Variables
```env
# .env
NODE_ENV=development
PORT=3000
DB_HOST=db
DB_PORT=3306
DB_NAME=hotel_db
DB_USER=user
DB_PASSWORD=password
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
```

## 5. Health Check

### 5.1 Basic Health Check
```typescript
// src/routes/health.ts
import { Router } from 'express';
import { createConnection } from 'typeorm';
import Redis from 'ioredis';

const router = Router();
const redis = new Redis(process.env.REDIS_URL);

router.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbConnection = await createConnection();
    await dbConnection.query('SELECT 1');
    
    // Check Redis connection
    await redis.ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

export default router;
```

## 6. Deployment

### 6.1 Production Dockerfile
```dockerfile
# Dockerfile.prod
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 6.2 Production Environment
```env
# .env.production
NODE_ENV=production
PORT=3000
DB_HOST=db
DB_PORT=3306
DB_NAME=hotel_db
DB_USER=user
DB_PASSWORD=password
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
```

## 7. Monitoring

### 7.1 Basic Metrics
```typescript
// src/middleware/metrics.ts
import { Request, Response, NextFunction } from 'express';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(JSON.stringify({
      type: 'request',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration,
      timestamp: new Date().toISOString()
    }));
  });
  
  next();
};
``` 