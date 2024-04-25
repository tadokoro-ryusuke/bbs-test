import { PropsWithChildren } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => (
  <div className="flex justify-center">
    <div className="w-[1024px]">
      <header className="h-[60px] flex items-center justify-center">
        <h1>掲示板テスト</h1>
      </header>
      <main className="h-full">{children}</main>
    </div>
  </div>
);
