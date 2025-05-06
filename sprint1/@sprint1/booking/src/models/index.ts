import { Sequelize } from 'sequelize-typescript';
import { BookingModel } from './booking.model';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'booking',
  models: [BookingModel],
  logging: false
});

export { sequelize, BookingModel }; 