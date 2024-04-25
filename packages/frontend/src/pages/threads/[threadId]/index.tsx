import { useRouter } from "next/router";

import { Loading } from "@/components/loading/Loading";
import { Posts } from "@/features/post";

const PostsPage = () => {
  const router = useRouter();
  const { threadId } = router.query;

  if (!threadId) {
    return <Loading isLoading />;
  }

  return <Posts threadId={threadId.toString()} />;
};

export default PostsPage;
