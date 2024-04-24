import {Thread} from '@/thread/core/domain/thread.entity';

export interface FindOptions {
  skip?: number;
  take?: number;
  orderBy?: {
    [P in keyof Thread]?: 'asc' | 'desc';
  };
}

export interface IThreadRepository {
  find(options: FindOptions): Promise<Thread[]>;
  findOne(id: number): Promise<Thread | null>;
  count(): Promise<number>;
  create(data: {title: string; userId: string}): Promise<Thread>;
  findOneByIdAndUserId(id: number, userId: string): Promise<Thread | null>;
  delete(id: number, userId: string): Promise<void>;
}
export const SYMBOL = Symbol('IThreadRepository');
