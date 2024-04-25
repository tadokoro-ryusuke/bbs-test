import { memo, PropsWithChildren } from "react";

type Props = {
  onClick: () => void;
};

export const Button = memo<PropsWithChildren<Props>>(
  ({ onClick, children }) => (
    <button
      type="button"
      className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[40px]"
      onClick={onClick}
    >
      {children}
    </button>
  )
);
