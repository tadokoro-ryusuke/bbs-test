import { useMemo } from "react";

const SHOW_PAGES = 5;

export const usePagination = ({
  page,
  total,
}: {
  page: number;
  total: number;
}) => {
  const startPage = useMemo(
    () => Math.max(1, page - Math.floor(SHOW_PAGES / 2)),
    [page]
  );

  const endPage = useMemo(
    () => Math.min(page + Math.floor(SHOW_PAGES / 2), total),
    [page, total]
  );

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return {
    startPage,
    endPage,
    pages,
  };
};
