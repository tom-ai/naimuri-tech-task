import { RepoApi } from '@root/apis/repo.api';
import { mapGitHubRepos, type Repo } from '@root/types';
import { useEffect, useState } from 'react';

export function useRepos(userLogin: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<Repo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    RepoApi.getReposByUser(userLogin)
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
  }, [userLogin]);

  return { state, isLoading };
}
