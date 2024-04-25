import { memo } from "react";

import { PostList } from "@/features/post/list";
import { usePosts } from "@/features/post/usePosts";

type Props = {
  threadId: string;
};

export const Posts = memo<Props>(({ threadId }) => {
  const { postList, refetchPosts, handleDeletePost, handleEditPost } =
    usePosts(threadId);

  return (
    <PostList
      threadId={threadId}
      list={postList}
      handleDeletePost={handleDeletePost}
      handleEditPost={handleEditPost}
      refetchPosts={refetchPosts}
    />
  );
});
