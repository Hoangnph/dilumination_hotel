import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user', timestamp: new Date().toISOString() });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 3004;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`User/Auth service listening on port ${port}`);
  });
}

export default app; 