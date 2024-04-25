import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';

import {
  FindThreadWithPostsInput,
  FindThreadWithPostsResponse,
} from '@/thread/core/application/dto/find-thread-with-posts.dto';
import {
  FindThreadResponse,
  FindThreadsInput,
  FindThreadsWithCountResponse,
} from '@/thread/core/application/dto/find-threads.dto';
import {ThreadService} from '@/thread/core/domain/thread.domain.service';
import {PostUseCaseService} from '@/thread/post/core/application/post.usecase.service';

@Injectable()
export class ThreadUseCaseService {
  constructor(
    private readonly threadDomainService: ThreadService,
    private readonly postService: PostUseCaseService,
  ) {}

  async find({page, limit, includeTotals}: FindThreadsInput) {
    const threads = await this.threadDomainService.find({page, limit});

    if (!includeTotals) {
      return threads.map((thread) => plainToClass(FindThreadResponse, thread));
    }

    const threadsCount = await this.threadDomainService.count();

    return plainToClass(FindThreadsWithCountResponse, {
      threads,
      threadsCount,
    });
  }

  async findOnePost({
    threadId,
    postId,
    userId,
  }: {
    threadId: number;
    postId: number;
    userId: string;
  }) {
    const thread = await this.threadDomainService.findOne(threadId);

    return this.postService.findOnePost({threadId: thread.id, postId, userId});
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
    const thread = await this.threadDomainService.findOne(threadId);

    return this.postService.editPost({threadId: thread.id, postId, userId, content});
  }

  async findThreadWithPosts({threadId, page, limit, includeTotals}: FindThreadWithPostsInput) {
    const thread = await this.threadDomainService.findOne(threadId);

    const posts = await this.postService.findByThreadId(threadId, {page, limit});

    if (!includeTotals) {
      return plainToClass(FindThreadWithPostsResponse, {
        ...thread,
        posts,
      });
    }

    const postsCount = await this.postService.countByThreadId(threadId);

    return plainToClass(FindThreadWithPostsResponse, {
      ...thread,
      posts,
      postsCount,
    });
  }

  async createThread({title, userId}: {title: string; userId: string}) {
    return this.threadDomainService.create({title, userId});
  }

  async deleteThread({id, userId}: {id: number; userId: string}) {
    const thread = await this.threadDomainService.findOneByIdAndUserId(id, userId);

    await this.postService.deletePostsByThreadId(thread.id);

    await this.threadDomainService.delete({id: thread.id, userId});

    return true;
  }

  async addPostToThread({
    threadId,
    userId,
    content,
  }: {
    threadId: number;
    userId: string;
    content: string;
  }) {
    const thread = await this.threadDomainService.findOne(threadId);

    return this.postService.addPost({threadId: thread.id, userId, content});
  }

  async deletePost({threadId, postId, userId}: {threadId: number; postId: number; userId: string}) {
    const thread = await this.threadDomainService.findOne(threadId);

    return this.postService.deletePostById({threadId: thread.id, postId, userId});
  }
}
