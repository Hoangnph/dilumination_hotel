import request from 'supertest';
import app from '../src/index';
import jwt from 'jsonwebtoken';
import { resetUsers } from './setup';

describe('Auth API', () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    await resetUsers();
  });

  it('should register a new customer', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'Customer Test', email: 'customer_test@dilumination.com', password: 'test123' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'customer_test@dilumination.com', password: 'test123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should verify token', async () => {
    const res = await request(app)
      .post('/auth/verify')
      .send({ token });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('role');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'customer_test@dilumination.com', password: 'wrongpass' });
    expect(res.status).toBe(401);
  });
}); 