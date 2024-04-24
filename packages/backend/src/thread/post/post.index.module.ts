import {Module} from '@nestjs/common';

import {PostModule} from '@/thread/post/core/post.module';

@Module({
  imports: [PostModule],
  exports: [PostModule],
})
export class PostIndexModule {}
