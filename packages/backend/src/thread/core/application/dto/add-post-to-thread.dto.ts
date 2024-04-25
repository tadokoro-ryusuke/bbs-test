import {Field, ID, InputType} from '@nestjs/graphql';
import {Transform} from 'class-transformer';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => ID)
  @Transform(({value}) => Number(value))
  threadId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;
}
