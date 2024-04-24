import { memo, PropsWithChildren } from "react";

import { Loading } from "@/components/loading/Loading";
import { Pagination } from "@/components/pagination";

type Props = {
  isLoading: boolean;
};

export const List = memo<PropsWithChildren<Props>>(
  ({ isLoading, children }) => {
    if (isLoading) {
      return <Loading isLoading />;
    }

    if (!children || (Array.isArray(children) && children.length === 0)) {
      return <div className="text-center">情報がありません</div>;
    }

    return <div className="w-full flex flex-col gap-[10px]">{children}</div>;
  }
);
