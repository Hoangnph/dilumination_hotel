import request from 'supertest';
import app from '../src/index';

describe('Hotel API', () => {
  let createdId: number;
  const now = new Date();

  it('should create a new hotel', async () => {
    const res = await request(app)
      .post('/hotels')
      .send({
        name: 'Hotel API',
        address: '789 Main St',
        description: 'API test hotel'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Hotel API');
    createdId = res.body.id;
  });

  it('should get hotel list', async () => {
    const res = await request(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get hotel detail', async () => {
    const res = await request(app).get(`/hotels/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('should update hotel', async () => {
    const res = await request(app)
      .put(`/hotels/${createdId}`)
      .send({ name: 'Hotel API Updated' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Hotel API Updated');
  });

  it('should delete hotel', async () => {
    const res = await request(app).delete(`/hotels/${createdId}`);
    expect(res.status).toBe(204);
  });
}); 