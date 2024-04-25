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
  delete(threadId: number): Promise<void>;
  deleteById(threadId: number, postId: number, userId: string): Promise<void>;
  create({
    threadId,
    userId,
    content,
  }: {
    threadId: number;
    userId: string;
    content: string;
  }): Promise<Post>;
  update({
    threadId,
    postId,
    userId,
    content,
  }: {
    threadId: number;
    postId: number;
    userId: string;
    content: string;
  }): Promise<Post>;
}
export const SYMBOL = Symbol('IPostRepository');
