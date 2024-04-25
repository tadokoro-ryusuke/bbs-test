import { memo } from "react";
import { FormProvider } from "react-hook-form";

import { Loading } from "@/components/loading/Loading";
import { useAddPost } from "@/features/post/add-post/useAddPost";

import { AddPostForm } from "./AddPostForm";

type Props = {
  threadId: string;
  refetchPosts: () => void;
};

export const AddPost = memo<Props>(({ threadId, refetchPosts }) => {
  const { formMethods, handleSubmit, posting } = useAddPost(
    threadId,
    refetchPosts
  );

  if (posting) {
    return <Loading isLoading />;
  }

  return (
    <FormProvider {...formMethods}>
      <AddPostForm onSubmit={handleSubmit} />
    </FormProvider>
  );
});
