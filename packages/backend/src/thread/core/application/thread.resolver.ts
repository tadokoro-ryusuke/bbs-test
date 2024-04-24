import {UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';

import {UserId} from '@/auth/auth.decorator';
import {AuthGuard} from '@/auth/auth.guard';
import {CreateThreadInput} from '@/thread/core/application/dto/create-thread.dto';
import {DeleteThreadInput} from '@/thread/core/application/dto/delete-thread.dto';
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

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async createThread(@Args('input') input: CreateThreadInput, @UserId() userId: string) {
    const createdThread = await this.threadService.createThread({title: input.title, userId});

    if (!createdThread) {
      throw new Error('Thread not created');
    }

    return true;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteThread(@Args('input') input: DeleteThreadInput, @UserId() userId: string) {
    const deletedThread = await this.threadService.deleteThread({id: input.threadId, userId});

    if (!deletedThread) {
      throw new Error('Thread not deleted');
    }

    return true;
  }
}
