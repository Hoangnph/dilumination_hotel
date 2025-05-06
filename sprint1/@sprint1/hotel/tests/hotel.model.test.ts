import { Hotel } from '../src/models/hotel';

describe('Hotel Model', () => {
  it('should create a valid hotel object', () => {
    const now = new Date();
    const hotel: Hotel = {
      id: 1,
      name: 'Hotel Test',
      address: '123 Main St',
      created_at: now,
      updated_at: now
    };
    expect(hotel.id).toBe(1);
    expect(hotel.name).toBe('Hotel Test');
    expect(hotel.address).toBe('123 Main St');
    expect(hotel.created_at).toBeInstanceOf(Date);
    expect(hotel.updated_at).toBeInstanceOf(Date);
  });

  it('should allow optional description', () => {
    const now = new Date();
    const hotel: Hotel = {
      id: 2,
      name: 'Hotel Desc',
      address: '456 Main St',
      description: 'A nice hotel',
      created_at: now,
      updated_at: now
    };
    expect(hotel.description).toBe('A nice hotel');
  });
}); 