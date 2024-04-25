import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useAddPostMutation } from "@/types/graphql.gen";

type FormData = {
  content: string;
};

const schema = z.object({
  content: z.string().min(1, "投稿する際には必須です"),
});

export const useAddPost = (threadId: string, refetchPosts: () => void) => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [{ fetching: posting }, executeAddPost] = useAddPostMutation();

  const handleAddPost: SubmitHandler<FormData> = useCallback(
    async (data) => {
      try {
        await executeAddPost({
          input: {
            threadId,
            content: data.content,
          },
        });
        refetchPosts();
      } catch {
        // eslint-disable-next-line no-console
        console.error("Failed to add post");
      }
    },
    [executeAddPost, refetchPosts, threadId]
  );

  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(handleAddPost),
    posting,
  };
};
