import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import healthRouter from './routes/health';
import { metricsMiddleware } from './middleware/metrics';
import { apiLimiter, securityHeaders } from './middleware/security';
import logger from './utils/logger';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);
app.use(apiLimiter);
app.use(securityHeaders);

// Routes
app.use('/api', healthRouter);

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 