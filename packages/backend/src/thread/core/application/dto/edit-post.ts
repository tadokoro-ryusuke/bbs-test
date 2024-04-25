import {Field, ID, InputType} from '@nestjs/graphql';
import {Transform} from 'class-transformer';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

@InputType()
export class EditPostInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => ID)
  @Transform(({value}) => Number(value))
  threadId: number;

  @IsNotEmpty()
  @IsInt()
  @Field(() => ID)
  @Transform(({value}) => Number(value))
  postId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;
}
