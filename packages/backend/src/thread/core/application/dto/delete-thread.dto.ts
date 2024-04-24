import {Field, ID, InputType} from '@nestjs/graphql';
import {Transform} from 'class-transformer';
import {IsInt, IsNotEmpty} from 'class-validator';

@InputType()
export class DeleteThreadInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => ID)
  @Transform(({value}) => Number(value))
  threadId: number;
}
