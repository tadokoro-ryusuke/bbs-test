import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { use, useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/threads");
  }, []);

  return null;
};

export default Home;
