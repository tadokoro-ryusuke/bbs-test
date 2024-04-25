import { ReactNode } from "react";

type Props = {
  isLoading: boolean;
  children?: ReactNode;
};

export const Loading = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return children;
};
