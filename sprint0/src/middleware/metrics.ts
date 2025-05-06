import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration,
      userAgent: req.get('user-agent'),
      ip: req.ip,
    });
  });

  next();
}; 