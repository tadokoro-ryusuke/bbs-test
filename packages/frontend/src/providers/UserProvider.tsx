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
import { authExchange } from "@urql/exchange-auth";

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
        setUser(user);
      } else {
        setToken(null);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const client = useMemo(() => {
    return createClient({
      url: "http://localhost:8080/graphql",
      exchanges: [
        cacheExchange,
        authExchange(async () => ({
          addAuthToOperation: (operation) => {
            if (!token) return operation;

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
                  Authorization: "Bearer " + token,
                },
              },
            });
          },
          didAuthError: (error) => {
            if (
              error.graphQLErrors.some((error) => {
                return error.extensions?.code === "UNAUTHENTICATED";
              })
            ) {
              router.push("/login");
            }

            return false;
          },
          async refreshAuth() {},
        })),
        fetchExchange,
      ],
    });
  }, [token]);

  const content = client ? (
    <URQLProvider value={client}>{children}</URQLProvider>
  ) : null;

  return (
    <UserContext.Provider value={{ user, token }}>
      <Suspense fallback={<Loading isLoading />}>{content}</Suspense>
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
