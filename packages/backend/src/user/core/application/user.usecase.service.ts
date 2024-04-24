import {Injectable} from '@nestjs/common';

import {UserService} from '@/user/core/domain/user.domain.service';

@Injectable()
export class UserUseCaseService {
  constructor(private readonly userService: UserService) {}

  async signedIn({userId, email}: {userId: string; email: string}) {
    return this.userService.upsertUser({userId, email});
  }
}
