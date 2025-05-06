import request from 'supertest';
import app from '../src/index';
import { reset_bookings } from '../src/services/booking_service';

describe('Booking API', () => {
  beforeAll(async () => await reset_bookings());
  afterAll(async () => await reset_bookings());
  let createdId: number;
  const bookingData = {
    user_id: 1,
    room_id: 1,
    checkin: '2025-05-10',
    checkout: '2025-05-12',
    status: 'pending'
  };

  it('should create a new booking', async () => {
    const res = await request(app)
      .post('/bookings')
      .send(bookingData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('should not allow double booking for same room and date', async () => {
    const res = await request(app)
      .post('/bookings')
      .send(bookingData);
    expect(res.status).toBe(409);
  });

  it('should get booking list', async () => {
    const res = await request(app).get('/bookings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get booking detail', async () => {
    const res = await request(app).get(`/bookings/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('should update booking', async () => {
    const res = await request(app)
      .put(`/bookings/${createdId}`)
      .send({ status: 'confirmed' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('confirmed');
  });

  it('should delete booking', async () => {
    const res = await request(app).delete(`/bookings/${createdId}`);
    expect(res.status).toBe(204);
  });
}); 