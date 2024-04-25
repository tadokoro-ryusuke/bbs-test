import { memo } from "react";

import { Loading } from "@/components/loading/Loading";
import { EditPostForm } from "@/features/post/edit/EditPostForm";
import { usePostEdit } from "@/features/post/edit/usePostEdit";

type Props = {
  threadId: string;
  postId: string;
};

export const EditPost = memo<Props>(({ threadId, postId }) => {
  const { post, isLoading, handleEditPost } = usePostEdit(threadId, postId);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <EditPostForm content={post.content} handleEditPost={handleEditPost} />
  );
});
