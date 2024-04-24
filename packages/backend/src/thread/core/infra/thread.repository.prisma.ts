import {Injectable} from '@nestjs/common';

import {PrismaService} from '@/prisma/prisma.service';
import {Thread} from '@/thread/core/domain/thread.entity';
import {FindOptions, IThreadRepository} from '@/thread/core/domain/thread.repository.interface';

@Injectable()
export class ThreadRepository implements IThreadRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(options: FindOptions): Promise<Thread[]> {
    const threads = await this.prismaService.thread.findMany(options);

    return threads;
  }

  async findOne(id: number): Promise<Thread | null> {
    const thread = await this.prismaService.thread.findUnique({
      where: {
        id,
      },
    });

    return thread;
  }

  async findOneByIdAndUserId(id: number, userId: string): Promise<Thread | null> {
    const thread = await this.prismaService.thread.findUnique({
      where: {
        id,
        userId,
      },
    });

    return thread;
  }

  async count(): Promise<number> {
    const totalThreads = await this.prismaService.thread.count();

    return totalThreads;
  }

  async create(data: {title: string; userId: string}): Promise<Thread> {
    const thread = await this.prismaService.thread.create({
      data,
    });

    return thread;
  }

  async delete(id: number, userId: string): Promise<void> {
    await this.prismaService.thread.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
