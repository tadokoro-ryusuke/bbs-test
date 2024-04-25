import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/threads");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Home;
