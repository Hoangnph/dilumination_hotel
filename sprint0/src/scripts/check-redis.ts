import Redis from 'ioredis';
import { config } from 'dotenv';

config();

async function checkRedis() {
  try {
    const redis = new Redis(process.env.REDIS_URL);
    await redis.ping();
    console.log('✅ Redis connection successful');
    await redis.quit();
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    process.exit(1);
  }
}

checkRedis(); 