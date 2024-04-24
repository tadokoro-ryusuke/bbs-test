import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Thread {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;
}
