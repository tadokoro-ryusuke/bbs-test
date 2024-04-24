import { memo } from "react";

import { List } from "@/components/list/List";
import { Pagination } from "@/components/pagination";
import { Post } from "@/features/posts/list/Post";

type Props = {
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

export const PostList = memo<Props>(({ posts, pagination, fetching }) => {
  return (
    <>
      <List isLoading={fetching}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            content={post.content}
            createdAt={post.createdAt}
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
});
