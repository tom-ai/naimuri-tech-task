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
};

export function mapGitHubRepos(repos: GitHubRepo[]): Repo[] {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: {
      login: repo.owner.login,
      htmlUrl: repo.owner.html_url,
    },
    htmlUrl: repo.html_url,
    description: repo.description,
    forks: repo.forks_count,
    stars: repo.stargazers_count,
    issues: repo.open_issues_count,
  }));
}
