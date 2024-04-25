import { useRouter } from "next/router";
/* eslint-disable no-console */
import { useCallback, useMemo, useState } from "react";

import {
  useDeletePostMutation,
  useFindThreadWithPostsQuery,
} from "@/types/graphql.gen";

export const usePosts = (threadId: string) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [{ data, fetching }, executeQuery] = useFindThreadWithPostsQuery({
    variables: {
      id: threadId,
      page,
    },
    requestPolicy: "network-only",
  });
  const [, executeDeletePostMutation] = useDeletePostMutation();
  const total = data?.findThreadWithPosts.postsCount ?? 0;

  const postList = useMemo(() => {
    const posts = data?.findThreadWithPosts.posts ?? [];

    const handleChangePage = (pageNum: number) => {
      try {
        setPage(pageNum);
        executeQuery();
      } catch {
        console.error("Failed to change page");
      }
    };

    return {
      posts: posts.map((post) => ({
        id: post.id,
        content: post.content,
        userId: post.userId,
        createdAt: new Date(post.createdAt as string),
      })),
      pagination: {
        count: Math.max(1, Math.ceil(total / 10)),
        page,
        handleChangePage,
      },
      fetching,
    };
  }, [data?.findThreadWithPosts.posts, total, page, fetching, executeQuery]);

  const handleDeletePost = useCallback(
    async (postId: string) => {
      try {
        await executeDeletePostMutation({
          input: {
            postId,
            threadId,
          },
        });
        executeQuery();
      } catch {
        console.error("Failed to delete post");
      }
    },
    [executeDeletePostMutation, executeQuery, threadId]
  );

  const handleEditPost = useCallback(
    (postId: string) => {
      router.push(`/threads/${threadId}/${postId}/edit`);
    },
    [router, threadId]
  );

  return {
    postList,
    refetchPosts: executeQuery,
    handleDeletePost,
    handleEditPost,
  };
};
