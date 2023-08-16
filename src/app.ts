import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';

import ApiError from './errors/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import requestLogging from './middlewares/requestLogging';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(cors());
app.options('*', cors());

app.use(routes);

app.use(requestLogging);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;
