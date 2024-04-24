import { useRouter } from "next/router";
import { memo } from "react";

import { Button } from "@/components/button/Button";
import { useAuth } from "@/providers/UserProvider";
import { formatDate } from "@/utils/date";

type Props = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  onClick: () => void;
  onDelete: (threadId: string) => void;
};

export const Thread = memo<Props>(
  ({ id, title, createdAt, onClick, userId, onDelete }) => {
    const { user } = useAuth();

    return (
      <div className="flex w-full">
        <div
          className="p-[8px] flex flex-1 justify-between cursor-pointer hover:bg-gray-400"
          onClick={onClick}
        >
          <div>{title}</div>
          <div>作成日時: {formatDate(createdAt)}</div>
        </div>
        <div>
          {user?.uid === userId && (
            <Button onClick={() => onDelete(id)}>削除</Button>
          )}
        </div>
      </div>
    );
  }
);
