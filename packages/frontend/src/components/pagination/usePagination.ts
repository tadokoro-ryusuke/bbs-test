import { count } from "console";
import { useMemo } from "react";
import { start } from "repl";

const SHOW_PAGES = 5;

export const usePagination = ({
  page,
  total,
  onPageChange,
}: {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}) => {
  const startPage = useMemo(() => {
    return Math.max(1, page - Math.floor(SHOW_PAGES / 2));
  }, [page]);

  const endPage = useMemo(() => {
    return Math.min(page + Math.floor(SHOW_PAGES / 2), total);
  }, [startPage, total]);

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
