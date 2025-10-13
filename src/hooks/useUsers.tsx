import { UserApi } from '@root/apis/user.api';
import type { Owner } from '@root/types';
import { useEffect, useState } from 'react';

export function useUsers(login: string) {
  const [state, setState] = useState<Owner | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    UserApi.getUser(login)
      .then((data) => {
        setState(data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [login]);

  return { state, isLoading };
}
