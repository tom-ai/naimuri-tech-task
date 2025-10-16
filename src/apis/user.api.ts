import { Api } from './api';
import type { Owner } from '@root/types';

export class UserApi extends Api {
  // not fully implemented
  static async getUser<T = Owner>(login: string): Promise<T> {
    const user = await this.get<T>(`/users/${login}`);

    if (!user) throw new Error('User not found');
    return user;
  }
}
