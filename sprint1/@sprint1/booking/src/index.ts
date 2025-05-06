import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import bookingRoutes from './routes/booking_routes';
import { sequelize } from './models';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'booking', timestamp: new Date().toISOString() });
});

app.use('/bookings', bookingRoutes);

const port = process.env.PORT || 3003;
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Booking service listening on port ${port}`);
    });
  });
}

export default app; 