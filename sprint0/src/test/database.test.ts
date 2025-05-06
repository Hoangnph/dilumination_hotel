import { createConnection } from 'typeorm';
import { config } from 'dotenv';

config();

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    expect(connection.isConnected).toBe(true);
    await connection.close();
  });

  it('should execute a simple query', async () => {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const result = await connection.query('SELECT 1 as test');
    expect(parseInt(result[0].test)).toBe(1);
    await connection.close();
  });
}); 