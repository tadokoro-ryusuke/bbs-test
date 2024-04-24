import { memo } from "react";

import { usePagination } from "@/components/pagination/usePagination";

type Props = {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
};

export const Pagination = memo<Props>(({ count, page, onPageChange }) => {
  const { startPage, endPage, pages } = usePagination({
    page,
    total: count,
    onPageChange,
  });

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              page === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
        </li>
        {startPage > 1 && (
          <>
            <li>
              <button
                onClick={() => onPageChange(1)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </button>
            </li>
            <li>
              <div className="px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                ...
              </div>
            </li>
          </>
        )}
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              aria-current={page === p ? "page" : undefined}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                page === p
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
              } border border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {p}
            </button>
          </li>
        ))}
        {endPage < count && (
          <>
            <li>
              <div className="px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                ...
              </div>
            </li>
            <li>
              <button
                onClick={() => onPageChange(count)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {count}
              </button>
            </li>
          </>
        )}
        <li>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === count}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              page === count && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
});
