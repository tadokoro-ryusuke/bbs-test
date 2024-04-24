import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '@/prisma/prisma.module';
import {PostService} from '@/thread/post/core/domain/post.domain.service';
import {PostRepository} from '@/thread/post/core/infra/post.repository.prisma';
import {PostModule} from '@/thread/post/core/post.module';
import {Pagination} from '@/types/pagination';

/* eslint-disable @typescript-eslint/unbound-method */

describe('PostService', () => {
  let service: PostService;
  let repo: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostModule, PrismaModule],
    }).compile();

    service = module.get<PostService>(PostService);
    repo = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deletePostsByThreadId', () => {
    it('ポストの削除', async () => {
      const threadId = 1;
      jest.spyOn(repo, 'delete').mockResolvedValue(undefined); // assuming delete returns void

      const result = await service.deletePostsByThreadId(threadId);

      expect(repo.delete).toHaveBeenCalledWith(threadId);
      expect(result).toBeUndefined();
    });
  });

  describe('findByThreadId', () => {
    it('スレッドに紐づくポストの取得', async () => {
      const threadId = 1;
      const pagination: Pagination = {page: 1, limit: 10};
      const mockPosts = [
        {id: 1, threadId: 1, content: 'Sample Post', createdAt: new Date(), userId: '123'},
      ];
      jest.spyOn(repo, 'findByThreadId').mockResolvedValue(mockPosts);

      const result = await service.findByThreadId(threadId, pagination);

      expect(repo.findByThreadId).toHaveBeenCalledWith(threadId, {
        take: 10,
        skip: 0,
        orderBy: {createdAt: 'desc'},
      });
      expect(result).toEqual(mockPosts);
    });
  });

  describe('countByThreadId', () => {
    it('スレッドに紐づくポストのカウント', async () => {
      const threadId = 1;
      const mockCount = 5;
      jest.spyOn(repo, 'countByThreadId').mockResolvedValue(mockCount);

      const result = await service.countByThreadId(threadId);

      expect(repo.countByThreadId).toHaveBeenCalledWith(threadId);
      expect(result).toEqual(mockCount);
    });
  });
});
