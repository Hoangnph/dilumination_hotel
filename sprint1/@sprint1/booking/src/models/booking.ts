export interface Booking {
  id: number;
  user_id: number;
  room_id: number;
  checkin: string; // ISO date
  checkout: string; // ISO date
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
} 