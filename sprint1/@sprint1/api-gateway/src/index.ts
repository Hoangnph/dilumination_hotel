import express from 'express';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();

app.use('/api/hotels', createProxyMiddleware({
  target: process.env.HOTEL_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/hotels': '/hotels' }
}));

app.use('/api/rooms', createProxyMiddleware({
  target: process.env.ROOM_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/rooms': '/rooms' }
}));

app.use('/api/bookings', createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/bookings': '/bookings' }
}));

app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/users' }
}));

app.use('/api/auth', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '/auth' }
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway', timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API Gateway listening on port ${port}`);
  });
}

export default app; 