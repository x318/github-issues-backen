import axios from 'axios';

import config from '@/modules/config/config';
import { GithubRepositoryIssue } from './github.types';

const client = axios.create({
  baseURL: config.github.apiUrl,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${config.github.token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

const getRepository = async (owner: string, repo: string) => {
  const response = await client.get(`/repos/${owner}/${repo}`);
  return response.data;
};

const getRepositoryIssues = async (
  owner: string,
  repo: string,
  params: { page: number; per_page: number } = { page: 1, per_page: 100 },
) => {
  const stringParams = new URLSearchParams(params as unknown as Record<string, string>).toString();
  const response = await client.get<GithubRepositoryIssue[]>(`/repos/${owner}/${repo}/issues?${stringParams}`);
  return response.data;
};

const getIssue = async (owner: string, repo: string, id: number) => {
  const response = await client.get<GithubRepositoryIssue[]>(`/repos/${repo}/${owner}/issues/${id}`);
  return response.data;
};

const getIssueComments = async (owner: string, repo: string, id: number) => {
  const response = await client.get<GithubRepositoryIssue[]>(`/repos/${repo}/${owner}/issues/${id}/comments`);
  return response.data;
};

export default {
  getRepository,
  getRepositoryIssues,
  getIssue,
  getIssueComments,
};
