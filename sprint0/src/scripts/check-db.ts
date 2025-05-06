import { createConnection } from 'typeorm';
import { config } from 'dotenv';

config();

async function checkDatabase() {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.query('SELECT 1');
    console.log('✅ Database connection successful');
    await connection.close();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

checkDatabase(); 