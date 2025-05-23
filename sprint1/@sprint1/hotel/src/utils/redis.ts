import { createClient } from 'redis';

export function getRedisClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  client.on('error', (err: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Redis Client Error', err);
  });
  return client;
} 