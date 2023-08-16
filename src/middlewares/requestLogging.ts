import { NextFunction, Request, Response } from 'express';
import logModel from '@/models/log.model';
import logger from '@/modules/config/logger';

const requestLogging = (req: Request, res: Response, next: NextFunction) => {
  logModel
    .create({ ip: req.socket.remoteAddress, time: Date.now().toString(), type: req.originalUrl, method: req.method })
    .catch((err) => next(err));

  logger.info(`${req.method}: ${req.path}`);
  next();
};

export default requestLogging;
