import { User } from '../models/user';
import { getDbConnection } from '../utils/db';

export async function createUser(data: Partial<User>): Promise<User> {
  const conn = await getDbConnection();
  const now = new Date();
  const [result] = await conn.execute(
    `INSERT INTO users (name, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.email, data.password_hash, data.role || 'customer', now, now]
  );
  const id = (result as any).insertId;
  const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
  await conn.end();
  return (rows as any[])[0] as User;
}

export async function getUsers(): Promise<User[]> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM users');
  await conn.end();
  return rows as User[];
}

export async function getUserById(id: number): Promise<User | null> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
  await conn.end();
  return (rows as any[])[0] || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
  await conn.end();
  return (rows as any[])[0] || null;
}

export async function updateUser(id: number, data: Partial<User>): Promise<User | null> {
  const conn = await getDbConnection();
  const [result] = await conn.execute(
    `UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), password_hash = COALESCE(?, password_hash), role = COALESCE(?, role), updated_at = ? WHERE id = ?`,
    [data.name ?? null, data.email ?? null, data.password_hash ?? null, data.role ?? null, new Date(), id]
  );
  if ((result as any).affectedRows === 0) {
    await conn.end();
    return null;
  }
  const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
  await conn.end();
  return (rows as any[])[0] || null;
}

export async function deleteUser(id: number): Promise<boolean> {
  const conn = await getDbConnection();
  const [result] = await conn.execute('DELETE FROM users WHERE id = ?', [id]);
  await conn.end();
  return (result as any).affectedRows > 0;
} 