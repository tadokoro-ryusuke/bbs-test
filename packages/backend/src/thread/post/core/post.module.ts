import {Module} from '@nestjs/common';

import {PrismaModule} from '@/prisma/prisma.module';
import {PostUseCaseService} from '@/thread/post/core/application/post.usecase.service';
import {PostService} from '@/thread/post/core/domain/post.domain.service';
import {PostRepository} from '@/thread/post/core/infra/post.repository.prisma';

@Module({
  imports: [PrismaModule],
  providers: [PostUseCaseService, PostService, PostRepository],
  exports: [PostUseCaseService],
})
export class PostModule {}
