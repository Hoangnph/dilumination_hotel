import { getDbConnection } from '../src/utils/db';
import bcrypt from 'bcrypt';

export async function resetUsers() {
  const conn = await getDbConnection();
  await conn.execute('DELETE FROM users');
  await conn.execute('ALTER TABLE users AUTO_INCREMENT = 1');
  const password_hash = await bcrypt.hash('admin@123', 10);
  await conn.execute(
    `INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [1, 'Admin User', 'admin@dilumination.com', password_hash, 'admin']
  );
  await conn.end();
} 