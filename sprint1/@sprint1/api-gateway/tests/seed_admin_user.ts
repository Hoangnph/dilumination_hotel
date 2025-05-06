import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

async function seedAdminUser() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin@123',
    database: process.env.DB_NAME || 'hotel_db',
  });
  await conn.execute('DELETE FROM users');
  await conn.execute('ALTER TABLE users AUTO_INCREMENT = 1');
  const password_hash = await bcrypt.hash('admin@123', 10);
  await conn.execute(
    `INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [1, 'Admin User', 'admin@dilumination.com', password_hash, 'admin']
  );
  await conn.end();
  // eslint-disable-next-line no-console
  console.log('Seeded admin user successfully');
}

seedAdminUser().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Failed to seed admin user:', err);
  process.exit(1);
}); 