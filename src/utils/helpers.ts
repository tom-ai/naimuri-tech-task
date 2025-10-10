import type { RepoLanguageOnly } from '@root/types';

export function getLanguagesUsed<T extends RepoLanguageOnly>(
  repos: T[]
): string[] {
  //   const languages = repos.filter((repo) => repo.language != null);

  const languages = repos
    .map((repo) => repo.language)
    .filter((language) => language != null);
    
  return [...new Set(languages)].sort();
}
