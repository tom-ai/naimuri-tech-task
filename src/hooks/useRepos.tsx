import { RepoApi } from '@root/apis/repo.api';
import { type Repo } from '@root/types';
import { mapGitHubRepos } from '@root/utils/helpers';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export function useRepos(userLogin: string): {
  state: Repo[];
  isLoading: boolean;
  error: AxiosError | null;
};
export function useRepos(
  userLogin: string,
  repositoryName?: string
): {
  state: Repo;
  isLoading: boolean;
  error: AxiosError | null;
};
export function useRepos(
  userLogin: string,
  repositoryName?: string
): {
  state: Repo | Repo[];
  isLoading: boolean;
  error: AxiosError | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<Repo | Repo[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (!userLogin) return;
    setIsLoading(true);
    setError(null);

    if (repositoryName) {
      RepoApi.getSingleRepositoryByUser(userLogin, 'naimuri-tech-task')
        .then((data) => {
          const mappedRepo = mapGitHubRepos(data);
          setState(mappedRepo);
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      RepoApi.getAllRepositoriesByUser(userLogin)
        .then((data) => {
          const mappedRepos = mapGitHubRepos(data);
          setState(mappedRepos);
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userLogin, repositoryName]);

  return { state, isLoading, error };
}
