import mongoose from 'mongoose';

import config from '@/modules/config/config';
import logger from '@/modules/config/logger';
import app from './app';

let server;
mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info('Connected to database');
    server = app.listen(config.port, () => {
      logger.info(`Listeting on port ${config.port}`);
    });
  })
  .catch((err) => logger.error(err));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
