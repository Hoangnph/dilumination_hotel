export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'hotel' | 'staff' | 'customer';
  created_at: Date;
  updated_at: Date;
} 