export interface GithubUser {
  name?: string;
  email?: string;
  login: string;
  id: number;
  node_id: number;
  avatar_url: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at: string;
}

// TODO: unknown types
export interface GithubRepositoryIssue {
  id: number;
  node_id: number;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  state_reason?: 'completed' | 'reopened' | 'not_planned';
  title: string;
  body?: string;
  user?: GithubUser;
  labels: unknown;
  assignee: GithubUser;
  milestone: unknown;
  locked: boolean;
  active_lock_reason?: string;
  comments: number;
  pull_request: unknown;
  closed_at: string;
  created_at: string;
  updated_at: string;
  draft: boolean;
  closed_by: unknown;
  body_html: string;
  body_text: string;
  timeline_url: string;
  repository: unknown;
  performed_via_github_app?: unknown;
  author_association: unknown;
  reactions: unknown[];
}
