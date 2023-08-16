import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AxiosError } from 'axios';
import catchAsync from '@/errors/catchAsync';
import logModel from '@/models/log.model';
import { PaginatedRequest, PaginatedResponse } from '@/types';
import ApiError from '@/errors/ApiError';
import { GithubRepositoryIssue } from './github.types';
import githubClient from './github.client';

const getRepositoryIssues = catchAsync(
  async (req: PaginatedRequest<{ owner: string; repo: string }>, res: PaginatedResponse<GithubRepositoryIssue>) => {
    const { owner, repo } = req.params;
    const { page, perPage } = req.query;

    try {
      const [repositoryInfo, issues] = await Promise.all([
        githubClient.getRepository(owner, repo),
        githubClient.getRepositoryIssues(owner, repo, {
          page,
          per_page: perPage,
        }),
      ]);

      res.status(httpStatus.OK).json({
        data: issues,
        totalRecords: repositoryInfo.open_issues_count,
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === httpStatus.NOT_FOUND) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Repository not found');
      }
    }
  },
);

const getIssue = catchAsync(async (req: Request, res: Response) => {
  const { owner, repo, id } = req.params;

  const [issue, comments] = await Promise.all([
    githubClient.getIssue(owner, repo, Number(id)),
    githubClient.getIssueComments(owner, repo, Number(id)),
  ]);

  res.status(httpStatus.OK).json({ issue, comments });
});

const getTotalSearches = catchAsync(async (_req: Request, res: Response) => {
  const count = await logModel.count();

  res.status(httpStatus.OK).json(count);
});

export default { getRepositoryIssues, getIssue, getTotalSearches };
