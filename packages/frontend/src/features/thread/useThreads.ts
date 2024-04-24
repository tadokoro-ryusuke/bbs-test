import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { useDeleteThreadMutation, useThreadsQuery } from "@/types/graphql.gen";

export const useThreads = () => {
  const router = useRouter();
  const [page, usePage] = useState(1);

  const [{ data, fetching }, executeQuery] = useThreadsQuery({
    variables: {
      page,
    },
    requestPolicy: "network-only",
  });
  const [, executeDeleteThread] = useDeleteThreadMutation();

  const threads = data?.threads.threads ?? [];
  const total = data?.threads.threadsCount ?? 0;

  const threadList = useMemo(() => {
    const handleClickThread = (threadId: string) => {
      router.push(`/threads/${threadId}`);
    };

    const handleChangePage = (page: number) => {
      usePage(page);
      executeQuery();
    };

    const handleDeleteThread = async (threadId: string) => {
      await executeDeleteThread({
        input: {
          threadId,
        },
      });
      await executeQuery();
    };

    return {
      threads: threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        createdAt: new Date(thread.createdAt),
        userId: thread.userId,
      })),
      pagination: {
        count: Math.max(1, Math.ceil(total / 10)),
        page,
        handleChangePage,
      },
      handleDeleteThread,
      fetching,
      handleClickThread,
    };
  }, [router, threads, fetching, total, page]);

  const createThread = useMemo(() => {
    const handleClickCreateThread = () => {
      router.push("/threads/create");
    };

    return {
      handleClickCreateThread,
    };
  }, [router]);

  return { threadList, createThread };
};
