import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Transform, Type} from 'class-transformer';
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
export class FindThreadWithPostsInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => ID)
  @Transform(({value}) => Number(value))
  threadId: number;

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
export class Post {
  @IsInt()
  @IsNotEmpty()
  @Field(() => ID)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  @IsDate()
  @IsNotEmpty()
  @Field()
  createdAt: Date;

  @IsInt()
  @IsNotEmpty()
  @Field(() => ID)
  threadId: number;

  @IsInt()
  @IsNotEmpty()
  @Field(() => ID)
  userId: string;
}

@ObjectType()
export class FindThreadWithPostsResponse {
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

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Post)
  @Field(() => [Post])
  posts: Post[];

  @IsInt()
  @IsOptional()
  @Field({nullable: true})
  postsCount?: number;
}
