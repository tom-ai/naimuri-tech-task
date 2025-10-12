import { RepoApi } from '@root/apis/repo.api';
import { type Repo } from '@root/types';
import { mapGitHubRepos } from '@root/utils/helpers';
import { useEffect, useState } from 'react';

export function useRepos(userLogin: string): {
  state: Repo[];
  isLoading: boolean;
};
export function useRepos(
  userLogin: string,
  repositoryName?: string
): {
  state: Repo;
  isLoading: boolean;
};
export function useRepos(
  userLogin: string,
  repositoryName?: string
): {
  state: Repo | Repo[];
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<Repo | Repo[]>([]);

  useEffect(() => {
    setIsLoading(true);

    // if i have two args do this
    if (repositoryName) {
      RepoApi.getSingleRepositoryByUser(userLogin, 'naimuri-tech-task')
        .then((data) => {
          const mappedRepo = mapGitHubRepos(data);
          setState(mappedRepo);
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // if i have one arg do this
      RepoApi.getAllRepositoriesByUser(userLogin)
        .then((data) => {
          const mappedRepos = mapGitHubRepos(data);
          setState(mappedRepos);
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userLogin, repositoryName]);

  return { state, isLoading };
}
