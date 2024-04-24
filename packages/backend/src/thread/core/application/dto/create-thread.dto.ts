import {Field, InputType} from '@nestjs/graphql';
import {IsNotEmpty, IsString} from 'class-validator';

@InputType()
export class CreateThreadInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;
}
