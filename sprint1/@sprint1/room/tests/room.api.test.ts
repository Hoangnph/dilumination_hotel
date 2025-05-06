import request from 'supertest';
import app from '../src/index';

describe('Room API', () => {
  let createdId: number;

  it('should create a new room', async () => {
    const res = await request(app)
      .post('/rooms')
      .send({
        hotel_id: 1,
        type: 'deluxe',
        price: 120,
        status: 'available'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.type).toBe('deluxe');
    createdId = res.body.id;
  });

  it('should get room list', async () => {
    const res = await request(app).get('/rooms');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get room detail', async () => {
    const res = await request(app).get(`/rooms/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('should update room', async () => {
    const res = await request(app)
      .put(`/rooms/${createdId}`)
      .send({ type: 'suite' });
    expect(res.status).toBe(200);
    expect(res.body.type).toBe('suite');
  });

  it('should delete room', async () => {
    const res = await request(app).delete(`/rooms/${createdId}`);
    expect(res.status).toBe(204);
  });
}); 