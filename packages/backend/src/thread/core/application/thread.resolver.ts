import {Args, Query, Resolver} from '@nestjs/graphql';

import {
  FindThreadWithPostsInput,
  FindThreadWithPostsResponse,
} from '@/thread/core/application/dto/find-thread-with-posts.dto';
import {
  FindThreadResponse,
  FindThreadsInput,
  FindThreadsWithCountResponse,
} from '@/thread/core/application/dto/find-threads.dto';
import {ThreadUseCaseService} from '@/thread/core/application/thread.usecase.service';

@Resolver()
export class ThreadResolver {
  constructor(private readonly threadService: ThreadUseCaseService) {}

  @Query(() => FindThreadsWithCountResponse || [FindThreadResponse], {name: 'threads'})
  async list(
    @Args('input') input: FindThreadsInput,
  ): Promise<FindThreadsWithCountResponse | FindThreadResponse[]> {
    return this.threadService.find(input);
  }

  @Query((_returns) => FindThreadWithPostsResponse)
  async findThreadWithPosts(
    @Args('input') input: FindThreadWithPostsInput,
  ): Promise<FindThreadWithPostsResponse> {
    return this.threadService.findThreadWithPosts(input);
  }
}
