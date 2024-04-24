import {Module} from '@nestjs/common';

import {FirebaseModule} from '@/firebase/firebase.module';
import {PrismaModule} from '@/prisma/prisma.module';
import {UserResolver} from '@/user/core/application/user.resolver';
import {UserUseCaseService} from '@/user/core/application/user.usecase.service';
import {UserService} from '@/user/core/domain/user.domain.service';
import {UserRepository} from '@/user/core/infra/user.repository';

@Module({
  imports: [FirebaseModule, PrismaModule],
  providers: [UserService, UserResolver, UserUseCaseService, UserRepository],
})
export class UserModule {}
