import { Request, Response } from 'express';

export type PaginatedResponse<T> = Response<{ data: T[]; totalRecords: number }>;

export type PaginatedRequest<T = unknown, ResBody = unknown, ReqBody = unknown> = Request<
  T,
  ResBody,
  ReqBody,
  { page: number; perPage: number }
>;
