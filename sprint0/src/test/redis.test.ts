import Redis from 'ioredis';
import { config } from 'dotenv';

config();

describe('Redis Connection', () => {
  let redis: Redis;

  beforeAll(() => {
    redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379');
  });

  afterAll(async () => {
    await redis.quit();
  });

  it('should connect to Redis successfully', async () => {
    const pong = await redis.ping();
    expect(pong).toBe('PONG');
  });

  it('should set and get a value', async () => {
    const key = 'test:key';
    const value = 'test:value';

    await redis.set(key, value);
    const result = await redis.get(key);
    expect(result).toBe(value);

    await redis.del(key);
  });
}); 