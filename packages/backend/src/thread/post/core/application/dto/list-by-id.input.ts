import {Field, ID, InputType} from '@nestjs/graphql';
import {Transform} from 'class-transformer';
import {IsNotEmpty, IsNumber} from 'class-validator';

@InputType()
export class ListByIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => ID)
  @Transform(({value}) => Number(value))
  threadId: number;

  @IsNumber()
  @Field({nullable: true, defaultValue: 1})
  page: number;

  @IsNumber()
  @Field({nullable: true, defaultValue: 10})
  limit: number;
}
