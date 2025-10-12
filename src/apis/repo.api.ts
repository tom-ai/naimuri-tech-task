import type { GitHubRepo } from '@root/types';
import { Api } from './api';

export class RepoApi extends Api {
  static async getReposByUser(login: string): Promise<GitHubRepo[]> {
    const repos = await this.get<GitHubRepo[]>(`/users/${login}/repos`); // make generic

    if (!repos) throw new Error('Repos not found');
    return repos;
  }
}
