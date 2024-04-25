import { authExchange } from "@urql/exchange-auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  cacheExchange,
  createClient,
  fetchExchange,
  makeOperation,
  Provider as URQLProvider,
} from "urql";

import { Loading } from "@/components/loading/Loading";

import auth from "@/lib/firebase";

/* eslint-disable @typescript-eslint/no-floating-promises */

const UserContext = createContext<{
  user: User | null;
  token: string | null;
}>({
  user: null,
  token: null,
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
        setUser(u);
      } else {
        setToken(null);
        setUser(null);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = useMemo(
    () =>
      createClient({
        url: "http://localhost:8080/graphql",
        exchanges: [
          cacheExchange,
          authExchange(async () => ({
            addAuthToOperation: (operation) => {
              if (!token) {
                return operation;
              }

              const fetchOptions =
                typeof operation.context.fetchOptions === "function"
                  ? operation.context.fetchOptions()
                  : operation.context.fetchOptions || {};

              return makeOperation(operation.kind, operation, {
                ...operation.context,
                fetchOptions: {
                  ...fetchOptions,
                  headers: {
                    ...fetchOptions.headers,
                    Authorization: `Bearer ${token}`,
                  },
                },
              });
            },
            didAuthError: (error) => {
              if (
                error.graphQLErrors.some(
                  (e) => e.extensions?.code === "UNAUTHENTICATED"
                )
              ) {
                const redirectPath = router.pathname;
                router.push(`/login?redirect=${redirectPath}`);
              }

              return false;
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            async refreshAuth() {},
          })),
          fetchExchange,
        ],
      }),
    [router, token]
  );

  const content = client ? (
    <URQLProvider value={client}>{children}</URQLProvider>
  ) : null;

  const contextValue = useMemo(() => ({ user, token }), [user, token]);

  return (
    <UserContext.Provider value={contextValue}>
      <Suspense fallback={<Loading isLoading />}>{content}</Suspense>
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
