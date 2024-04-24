import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { useThreadsQuery } from "@/types/graphql.gen";

export const useThreads = () => {
  const router = useRouter();
  const [page, usePage] = useState(1);
  const [{ data, fetching }, executeQuery] = useThreadsQuery({
    variables: {
      page,
    },
    requestPolicy: "network-only",
  });

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

    return {
      threads: threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        createdAt: new Date(thread.createdAt),
      })),
      pagination: {
        count: Math.max(1, Math.ceil(total / 10)),
        page,
        handleChangePage,
      },
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
