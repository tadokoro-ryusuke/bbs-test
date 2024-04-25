import "@/styles/globals.css";

import { Suspense } from "react";

import { Loading } from "@/components/loading/Loading";
import { BaseLayout } from "@/layouts/BaseLayout";

import { UserProvider } from "@/providers/UserProvider";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Suspense fallback={<Loading isLoading />}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Suspense>
  </UserProvider>
);

export default App;
