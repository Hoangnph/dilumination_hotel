import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/room';

dotenv.config();

const app = express();
app.use(express.json());

app.use(roomRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'room', timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 3002;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Room service listening on port ${port}`);
  });
}

export default app; 