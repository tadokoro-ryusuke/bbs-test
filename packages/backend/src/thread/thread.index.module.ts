import {Module} from '@nestjs/common';

import {ThreadModule} from '@/thread/core/thread.module';

@Module({
  imports: [ThreadModule],
})
export class ThreadIndexModule {}
