import { useMemo, useState } from "react";

import { useFindThreadWithPostsQuery } from "@/types/graphql.gen";

export const usePosts = (threadId: string) => {
  const [page, usePage] = useState(1);
  const [{ data, fetching }, executeQuery] = useFindThreadWithPostsQuery({
    variables: {
      id: threadId,
      page,
    },
    requestPolicy: "network-only",
  });
  const posts = data?.findThreadWithPosts.posts ?? [];
  const total = data?.findThreadWithPosts.postsCount ?? 0;

  const postList = useMemo(() => {
    const handleChangePage = (page: number) => {
      usePage(page);
      executeQuery();
    };

    return {
      posts: posts.map((post) => ({
        id: post.id,
        content: post.content,
        userId: post.userId,
        createdAt: new Date(post.createdAt),
      })),
      pagination: {
        count: Math.max(1, Math.ceil(total / 10)),
        page,
        handleChangePage,
      },
      fetching,
    };
  }, [posts, fetching]);

  return { postList };
};
