import httpStatus from 'http-status';

import catchAsync from '@/errors/catchAsync';
import logModel, { Log } from '@/models/log.model';
import { PaginatedRequest, PaginatedResponse } from '@/types';

const getStats = catchAsync(async (req: PaginatedRequest, res: PaginatedResponse<Log>) => {
  const { page, perPage } = req.query;

  const [logs, totalRecords] = await Promise.all([
    logModel
      .find()
      .sort({ time: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage),
    logModel.count(),
  ]);

  res.status(httpStatus.OK).json({ data: logs, totalRecords });
});

export default { getStats };
