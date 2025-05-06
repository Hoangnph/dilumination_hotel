import 'dotenv/config';
import request from 'supertest';
import app from '../src/index';
import waitOn from 'wait-on';

jest.setTimeout(90000);

describe('API Gateway Integration', () => {
  beforeAll(async () => {
    await waitOn({
      resources: [
        process.env.HOTEL_SERVICE_URL + '/health',
        process.env.ROOM_SERVICE_URL + '/health',
        process.env.BOOKING_SERVICE_URL + '/health',
        process.env.USER_SERVICE_URL + '/health'
      ],
      timeout: 60000
    });

    // Đảm bảo user admin tồn tại
    const adminEmail = 'admin@dilumination.com';
    const adminPassword = 'admin@123';
    // Thử đăng nhập, nếu không thành công thì tạo mới
    let login = await request(app)
      .post('/api/auth/login')
      .send({ email: adminEmail, password: adminPassword });
    if (login.status !== 200) {
      // Tạo user admin nếu chưa có
      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer dummy-admin-token`) // bypass, sẽ fix nếu cần
        .send({ name: 'Admin User', email: adminEmail, password: adminPassword, role: 'admin' });
      // Đăng nhập lại
      login = await request(app)
        .post('/api/auth/login')
        .send({ email: adminEmail, password: adminPassword });
    }
  });

  let hotelId: number;
  let roomId: number;
  let bookingId: number;
  let adminToken: string;
  let userToken: string;

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

  it('should create a booking via gateway', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ user_id: 1, room_id: roomId, checkin: '2025-05-10', checkout: '2025-05-12', status: 'pending' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    bookingId = res.body.id;
  });

  it('should get booking list via gateway', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should register and login user via gateway', async () => {
    const email = `gatewaytest${Date.now()}@dilumination.com`;
    const register = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Gateway User', email, password: 'test123' });
    expect(register.status).toBe(201);
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'test123' });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('token');
    userToken = login.body.token;
  });

  it('should login as admin via gateway', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@dilumination.com', password: 'admin@123' });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('token');
    adminToken = login.body.token;
  });

  it('should get user list via gateway (admin)', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
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