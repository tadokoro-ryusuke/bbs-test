import { memo } from "react";

import { List } from "@/components/list/List";
import { Pagination } from "@/components/pagination";
import { Thread } from "@/features/thread/list/Thread";

type Props = {
  threads: {
    id: string;
    title: string;
    createdAt: Date;
  }[];
  pagination: {
    page: number;
    count: number;
    handleChangePage: (page: number) => void;
  };
  fetching: boolean;
  handleClickThread: (id: string) => void;
};

export const ThreadList = memo<Props>(
  ({ threads, fetching, pagination, handleClickThread }) => {
    return (
      <>
        <List isLoading={fetching}>
          {threads.map((thread) => (
            <Thread
              key={thread.id}
              id={thread.id}
              title={thread.title}
              createdAt={thread.createdAt}
              onClick={() => handleClickThread(thread.id)}
            />
          ))}
        </List>
        <Pagination
          page={pagination.page}
          count={pagination.count}
          onPageChange={pagination.handleChangePage}
        />
      </>
    );
  }
);
