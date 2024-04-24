import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type FindThreadResponse = {
  __typename?: 'FindThreadResponse';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type FindThreadWithPostsInput = {
  includeTotals?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  threadId: Scalars['ID']['input'];
};

export type FindThreadWithPostsResponse = {
  __typename?: 'FindThreadWithPostsResponse';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  posts: Array<Post>;
  postsCount?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
};

export type FindThreadsInput = {
  includeTotals?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type FindThreadsWithCountResponse = {
  __typename?: 'FindThreadsWithCountResponse';
  threads: Array<FindThreadResponse>;
  threadsCount?: Maybe<Scalars['Float']['output']>;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  threadId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  findThreadWithPosts: FindThreadWithPostsResponse;
  threads: FindThreadsWithCountResponse;
  user: Array<User>;
};


export type QueryFindThreadWithPostsArgs = {
  input: FindThreadWithPostsInput;
};


export type QueryThreadsArgs = {
  input: FindThreadsInput;
};

export type User = {
  __typename?: 'User';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type FindThreadWithPostsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type FindThreadWithPostsQuery = { __typename?: 'Query', findThreadWithPosts: { __typename?: 'FindThreadWithPostsResponse', id: string, title: string, createdAt: any, postsCount?: number | null, posts: Array<{ __typename?: 'Post', id: string, content: string, userId: string, createdAt: any }> } };

export type ThreadsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type ThreadsQuery = { __typename?: 'Query', threads: { __typename?: 'FindThreadsWithCountResponse', threadsCount?: number | null, threads: Array<{ __typename?: 'FindThreadResponse', id: string, title: string, createdAt: any }> } };


export const FindThreadWithPostsDocument = gql`
    query FindThreadWithPosts($id: ID!, $page: Float, $limit: Float) {
  findThreadWithPosts(
    input: {threadId: $id, page: $page, limit: $limit, includeTotals: true}
  ) {
    id
    title
    createdAt
    posts {
      id
      content
      userId
      createdAt
    }
    postsCount
  }
}
    `;

export function useFindThreadWithPostsQuery(options: Omit<Urql.UseQueryArgs<FindThreadWithPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<FindThreadWithPostsQuery, FindThreadWithPostsQueryVariables>({ query: FindThreadWithPostsDocument, ...options });
};
export const ThreadsDocument = gql`
    query Threads($page: Float, $limit: Float) {
  threads(input: {page: $page, limit: $limit, includeTotals: true}) {
    threads {
      id
      title
      createdAt
    }
    threadsCount
  }
}
    `;

export function useThreadsQuery(options?: Omit<Urql.UseQueryArgs<ThreadsQueryVariables>, 'query'>) {
  return Urql.useQuery<ThreadsQuery, ThreadsQueryVariables>({ query: ThreadsDocument, ...options });
};


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FindThreadResponse: ResolverTypeWrapper<FindThreadResponse>;
  FindThreadWithPostsInput: FindThreadWithPostsInput;
  FindThreadWithPostsResponse: ResolverTypeWrapper<FindThreadWithPostsResponse>;
  FindThreadsInput: FindThreadsInput;
  FindThreadsWithCountResponse: ResolverTypeWrapper<FindThreadsWithCountResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  FindThreadResponse: FindThreadResponse;
  FindThreadWithPostsInput: FindThreadWithPostsInput;
  FindThreadWithPostsResponse: FindThreadWithPostsResponse;
  FindThreadsInput: FindThreadsInput;
  FindThreadsWithCountResponse: FindThreadsWithCountResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Post: Post;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FindThreadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FindThreadResponse'] = ResolversParentTypes['FindThreadResponse']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FindThreadWithPostsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FindThreadWithPostsResponse'] = ResolversParentTypes['FindThreadWithPostsResponse']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  postsCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FindThreadsWithCountResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FindThreadsWithCountResponse'] = ResolversParentTypes['FindThreadsWithCountResponse']> = {
  threads?: Resolver<Array<ResolversTypes['FindThreadResponse']>, ParentType, ContextType>;
  threadsCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findThreadWithPosts?: Resolver<ResolversTypes['FindThreadWithPostsResponse'], ParentType, ContextType, RequireFields<QueryFindThreadWithPostsArgs, 'input'>>;
  threads?: Resolver<ResolversTypes['FindThreadsWithCountResponse'], ParentType, ContextType, RequireFields<QueryThreadsArgs, 'input'>>;
  user?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  exampleField?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  FindThreadResponse?: FindThreadResponseResolvers<ContextType>;
  FindThreadWithPostsResponse?: FindThreadWithPostsResponseResolvers<ContextType>;
  FindThreadsWithCountResponse?: FindThreadsWithCountResponseResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

