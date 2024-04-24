import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '@/prisma/prisma.module';
import {ThreadService} from '@/thread/core/domain/thread.domain.service';
import {Thread} from '@/thread/core/domain/thread.entity';
import {ThreadRepository} from '@/thread/core/infra/thread.repository.prisma';
import {ThreadModule} from '@/thread/core/thread.module';
import {Pagination} from '@/types/pagination';

/* eslint-disable @typescript-eslint/unbound-method */

describe('ThreadService', () => {
  let service: ThreadService;
  let repo: ThreadRepository;

  let threads: Thread[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThreadModule, PrismaModule],
      providers: [ThreadService, ThreadRepository],
    }).compile();

    service = module.get<ThreadService>(ThreadService);
    repo = module.get<ThreadRepository>(ThreadRepository);

    threads = [
      {id: 1, title: 'Thread 1', userId: 'user1', createdAt: new Date('2020-01-01')},
      {id: 2, title: 'Thread 2', userId: 'user2', createdAt: new Date('2020-02-01')},
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('find', () => {
    it('ページネーションでのリクエスト', async () => {
      const pagination: Pagination = {page: 1, limit: 10};
      jest.spyOn(repo, 'find').mockResolvedValue(threads);

      const result = await service.find(pagination);

      expect(repo.find).toHaveBeenCalledWith({
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
        orderBy: {createdAt: 'desc'},
      });
      expect(result).toEqual(threads);
    });
  });

  describe('findOne', () => {
    it('一つのスレッド', async () => {
      const id = 1;
      jest.spyOn(repo, 'findOne').mockResolvedValue(threads[0]);

      const result = await service.findOne(id);

      expect(repo.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(threads[0]);
    });
  });

  describe('findOneByIdAndUserId', () => {
    it('ユーザーIDも検索にいれる', async () => {
      const id = 1;
      const userId = 'user1';
      jest.spyOn(repo, 'findOneByIdAndUserId').mockResolvedValue(threads[0]);

      const result = await service.findOneByIdAndUserId(id, userId);

      expect(repo.findOneByIdAndUserId).toHaveBeenCalledWith(id, userId);
      expect(result).toEqual(threads[0]);
    });

    it('should throw an error if thread is not found', async () => {
      const id = 999;
      const userId = 'user1';
      jest.spyOn(repo, 'findOneByIdAndUserId').mockResolvedValue(null);

      await expect(service.findOneByIdAndUserId(id, userId)).rejects.toThrow();
    });
  });

  describe('count', () => {
    it('スレッドのカウント', async () => {
      jest.spyOn(repo, 'count').mockResolvedValue(threads.length);

      const result = await service.count();

      expect(repo.count).toHaveBeenCalled();
      expect(result).toEqual(threads.length);
    });
  });

  describe('create', () => {
    it('スレッドの作成', async () => {
      const newThread = {title: 'New Thread', userId: 'newUser'};
      const createdThread = {...newThread, id: 3, createdAt: new Date()};
      jest.spyOn(repo, 'create').mockResolvedValue(createdThread);

      const result = await service.create(newThread);

      expect(repo.create).toHaveBeenCalledWith(newThread);
      expect(result).toEqual(createdThread);
    });
  });

  describe('delete', () => {
    it('スレッドの削除', async () => {
      const id = 1;
      const userId = 'user1';
      jest.spyOn(repo, 'delete').mockResolvedValue();

      await service.delete({id, userId});

      expect(repo.delete).toHaveBeenCalledWith(id, userId);
    });
  });
});
