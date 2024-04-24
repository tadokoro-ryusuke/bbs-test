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

  async count(): Promise<number> {
    const totalThreads = await this.prismaService.thread.count();

    return totalThreads;
  }
}
