export type Owner = {
  login: string;
  htmlUrl: string;
};

export type Repo = {
  id: string;
  name: string;
  fullName: string;
  owner: Owner;
  htmlUrl: string;
  description: string;
  issues: number;
  stars: number;
  forks: number;
  language?: string;
};

type GitHubOwner = {
  login: string;
  html_url: string;
};

export type GitHubRepo = {
  id: string;
  name: string;
  full_name: string;
  owner: GitHubOwner;
  html_url: string;
  description: string;
  open_issues_count: number;
  stargazers_count: number;
  forks_count: number;
  language?: string;
};

export type RepoLanguageOnly = Pick<Repo, 'language'>;