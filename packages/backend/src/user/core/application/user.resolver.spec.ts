import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '@/prisma/prisma.module';
import {UserService} from '@/user/core/domain/user.domain.service';
import {UserModule} from '@/user/core/user.module';

/* eslint-disable @typescript-eslint/unbound-method */
import {UserUseCaseService} from './user.usecase.service';

describe('UserUseCaseService', () => {
  let service: UserUseCaseService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
    }).compile();

    service = module.get<UserUseCaseService>(UserUseCaseService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signedIn', () => {
    it('should call upsertUser with userId and email', async () => {
      const id = '123';
      const email = 'test@example.com';
      const mockUser = {id, username: 'Test User'};
      jest.spyOn(userService, 'upsertUser').mockResolvedValue(mockUser);

      const result = await service.signedIn({userId: id, email});

      expect(userService.upsertUser).toHaveBeenCalledWith({userId: id, email});
      expect(result).toEqual(mockUser);
    });
  });
});
