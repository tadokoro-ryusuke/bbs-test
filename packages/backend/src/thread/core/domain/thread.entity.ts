import {Field, ID, Int, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Thread {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;
}
