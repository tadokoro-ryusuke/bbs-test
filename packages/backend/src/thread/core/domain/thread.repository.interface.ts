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
}
export const SYMBOL = Symbol('IThreadRepository');
