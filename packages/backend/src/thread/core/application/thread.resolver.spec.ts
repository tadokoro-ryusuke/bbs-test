import {Test, TestingModule} from '@nestjs/testing';

import {FirebaseModule} from '@/firebase/firebase.module';
import {PrismaModule} from '@/prisma/prisma.module';
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
import {ThreadModule} from '@/thread/core/thread.module';

/* eslint-disable @typescript-eslint/unbound-method */
import {ThreadResolver} from './thread.resolver';

describe('ThreadResolver', () => {
  let resolver: ThreadResolver;
  let threadService: ThreadUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThreadModule, PrismaModule, FirebaseModule],
    }).compile();

    resolver = module.get<ThreadResolver>(ThreadResolver);
    threadService = module.get<ThreadUseCaseService>(ThreadUseCaseService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('list', () => {
    it('一覧取得', async () => {
      const input: FindThreadsInput = {
        page: 1,
        limit: 10,
        includeTotals: false,
      };
      const expectedResult: FindThreadsWithCountResponse | FindThreadResponse[] = [
        {
          id: 1,
          title: 'Pre-existing Thread Title',
          createdAt: new Date('2020-01-01'),
          userId: '123',
        },
      ];

      jest.spyOn(threadService, 'find').mockResolvedValue(expectedResult);

      const result = await resolver.list(input);

      expect(threadService.find).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findThreadWithPosts', () => {
    it('ポストも含んだ一覧取得', async () => {
      const input: FindThreadWithPostsInput = {
        threadId: 1,
        page: 1,
        limit: 10,
        includeTotals: true,
      };
      const expectedResult: FindThreadWithPostsResponse = {
        id: 1,
        title: 'Thread Title',
        createdAt: new Date(),
        posts: [
          {
            id: 1,
            content: 'Post Content',
            createdAt: new Date(),
            userId: '112233',
            threadId: 1,
          },
        ],
      };

      jest.spyOn(threadService, 'findThreadWithPosts').mockResolvedValue(expectedResult);

      const result = await resolver.findThreadWithPosts(input);

      expect(threadService.findThreadWithPosts).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createThread', () => {
    it('スレッドの作成', async () => {
      const input: CreateThreadInput = {
        title: 'Thread Title',
      };
      const userId = 'user123';

      jest.spyOn(threadService, 'createThread').mockResolvedValue({
        id: 1,
        title: 'Thread Title',
        createdAt: new Date(),
        userId: 'user123',
      });

      const result = await resolver.createThread(input, userId);

      expect(threadService.createThread).toHaveBeenCalledWith({...input, userId});
      expect(result).toEqual(true);
    });
  });

  describe('deleteThread', () => {
    it('スレッドの削除', async () => {
      const input: DeleteThreadInput = {
        threadId: 1,
      };
      const userId = 'user123';

      jest.spyOn(threadService, 'deleteThread').mockResolvedValue(true);

      const result = await resolver.deleteThread(input, userId);

      expect(threadService.deleteThread).toHaveBeenCalledWith({
        id: input.threadId,
        userId,
      });
      expect(result).toEqual(true);
    });
  });
});
