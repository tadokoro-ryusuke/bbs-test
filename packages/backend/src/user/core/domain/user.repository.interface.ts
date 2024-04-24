import {User} from '@/user/core/domain/user.entity';

export interface IUserRepository {
  upsert(data: {id: string; username: string}): Promise<User>;
}
export const SYMBOL = Symbol('IUserRepository');
