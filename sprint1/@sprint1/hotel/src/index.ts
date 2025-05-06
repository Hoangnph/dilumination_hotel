import express from 'express';
import dotenv from 'dotenv';
import hotelRouter from './routes/hotel';

dotenv.config();

const app = express();
app.use(express.json());

app.use(hotelRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'hotel', timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Hotel service listening on port ${port}`);
  });
}

export default app; 