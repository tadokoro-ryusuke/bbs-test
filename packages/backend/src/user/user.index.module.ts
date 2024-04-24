import {Module} from '@nestjs/common';

import {UserModule} from '@/user/core/user.module';

@Module({
  imports: [UserModule],
})
export class UserIndexModule {}
