import {UseGuards} from '@nestjs/common';
import {Args, Mutation, Resolver} from '@nestjs/graphql';

import {UserId} from '@/auth/auth.decorator';
import {AuthGuard} from '@/auth/auth.guard';
import {SignedInInput} from '@/user/core/application/dto/signed-in.dto';
import {UserUseCaseService} from '@/user/core/application/user.usecase.service';
import {User} from '@/user/core/domain/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserUseCaseService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async signedIn(@Args('input') input: SignedInInput, @UserId() userId: string) {
    await this.userService.signedIn({userId, email: input.email});

    return true;
  }
}
