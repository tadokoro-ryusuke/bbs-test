import {Field, InputType} from '@nestjs/graphql';
import {IsNotEmpty, IsString} from 'class-validator';

@InputType()
export class SignedInInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;
}
