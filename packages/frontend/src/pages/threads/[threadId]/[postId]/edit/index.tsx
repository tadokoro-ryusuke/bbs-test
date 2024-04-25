import { useRouter } from "next/router";

import { Loading } from "@/components/loading/Loading";
import { EditPost } from "@/features/post/edit";

const PostEditPage = () => {
  const router = useRouter();
  const { threadId, postId } = router.query;

  if (!threadId || !postId) {
    return <Loading isLoading />;
  }

  return <EditPost threadId={threadId.toString()} postId={postId.toString()} />;
};

export default PostEditPage;
