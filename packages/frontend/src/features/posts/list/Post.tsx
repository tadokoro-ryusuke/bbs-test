import { memo } from "react";

import { formatDate } from "@/utils/date";

type Props = {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
};

export const Post = memo<Props>(({ id, content, userId, createdAt }) => (
  <div className="p-[8px] flex justify-between cursor-pointer hover:bg-gray-400">
    <div>{content}</div>
    <div>投稿日時: {formatDate(createdAt)}</div>
  </div>
));
