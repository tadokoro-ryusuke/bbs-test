import { useMemo, useState } from "react";

import { useFindThreadWithPostsQuery } from "@/types/graphql.gen";

export const usePosts = (threadId: string) => {
  const [page, setPage] = useState(1);
  const [{ data, fetching }, executeQuery] = useFindThreadWithPostsQuery({
    variables: {
      id: threadId,
      page,
    },
    requestPolicy: "network-only",
  });
  const total = data?.findThreadWithPosts.postsCount ?? 0;

  const postList = useMemo(() => {
    const posts = data?.findThreadWithPosts.posts ?? [];

    const handleChangePage = (pageNum: number) => {
      setPage(pageNum);
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
  }, [data?.findThreadWithPosts.posts, total, page, fetching, executeQuery]);

  return { postList };
};
