import {Injectable} from '@nestjs/common';

import {PostService} from '@/thread/post/core/domain/post.domain.service';
import {Pagination} from '@/types/pagination';

@Injectable()
export class PostUseCaseService {
  constructor(private readonly postDomainService: PostService) {}

  async findByThreadId(threadId: number, {page, limit}: Pagination) {
    return this.postDomainService.findByThreadId(threadId, {page, limit});
  }

  async countByThreadId(threadId: number) {
    return this.postDomainService.countByThreadId(threadId);
  }
}
