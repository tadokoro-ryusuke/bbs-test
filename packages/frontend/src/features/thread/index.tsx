import { memo } from "react";

import { Button } from "@/components/button/Button";
import { ThreadList } from "@/features/thread/list";
import { useThreads } from "@/features/thread/useThreads";

export const Threads = memo(() => {
  const { threadList, createThread } = useThreads();

  return (
    <>
      <Button onClick={createThread.handleClickCreateThread}>
        スレッドを作成する
      </Button>
      <ThreadList {...threadList} />
    </>
  );
});
