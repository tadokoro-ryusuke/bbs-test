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
}
