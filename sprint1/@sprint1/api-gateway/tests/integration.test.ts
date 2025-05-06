import 'dotenv/config';
import request from 'supertest';
import app from '../src/index';
import waitOn from 'wait-on';

describe('API Gateway Integration', () => {
  beforeAll(async () => {
    await waitOn({
      resources: [
        process.env.HOTEL_SERVICE_URL + '/health',
        process.env.ROOM_SERVICE_URL + '/health'
      ],
      timeout: 30000
    });
  });

  let hotelId: number;
  let roomId: number;

  it('should create a hotel via gateway', async () => {
    const res = await request(app)
      .post('/api/hotels')
      .send({ name: 'Gateway Hotel', address: '1 Gateway St', description: 'Hotel via gateway' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    hotelId = res.body.id;
  });

  it('should create a room via gateway with hotel_id', async () => {
    const res = await request(app)
      .post('/api/rooms')
      .send({ hotel_id: hotelId, type: 'suite', price: 200, status: 'available' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.hotel_id).toBe(hotelId);
    roomId = res.body.id;
  });

  it('should get hotel list via gateway', async () => {
    const res = await request(app).get('/api/hotels');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get room list via gateway', async () => {
    const res = await request(app).get('/api/rooms');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
}); 