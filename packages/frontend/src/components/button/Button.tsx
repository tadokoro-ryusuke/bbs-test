import { memo, PropsWithChildren } from "react";

type Props = {
  onClick: () => void;
};

export const Button = memo<PropsWithChildren<Props>>(
  ({ onClick, children }) => {
    return (
      <button
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
