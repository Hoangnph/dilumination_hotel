import { Room } from '../src/models/room';

describe('Room Model', () => {
  it('should create a valid room object', () => {
    const now = new Date();
    const room: Room = {
      id: 1,
      hotel_id: 1,
      type: 'deluxe',
      price: 100,
      status: 'available',
      created_at: now,
      updated_at: now
    };
    expect(room.id).toBe(1);
    expect(room.hotel_id).toBe(1);
    expect(room.type).toBe('deluxe');
    expect(room.price).toBe(100);
    expect(room.status).toBe('available');
    expect(room.created_at).toBeInstanceOf(Date);
    expect(room.updated_at).toBeInstanceOf(Date);
  });
}); 