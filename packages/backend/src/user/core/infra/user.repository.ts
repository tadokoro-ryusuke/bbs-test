import {Injectable} from '@nestjs/common';

import {PrismaService} from '@/prisma/prisma.service';
import {IUserRepository} from '@/user/core/domain/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async upsert({id, username}: {id: string; username: string}) {
    const user = await this.prismaService.user.upsert({
      where: {
        id,
      },
      update: {
        username,
      },
      create: {
        id,
        username,
      },
    });

    return user;
  }
}
