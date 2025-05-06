import { Booking } from '../src/models/booking';

describe('Booking Model', () => {
  it('should create a valid booking object', () => {
    const now = new Date();
    const booking: Booking = {
      id: 1,
      user_id: 1,
      room_id: 2,
      checkin: '2025-05-10',
      checkout: '2025-05-12',
      status: 'pending',
      created_at: now,
      updated_at: now
    };
    expect(booking.id).toBe(1);
    expect(booking.user_id).toBe(1);
    expect(booking.room_id).toBe(2);
    expect(booking.checkin).toBe('2025-05-10');
    expect(booking.checkout).toBe('2025-05-12');
    expect(booking.status).toBe('pending');
    expect(booking.created_at).toBeInstanceOf(Date);
    expect(booking.updated_at).toBeInstanceOf(Date);
  });
}); 