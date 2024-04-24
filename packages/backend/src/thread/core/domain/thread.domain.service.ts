import {Injectable} from '@nestjs/common';

import {ThreadRepository} from '@/thread/core/infra/thread.repository.prisma';
import {Pagination} from '@/types/pagination';

@Injectable()
export class ThreadService {
  constructor(private readonly threadRepository: ThreadRepository) {}

  async find({page, limit}: Pagination) {
    return this.threadRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const thread = await this.threadRepository.findOne(id);

    if (!thread) {
      throw new Error('Thread not found');
    }

    return thread;
  }

  async findOneByIdAndUserId(id: number, userId: string) {
    const thread = await this.threadRepository.findOneByIdAndUserId(id, userId);

    if (!thread) {
      throw new Error('Thread not found');
    }

    return thread;
  }

  async count() {
    return this.threadRepository.count();
  }

  async create({title, userId}: {title: string; userId: string}) {
    return this.threadRepository.create({
      title,
      userId,
    });
  }

  async delete({id, userId}: {id: number; userId: string}) {
    const thread = await this.findOneByIdAndUserId(id, userId);

    await this.threadRepository.delete(thread.id, userId);
  }
}
