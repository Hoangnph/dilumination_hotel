export interface Room {
  id: number;
  hotel_id: number;
  type: string;
  price: number;
  status: 'available' | 'booked';
  created_at: Date;
  updated_at: Date;
} 