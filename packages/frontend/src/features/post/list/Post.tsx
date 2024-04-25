import { memo } from "react";

import { Button } from "@/components/button/Button";

import { useAuth } from "@/providers/UserProvider";
import { formatDate } from "@/utils/date";

type Props = {
  content: string;
  userId: string;
  createdAt: Date;
  onDelete: () => void;
  navigateToEdit: () => void;
};

export const Post = memo<Props>(
  ({ content, userId, createdAt, onDelete, navigateToEdit }) => {
    const { user } = useAuth();

    return (
      <div className="flex w-full items-center">
        <div className="p-[8px] flex flex-1 justify-between cursor-pointer items-center">
          <div className="whitespace-pre-wrap">{content}</div>
          <div>投稿日時: {formatDate(createdAt)}</div>
        </div>
        {user?.uid === userId && (
          <div className="flex gap-[8px]">
            <Button onClick={navigateToEdit}>編集</Button>
            <Button onClick={onDelete}>削除</Button>
          </div>
        )}
      </div>
    );
  }
);
