import {Injectable} from '@nestjs/common';

import {PostRepository} from '@/thread/post/core/infra/post.repository.prisma';
import {Pagination} from '@/types/pagination';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findOnePostByUserId({
    threadId,
    postId,
    userId,
  }: {
    threadId: number;
    postId: number;
    userId: string;
  }) {
    return this.postRepository.findOneByUserId({threadId, postId, userId});
  }

  async deletePostsByThreadId(threadId: number) {
    return this.postRepository.delete(threadId);
  }

  async findByThreadId(threadId: number, {page, limit}: Pagination) {
    return this.postRepository.findByThreadId(threadId, {
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async countByThreadId(threadId: number) {
    return this.postRepository.countByThreadId(threadId);
  }

  async create({threadId, userId, content}: {threadId: number; userId: string; content: string}) {
    return this.postRepository.create({threadId, userId, content});
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
  }) {
    return this.postRepository.update({threadId, postId, userId, content});
  }

  async deletePostById({
    threadId,
    postId,
    userId,
  }: {
    threadId: number;
    postId: number;
    userId: string;
  }) {
    return this.postRepository.deleteById(threadId, postId, userId);
  }
}
