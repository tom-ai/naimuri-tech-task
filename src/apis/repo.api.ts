import type { GitHubRepo } from '@root/types';
import { Api } from './api';

export class RepoApi extends Api {
  static async getAllRepositoriesByUser(login: string): Promise<GitHubRepo[]> {
    const repositories = await this.get<GitHubRepo[]>(`/users/${login}/repos`); // make generic

    return repositories;
  }

  static async getSingleRepositoryByUser<T = GitHubRepo>(
    login: string,
    repoName: string
  ): Promise<T> {
    const repository = await this.get<T>(`/repos/${login}/${repoName}`);

    return repository;
  }
}
