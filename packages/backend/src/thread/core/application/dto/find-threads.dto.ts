import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Type} from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class FindThreadsInput {
  @IsInt()
  @Field({nullable: true, defaultValue: 1})
  page: number;

  @IsInt()
  @Field({nullable: true, defaultValue: 10})
  limit: number;

  @IsBoolean()
  @Field({nullable: true, defaultValue: false})
  includeTotals: boolean;
}

@ObjectType()
export class FindThreadResponse {
  @IsInt()
  @IsNotEmpty()
  @Field(() => ID)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsDate()
  @IsNotEmpty()
  @Field()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @Field()
  userId: string;
}

@ObjectType()
export class FindThreadsWithCountResponse {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => FindThreadResponse)
  @Field(() => [FindThreadResponse])
  threads: FindThreadResponse[];

  @IsInt()
  @IsOptional()
  @Field({nullable: true})
  threadsCount?: number;
}
