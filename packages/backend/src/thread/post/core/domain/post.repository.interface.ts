import {Post} from '@prisma/client';

export interface FindOptions {
  skip?: number;
  take?: number;
  orderBy?: {
    [P in keyof Post]?: 'asc' | 'desc';
  };
}

export interface IPostRepository {
  findByThreadId(threadId: number, options: FindOptions): Promise<Post[]>;
  countByThreadId(threadId: number): Promise<number>;
}
export const SYMBOL = Symbol('IPostRepository');
