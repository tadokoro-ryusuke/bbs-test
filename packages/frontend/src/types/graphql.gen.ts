import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type CreatePostInput = {
  content: Scalars["String"]["input"];
  threadId: Scalars["ID"]["input"];
};

export type CreateThreadInput = {
  title: Scalars["String"]["input"];
};

export type DeletePostInput = {
  postId: Scalars["ID"]["input"];
  threadId: Scalars["ID"]["input"];
};

export type DeleteThreadInput = {
  threadId: Scalars["ID"]["input"];
};

export type EditPostInput = {
  content: Scalars["String"]["input"];
  postId: Scalars["ID"]["input"];
  threadId: Scalars["ID"]["input"];
};

export type FindOnePostInput = {
  postId: Scalars["ID"]["input"];
  threadId: Scalars["ID"]["input"];
};

export type FindThreadResponse = {
  __typename?: "FindThreadResponse";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type FindThreadWithPostsInput = {
  includeTotals?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
  threadId: Scalars["ID"]["input"];
};

export type FindThreadWithPostsResponse = {
  __typename?: "FindThreadWithPostsResponse";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  posts: Array<PostResponse>;
  postsCount?: Maybe<Scalars["Float"]["output"]>;
  title: Scalars["String"]["output"];
};

export type FindThreadsInput = {
  includeTotals?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type FindThreadsWithCountResponse = {
  __typename?: "FindThreadsWithCountResponse";
  threads: Array<FindThreadResponse>;
  threadsCount?: Maybe<Scalars["Float"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addPostToThread: Scalars["Boolean"]["output"];
  createThread: Scalars["Boolean"]["output"];
  deletePost: Scalars["Boolean"]["output"];
  deleteThread: Scalars["Boolean"]["output"];
  editPost: Post;
  signedIn: Scalars["Boolean"]["output"];
};

export type MutationAddPostToThreadArgs = {
  input: CreatePostInput;
};

export type MutationCreateThreadArgs = {
  input: CreateThreadInput;
};

export type MutationDeletePostArgs = {
  input: DeletePostInput;
};

export type MutationDeleteThreadArgs = {
  input: DeleteThreadInput;
};

export type MutationEditPostArgs = {
  input: EditPostInput;
};

export type MutationSignedInArgs = {
  input: SignedInInput;
};

export type Post = {
  __typename?: "Post";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  thread: Thread;
  userId: Scalars["String"]["output"];
};

export type PostResponse = {
  __typename?: "PostResponse";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  threadId: Scalars["ID"]["output"];
  userId: Scalars["ID"]["output"];
};

export type Query = {
  __typename?: "Query";
  findOnePost: Post;
  findThreadWithPosts: FindThreadWithPostsResponse;
  threads: FindThreadsWithCountResponse;
};

export type QueryFindOnePostArgs = {
  input: FindOnePostInput;
};

export type QueryFindThreadWithPostsArgs = {
  input: FindThreadWithPostsInput;
};

export type QueryThreadsArgs = {
  input: FindThreadsInput;
};

export type SignedInInput = {
  email: Scalars["String"]["input"];
};

export type Thread = {
  __typename?: "Thread";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type SignedInMutationVariables = Exact<{
  input: SignedInInput;
}>;

export type SignedInMutation = { __typename?: "Mutation"; signedIn: boolean };

export type EditPostMutationVariables = Exact<{
  input: EditPostInput;
}>;

export type EditPostMutation = {
  __typename?: "Mutation";
  editPost: { __typename?: "Post"; id: string };
};

export type FindOnePostQueryVariables = Exact<{
  postId: Scalars["ID"]["input"];
  threadId: Scalars["ID"]["input"];
}>;

export type FindOnePostQuery = {
  __typename?: "Query";
  findOnePost: { __typename?: "Post"; id: string; content: string };
};

export type AddPostMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type AddPostMutation = {
  __typename?: "Mutation";
  addPostToThread: boolean;
};

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;

export type DeletePostMutation = {
  __typename?: "Mutation";
  deletePost: boolean;
};

export type FindThreadWithPostsQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
  page?: InputMaybe<Scalars["Float"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
}>;

export type FindThreadWithPostsQuery = {
  __typename?: "Query";
  findThreadWithPosts: {
    __typename?: "FindThreadWithPostsResponse";
    id: string;
    title: string;
    createdAt: any;
    postsCount?: number | null;
    posts: Array<{
      __typename?: "PostResponse";
      id: string;
      content: string;
      userId: string;
      createdAt: any;
    }>;
  };
};

export type CreateThreadMutationVariables = Exact<{
  input: CreateThreadInput;
}>;

export type CreateThreadMutation = {
  __typename?: "Mutation";
  createThread: boolean;
};

export type DeleteThreadMutationVariables = Exact<{
  input: DeleteThreadInput;
}>;

export type DeleteThreadMutation = {
  __typename?: "Mutation";
  deleteThread: boolean;
};

export type ThreadsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Float"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
}>;

export type ThreadsQuery = {
  __typename?: "Query";
  threads: {
    __typename?: "FindThreadsWithCountResponse";
    threadsCount?: number | null;
    threads: Array<{
      __typename?: "FindThreadResponse";
      id: string;
      title: string;
      createdAt: any;
      userId: string;
    }>;
  };
};

export const SignedInDocument = gql`
  mutation SignedIn($input: SignedInInput!) {
    signedIn(input: $input)
  }
`;

export function useSignedInMutation() {
  return Urql.useMutation<SignedInMutation, SignedInMutationVariables>(
    SignedInDocument
  );
}
export const EditPostDocument = gql`
  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      id
    }
  }
`;

export function useEditPostMutation() {
  return Urql.useMutation<EditPostMutation, EditPostMutationVariables>(
    EditPostDocument
  );
}
export const FindOnePostDocument = gql`
  query FindOnePost($postId: ID!, $threadId: ID!) {
    findOnePost(input: { postId: $postId, threadId: $threadId }) {
      id
      content
    }
  }
`;

export function useFindOnePostQuery(
  options: Omit<Urql.UseQueryArgs<FindOnePostQueryVariables>, "query">
) {
  return Urql.useQuery<FindOnePostQuery, FindOnePostQueryVariables>({
    query: FindOnePostDocument,
    ...options,
  });
}
export const AddPostDocument = gql`
  mutation AddPost($input: CreatePostInput!) {
    addPostToThread(input: $input)
  }
`;

export function useAddPostMutation() {
  return Urql.useMutation<AddPostMutation, AddPostMutationVariables>(
    AddPostDocument
  );
}
export const DeletePostDocument = gql`
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input)
  }
`;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument
  );
}
export const FindThreadWithPostsDocument = gql`
  query FindThreadWithPosts($id: ID!, $page: Float, $limit: Float) {
    findThreadWithPosts(
      input: { threadId: $id, page: $page, limit: $limit, includeTotals: true }
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

export function useFindThreadWithPostsQuery(
  options: Omit<Urql.UseQueryArgs<FindThreadWithPostsQueryVariables>, "query">
) {
  return Urql.useQuery<
    FindThreadWithPostsQuery,
    FindThreadWithPostsQueryVariables
  >({ query: FindThreadWithPostsDocument, ...options });
}
export const CreateThreadDocument = gql`
  mutation CreateThread($input: CreateThreadInput!) {
    createThread(input: $input)
  }
`;

export function useCreateThreadMutation() {
  return Urql.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(
    CreateThreadDocument
  );
}
export const DeleteThreadDocument = gql`
  mutation DeleteThread($input: DeleteThreadInput!) {
    deleteThread(input: $input)
  }
`;

export function useDeleteThreadMutation() {
  return Urql.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(
    DeleteThreadDocument
  );
}
export const ThreadsDocument = gql`
  query Threads($page: Float, $limit: Float) {
    threads(input: { page: $page, limit: $limit, includeTotals: true }) {
      threads {
        id
        title
        createdAt
        userId
      }
      threadsCount
    }
  }
`;

export function useThreadsQuery(
  options?: Omit<Urql.UseQueryArgs<ThreadsQueryVariables>, "query">
) {
  return Urql.useQuery<ThreadsQuery, ThreadsQueryVariables>({
    query: ThreadsDocument,
    ...options,
  });
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CreatePostInput: CreatePostInput;
  CreateThreadInput: CreateThreadInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  DeletePostInput: DeletePostInput;
  DeleteThreadInput: DeleteThreadInput;
  EditPostInput: EditPostInput;
  FindOnePostInput: FindOnePostInput;
  FindThreadResponse: ResolverTypeWrapper<FindThreadResponse>;
  FindThreadWithPostsInput: FindThreadWithPostsInput;
  FindThreadWithPostsResponse: ResolverTypeWrapper<FindThreadWithPostsResponse>;
  FindThreadsInput: FindThreadsInput;
  FindThreadsWithCountResponse: ResolverTypeWrapper<FindThreadsWithCountResponse>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  Query: ResolverTypeWrapper<{}>;
  SignedInInput: SignedInInput;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Thread: ResolverTypeWrapper<Thread>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  CreatePostInput: CreatePostInput;
  CreateThreadInput: CreateThreadInput;
  DateTime: Scalars["DateTime"]["output"];
  DeletePostInput: DeletePostInput;
  DeleteThreadInput: DeleteThreadInput;
  EditPostInput: EditPostInput;
  FindOnePostInput: FindOnePostInput;
  FindThreadResponse: FindThreadResponse;
  FindThreadWithPostsInput: FindThreadWithPostsInput;
  FindThreadWithPostsResponse: FindThreadWithPostsResponse;
  FindThreadsInput: FindThreadsInput;
  FindThreadsWithCountResponse: FindThreadsWithCountResponse;
  Float: Scalars["Float"]["output"];
  ID: Scalars["ID"]["output"];
  Mutation: {};
  Post: Post;
  PostResponse: PostResponse;
  Query: {};
  SignedInInput: SignedInInput;
  String: Scalars["String"]["output"];
  Thread: Thread;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type FindThreadResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FindThreadResponse"] = ResolversParentTypes["FindThreadResponse"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FindThreadWithPostsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FindThreadWithPostsResponse"] = ResolversParentTypes["FindThreadWithPostsResponse"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  posts?: Resolver<
    Array<ResolversTypes["PostResponse"]>,
    ParentType,
    ContextType
  >;
  postsCount?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FindThreadsWithCountResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FindThreadsWithCountResponse"] = ResolversParentTypes["FindThreadsWithCountResponse"]
> = {
  threads?: Resolver<
    Array<ResolversTypes["FindThreadResponse"]>,
    ParentType,
    ContextType
  >;
  threadsCount?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addPostToThread?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationAddPostToThreadArgs, "input">
  >;
  createThread?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateThreadArgs, "input">
  >;
  deletePost?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, "input">
  >;
  deleteThread?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteThreadArgs, "input">
  >;
  editPost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationEditPostArgs, "input">
  >;
  signedIn?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSignedInArgs, "input">
  >;
};

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  thread?: Resolver<ResolversTypes["Thread"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PostResponse"] = ResolversParentTypes["PostResponse"]
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  findOnePost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<QueryFindOnePostArgs, "input">
  >;
  findThreadWithPosts?: Resolver<
    ResolversTypes["FindThreadWithPostsResponse"],
    ParentType,
    ContextType,
    RequireFields<QueryFindThreadWithPostsArgs, "input">
  >;
  threads?: Resolver<
    ResolversTypes["FindThreadsWithCountResponse"],
    ParentType,
    ContextType,
    RequireFields<QueryThreadsArgs, "input">
  >;
};

export type ThreadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Thread"] = ResolversParentTypes["Thread"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  FindThreadResponse?: FindThreadResponseResolvers<ContextType>;
  FindThreadWithPostsResponse?: FindThreadWithPostsResponseResolvers<ContextType>;
  FindThreadsWithCountResponse?: FindThreadsWithCountResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostResponse?: PostResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
};
