import { memo } from "react";

import { List } from "@/components/list/List";
import { Pagination } from "@/components/pagination";
import { AddPost } from "@/features/post/add-post/indext";
import { Post } from "@/features/post/list/Post";

type Props = {
  threadId: string;
  list: {
    posts: {
      id: string;
      content: string;
      userId: string;
      createdAt: Date;
    }[];
    pagination: {
      page: number;
      count: number;
      handleChangePage: (page: number) => void;
    };
    fetching: boolean;
  };
  refetchPosts: () => void;
  handleDeletePost: (postId: string) => void;
  handleEditPost: (postId: string) => void;
};

export const PostList = memo<Props>(
  ({ threadId, list, refetchPosts, handleDeletePost, handleEditPost }) => {
    const { posts, pagination, fetching } = list;

    return (
      <>
        <AddPost threadId={threadId} refetchPosts={refetchPosts} />
        <List isLoading={fetching}>
          {posts.map((post) => (
            <Post
              key={post.id}
              userId={post.userId}
              content={post.content}
              createdAt={post.createdAt}
              onDelete={() => handleDeletePost(post.id)}
              navigateToEdit={() => handleEditPost(post.id)}
            />
          ))}
        </List>
        <Pagination
          page={pagination.page}
          count={pagination.count}
          onPageChange={pagination.handleChangePage}
        />
      </>
    );
  }
);
