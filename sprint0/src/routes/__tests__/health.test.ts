import request from 'supertest';
import express from 'express';
import healthRouter from '../health';

jest.mock('typeorm', () => ({
  createConnection: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue([{ test: 1 }]),
  }),
}));

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {
    return {
      ping: jest.fn().mockResolvedValue('PONG'),
    };
  });
});

const app = express();
app.use('/api', healthRouter);

describe('Health Check Endpoint', () => {
  it('should return 200 and healthy status when all services are up', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('services');
    expect(response.body.services).toHaveProperty('database', 'up');
    expect(response.body.services).toHaveProperty('redis', 'up');
  });
}); 