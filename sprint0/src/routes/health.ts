import { Router } from 'express';
import { createConnection } from 'typeorm';
import Redis from 'ioredis';
import logger from '../utils/logger';

const router = Router();
const redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379');

let dbConnection: any = null;

router.get('/health', async (_, res) => {
  try {
    // Check database connection
    if (!dbConnection) {
      dbConnection = await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        name: 'health_check',
      });
    }
    await dbConnection.query('SELECT 1');

    // Check Redis connection
    await redis.ping();

    logger.info('Health check passed');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        redis: 'up',
      },
    });
  } catch (error) {
    logger.error('Health check failed', { error });
    res.status(500).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router; 