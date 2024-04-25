import {Injectable} from '@nestjs/common';

import {PostService} from '@/thread/post/core/domain/post.domain.service';
import {Pagination} from '@/types/pagination';

@Injectable()
export class PostUseCaseService {
  constructor(private readonly postDomainService: PostService) {}

  async findOnePost({
    threadId,
    postId,
    userId,
  }: {
    threadId: number;
    postId: number;
    userId: string;
  }) {
    const post = await this.postDomainService.findOnePostByUserId({threadId, postId, userId});

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  async deletePostsByThreadId(threadId: number) {
    return this.postDomainService.deletePostsByThreadId(threadId);
  }

  async findByThreadId(threadId: number, {page, limit}: Pagination) {
    return this.postDomainService.findByThreadId(threadId, {page, limit});
  }

  async countByThreadId(threadId: number) {
    return this.postDomainService.countByThreadId(threadId);
  }

  async addPost({threadId, userId, content}: {threadId: number; userId: string; content: string}) {
    return this.postDomainService.create({threadId, userId, content});
  }

  async editPost({
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
    return this.postDomainService.update({threadId, postId, userId, content});
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
    return this.postDomainService.deletePostById({threadId, postId, userId});
  }
}
