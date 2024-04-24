import { memo } from "react";

import { PostList } from "@/features/posts/list";
import { usePosts } from "@/features/posts/usePosts";

type Props = {
  threadId: string;
};

export const Posts = memo<Props>(({ threadId }) => {
  const { postList } = usePosts(threadId);

  return <PostList {...postList} />;
});
