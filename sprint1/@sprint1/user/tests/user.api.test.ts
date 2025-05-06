import request from 'supertest';
import app from '../src/index';
import jwt from 'jsonwebtoken';
import { resetUsers } from './setup';

process.env.JWT_SECRET = 'test-secret';

describe('User API', () => {
  let createdId: number;
  let adminToken: string;

  beforeAll(async () => {
    await resetUsers();
    adminToken = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET as string);
  });

  it('should get user list (admin)', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new user (admin)', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test User', email: 'testuser@dilumination.com', password_hash: 'hash', role: 'customer' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('should get user detail (admin)', async () => {
    const res = await request(app)
      .get(`/users/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('should update user (admin)', async () => {
    const res = await request(app)
      .put(`/users/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Updated User' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated User');
  });

  it('should delete user (admin)', async () => {
    const res = await request(app)
      .delete(`/users/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
}); 