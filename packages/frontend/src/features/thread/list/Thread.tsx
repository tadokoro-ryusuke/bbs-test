import { useRouter } from "next/router";
import { memo } from "react";

import { formatDate } from "@/utils/date";

type Props = {
  id: string;
  title: string;
  createdAt: Date;
  onClick: () => void;
};

export const Thread = memo<Props>(({ id, title, createdAt, onClick }) => {
  return (
    <div
      className="p-[8px] flex justify-between cursor-pointer hover:bg-gray-400"
      onClick={onClick}
    >
      <div>{title}</div>
      <div>作成日時: {formatDate(createdAt)}</div>
    </div>
  );
});
