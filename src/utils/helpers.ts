import type { GitHubRepo, Repo, RepoLanguageOnly } from '@root/types';

export function getLanguagesUsed<T extends RepoLanguageOnly>(
  repos: T[]
): string[] {
  //   const languages = repos.filter((repo) => repo.language != null);

  const languages = repos
    .map((repo) => repo.language)
    .filter((language) => language != null);

  return [...new Set(languages)].sort();
}

export function mapGitHubRepos(repo: GitHubRepo): Repo;
export function mapGitHubRepos(repos: GitHubRepo[]): Repo[];
export function mapGitHubRepos(
  repoData: GitHubRepo | GitHubRepo[]
): Repo | Repo[] {
  const mapRepo = (repo: GitHubRepo) => {
    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      owner: {
        login: repo.owner.login,
        htmlUrl: repo.owner.html_url,
        name: repo.owner.name,
      },
      htmlUrl: repo.html_url,
      description: repo.description,
      forks: repo.forks_count,
      stars: repo.stargazers_count,
      issues: repo.open_issues_count,
      language: repo.language,
    };
  };

  if (Array.isArray(repoData)) {
    return repoData.map((repo) => mapRepo(repo));
  } else {
    return mapRepo(repoData);
  }
}
