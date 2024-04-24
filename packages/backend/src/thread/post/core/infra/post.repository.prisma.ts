import {Injectable} from '@nestjs/common';
import {Post} from '@prisma/client';

import {PrismaService} from '@/prisma/prisma.service';
import {FindOptions} from '@/thread/core/domain/thread.repository.interface';
import {IPostRepository} from '@/thread/post/core/domain/post.repository.interface';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByThreadId(threadId: number, options: FindOptions): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        threadId,
      },
      ...options,
    });

    return posts;
  }

  async countByThreadId(threadId: number): Promise<number> {
    const totalPosts = await this.prismaService.post.count({
      where: {
        threadId,
      },
    });

    return totalPosts;
  }
}
