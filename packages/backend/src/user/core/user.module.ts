import {Module} from '@nestjs/common';

import {FirebaseModule} from '@/firebase/firebase.module';
import {UserResolver} from '@/user/core/application/user.resolver';
import {UserService} from '@/user/core/domain/user.domain.service';

@Module({
  imports: [FirebaseModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
