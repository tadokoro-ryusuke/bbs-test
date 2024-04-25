import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  content: string;
  handleEditPost: (content: string) => void;
};

type FormData = {
  content: string;
};

const schema = z.object({
  content: z.string().min(1, "投稿する際には必須です"),
});

export const EditPostForm = memo<Props>(({ content, handleEditPost }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      content,
    },
    resolver: zodResolver(schema),
  });

  const handleEdit = useCallback(
    (data: FormData) => {
      handleEditPost(data.content);
    },
    [handleEditPost]
  );

  return (
    <div className="my-16 text-center">
      <h2 className="text-4xl font-bold">投稿の編集</h2>
      <form onSubmit={handleSubmit(handleEdit)} className="mt-12">
        <div className="mb-3 px-8">
          <textarea
            {...register("content", {
              required: "投稿内容は必須です",
            })}
            className="text-xl w-full p-3 border rounded"
          />
          <p>{errors.content?.message?.toString()}</p>
        </div>
        <button
          type="submit"
          className="mb-3 text-xl w-4/12 bg-blue-800 text-white py-2 rounded hover:opacity-75"
        >
          作成
        </button>
      </form>
    </div>
  );
});
