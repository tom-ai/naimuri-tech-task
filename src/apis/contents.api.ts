import type { Repo } from '@root/types';
import { Api } from './api';

export class ContentsApi extends Api {
  static async getRepositoryReadme({ owner, name }: Repo): Promise<string> {
    const readme = await this.get<string>(
      `/repos/${owner.login}/${name}/readme`,
      'text',
      'raw'
    );

    return readme;
  }
}
