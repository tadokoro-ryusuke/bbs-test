import {Injectable} from '@nestjs/common';

import {User} from '@/user/core/domain/user.entity';
import {UserRepository} from '@/user/core/infra/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async upsertUser({userId, email}: {userId: string; email: string}): Promise<User> {
    return this.userRepository.upsert({id: userId, username: email});
  }
}
