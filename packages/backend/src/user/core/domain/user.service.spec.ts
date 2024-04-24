import {Test, TestingModule} from '@nestjs/testing';

import {PrismaModule} from '@/prisma/prisma.module';
import {UserService} from '@/user/core/domain/user.domain.service';
import {User} from '@/user/core/domain/user.entity';
import {UserRepository} from '@/user/core/infra/user.repository';
import {UserModule} from '@/user/core/user.module';

/* eslint-disable @typescript-eslint/unbound-method */

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsertUser', () => {
    it('should successfully upsert a user', async () => {
      const userId = '123';
      const email = 'test@example.com';
      const mockUser: User = {id: userId, username: email};
      jest.spyOn(userRepository, 'upsert').mockResolvedValue(mockUser);

      const result = await service.upsertUser({userId, email});

      expect(userRepository.upsert).toHaveBeenCalledWith({id: userId, username: email});
      expect(result).toEqual(mockUser);
    });
  });
});
