import {Module} from '@nestjs/common';

import {PrismaModule} from '@/prisma/prisma.module';
import {ThreadResolver} from '@/thread/core/application/thread.resolver';
import {ThreadUseCaseService} from '@/thread/core/application/thread.usecase.service';
import {ThreadService} from '@/thread/core/domain/thread.domain.service';
import {ThreadRepository} from '@/thread/core/infra/thread.repository.prisma';
import {PostIndexModule} from '@/thread/post/post.index.module';

@Module({
  imports: [PrismaModule, PostIndexModule],
  providers: [ThreadResolver, ThreadUseCaseService, ThreadService, ThreadRepository],
})
export class ThreadModule {}
