import {Injectable} from '@nestjs/common';

import {PostRepository} from '@/thread/post/core/infra/post.repository.prisma';
import {Pagination} from '@/types/pagination';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

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
}
