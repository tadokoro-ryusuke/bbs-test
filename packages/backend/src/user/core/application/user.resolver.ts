import {UseGuards} from '@nestjs/common';
import {Query, Resolver} from '@nestjs/graphql';

import {UserId} from '@/auth/auth.decorator';
import {AuthGuard} from '@/auth/auth.guard';
import {UserService} from '@/user/core/domain/user.domain.service';
import {User} from '@/user/core/domain/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [User], {name: 'user'})
  async findAll(@UserId() userId: string) {
    console.log(userId);
    return this.userService.findAll();
  }
}
