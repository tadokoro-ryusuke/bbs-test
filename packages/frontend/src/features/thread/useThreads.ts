import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { useDeleteThreadMutation, useThreadsQuery } from "@/types/graphql.gen";

export const useThreads = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [{ data, fetching }, executeQuery] = useThreadsQuery({
    variables: {
      page,
    },
    requestPolicy: "network-only",
  });
  const [, executeDeleteThread] = useDeleteThreadMutation();

  const threads = useMemo(() => data?.threads.threads ?? [], [data]);
  const total = data?.threads.threadsCount ?? 0;

  const threadList = useMemo(() => {
    const handleClickThread = async (threadId: string) => {
      await router.push(`/threads/${threadId}`);
    };

    const handleChangePage = (pageNum: number) => {
      setPage(pageNum);
      executeQuery();
    };

    const handleDeleteThread = async (threadId: string) => {
      await executeDeleteThread({
        input: {
          threadId,
        },
      });
      executeQuery();
    };

    return {
      threads: threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        createdAt: new Date(thread.createdAt as string),
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
  }, [
    threads,
    total,
    page,
    fetching,
    router,
    executeQuery,
    executeDeleteThread,
  ]);

  const createThread = useMemo(() => {
    const handleClickCreateThread = async () => {
      await router.push("/threads/create");
    };

    return {
      handleClickCreateThread,
    };
  }, [router]);

  return { threadList, createThread };
};
