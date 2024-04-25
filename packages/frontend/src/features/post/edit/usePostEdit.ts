import { useRouter } from "next/router";
import { useCallback } from "react";

import { useEditPostMutation, useFindOnePostQuery } from "@/types/graphql.gen";

export const usePostEdit = (threadId: string, postId: string) => {
  const router = useRouter();
  const [{ data, fetching }] = useFindOnePostQuery({
    variables: {
      threadId,
      postId,
    },
  });
  const [{ fetching: updating }, editPost] = useEditPostMutation();

  const post = data?.findOnePost;

  const handleEditPost = useCallback(
    (content: string) => {
      if (!post) {
        return;
      }

      editPost({
        input: {
          postId: post.id,
          threadId,
          content,
        },
      });
      router.push(`/threads/${threadId}`);
    },
    [editPost, post, router, threadId]
  );

  return {
    post,
    isLoading: fetching || updating,
    handleEditPost,
  };
};
