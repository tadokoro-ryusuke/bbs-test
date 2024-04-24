import {Field, ID, ObjectType} from '@nestjs/graphql';

import {Thread} from '@/thread/core/domain/thread.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field()
  userId: string;

  @Field(() => Thread)
  thread: Thread;

  @Field()
  createdAt: Date;
}
