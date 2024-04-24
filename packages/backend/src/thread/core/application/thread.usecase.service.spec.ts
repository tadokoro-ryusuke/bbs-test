import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '@/prisma/prisma.module';
import {ThreadService} from '@/thread/core/domain/thread.domain.service';
import {ThreadModule} from '@/thread/core/thread.module';
import {PostUseCaseService} from '@/thread/post/core/application/post.usecase.service';

/* eslint-disable @typescript-eslint/unbound-method */
import {ThreadUseCaseService} from './thread.usecase.service';

describe('ThreadUseCaseService', () => {
  let service: ThreadUseCaseService;
  let threadService: ThreadService;
  let postService: PostUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThreadModule, PrismaModule],
    }).compile();

    service = module.get<ThreadUseCaseService>(ThreadUseCaseService);
    threadService = module.get<ThreadService>(ThreadService);
    postService = module.get<PostUseCaseService>(PostUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('一覧取得', async () => {
      const mockThreads = [{id: 1, title: 'Test Thread', createdAt: new Date(), userId: '123'}];
      jest.spyOn(threadService, 'find').mockResolvedValue(mockThreads);

      const result = await service.find({page: 1, limit: 10, includeTotals: false});

      expect(threadService.find).toHaveBeenCalledWith({page: 1, limit: 10});
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining({id: 1})]));
    });

    it('should return threads with count when totals are included', async () => {
      const mockThreads = [{id: 1, title: 'Test Thread', createdAt: new Date(), userId: '123'}];
      jest.spyOn(threadService, 'find').mockResolvedValue(mockThreads);
      jest.spyOn(threadService, 'count').mockResolvedValue(1);

      const result = await service.find({page: 1, limit: 10, includeTotals: true});

      expect(threadService.find).toHaveBeenCalledWith({page: 1, limit: 10});
      expect(result).toEqual(expect.objectContaining({threads: mockThreads, threadsCount: 1}));
    });
  });

  describe('findThreadWithPosts', () => {
    it('ポストも含めた一覧取得', async () => {
      const mockThread = {id: 1, title: 'Test Thread', createdAt: new Date(), userId: '123'};
      const mockPosts = [
        {id: 1, threadId: 1, content: 'Test Post', createdAt: new Date(), userId: '123'},
      ];
      jest.spyOn(threadService, 'findOne').mockResolvedValue(mockThread);
      jest.spyOn(postService, 'findByThreadId').mockResolvedValue(mockPosts);

      const result = await service.findThreadWithPosts({
        threadId: 1,
        page: 1,
        limit: 10,
        includeTotals: false,
      });

      expect(threadService.findOne).toHaveBeenCalledWith(1);
      expect(postService.findByThreadId).toHaveBeenCalledWith(1, {page: 1, limit: 10});
      expect(result).toEqual(expect.objectContaining({id: 1, posts: mockPosts}));
    });

    it('合計のカウント数も入れて返す', async () => {
      const mockThread = {id: 1, title: 'Test Thread', createdAt: new Date(), userId: '123'};
      const mockPosts = [
        {id: 1, threadId: 1, content: 'Test Post', createdAt: new Date(), userId: '123'},
      ];
      const mockPostsCount = 1;
      jest.spyOn(threadService, 'findOne').mockResolvedValue(mockThread);
      jest.spyOn(postService, 'findByThreadId').mockResolvedValue(mockPosts);
      jest.spyOn(postService, 'countByThreadId').mockResolvedValue(mockPostsCount);

      const result = await service.findThreadWithPosts({
        threadId: 1,
        page: 1,
        limit: 10,
        includeTotals: true,
      });

      expect(threadService.findOne).toHaveBeenCalledWith(1);
      expect(postService.findByThreadId).toHaveBeenCalledWith(1, {page: 1, limit: 10});
      expect(result).toEqual(
        expect.objectContaining({id: 1, posts: mockPosts, postsCount: mockPostsCount}),
      );
    });
  });

  describe('createThread', () => {
    it('スレッドの作成', async () => {
      const createData = {title: 'New Thread', userId: 'user123'};
      const createdThread = {id: 1, title: 'New Thread', userId: 'user123', createdAt: new Date()};
      jest.spyOn(threadService, 'create').mockResolvedValue(createdThread);

      const result = await service.createThread(createData);

      expect(threadService.create).toHaveBeenCalledWith(createData);
      expect(result).toEqual(createdThread);
    });
  });

  describe('deleteThread', () => {
    it('スレッドの削除', async () => {
      const threadData = {id: 1, userId: 'user123'};
      const foundThread = {id: 1, userId: 'user123', title: 'Delete Test', createdAt: new Date()};
      jest.spyOn(threadService, 'findOneByIdAndUserId').mockResolvedValue(foundThread);
      jest.spyOn(postService, 'deletePostsByThreadId').mockResolvedValue();
      jest.spyOn(threadService, 'delete').mockResolvedValue();

      await service.deleteThread(threadData);

      expect(threadService.findOneByIdAndUserId).toHaveBeenCalledWith(1, 'user123');
      expect(postService.deletePostsByThreadId).toHaveBeenCalledWith(1);
      expect(threadService.delete).toHaveBeenCalledWith({id: 1, userId: 'user123'});
    });
  });
});
