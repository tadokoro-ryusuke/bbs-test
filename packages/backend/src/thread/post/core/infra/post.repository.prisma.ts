import {Injectable} from '@nestjs/common';
import {Post} from '@prisma/client';

import {PrismaService} from '@/prisma/prisma.service';
import {FindOptions} from '@/thread/core/domain/thread.repository.interface';
import {IPostRepository} from '@/thread/post/core/domain/post.repository.interface';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByUserId({
    threadId,
    postId,
    userId,
  }: {
    threadId: number;
    postId: number;
    userId: string;
  }): Promise<Post | null> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
        threadId,
        userId,
      },
    });

    return post;
  }

  async delete(threadId: number): Promise<void> {
    await this.prismaService.post.deleteMany({
      where: {
        threadId,
      },
    });
  }

  async deleteById(threadId: number, postId: number, userId: string): Promise<void> {
    await this.prismaService.post.delete({
      where: {
        id: postId,
        threadId,
        userId,
      },
    });
  }

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

  async create({
    threadId,
    userId,
    content,
  }: {
    threadId: number;
    userId: string;
    content: string;
  }): Promise<Post> {
    const post = await this.prismaService.post.create({
      data: {
        threadId,
        userId,
        content,
      },
    });

    return post;
  }

  async update({
    threadId,
    postId,
    userId,
    content,
  }: {
    threadId: number;
    postId: number;
    userId: string;
    content: string;
  }): Promise<Post> {
    const post = await this.prismaService.post.update({
      where: {
        id: postId,
        threadId,
        userId,
      },
      data: {
        content,
      },
    });

    return post;
  }
}
