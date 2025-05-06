import { User } from '../models/user';
import { getUserByEmail, createUser } from './user_service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

export async function registerUser(data: { name: string; email: string; password: string; role?: User['role'] }): Promise<User> {
  const password_hash = await bcrypt.hash(data.password, 10);
  return createUser({
    name: data.name,
    email: data.email,
    password_hash,
    role: data.role || 'customer'
  });
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: User } | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user };
}

export function verifyToken(token: string): { id: number; role: User['role'] } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; role: User['role'] };
  } catch {
    return null;
  }
} 