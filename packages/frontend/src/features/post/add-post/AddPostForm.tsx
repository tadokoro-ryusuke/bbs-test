import { memo } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  onSubmit: () => void;
};

export const AddPostForm = memo<Props>(({ onSubmit }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-16 text-center">
      <h2 className="text-4xl font-bold">投稿</h2>
      <form onSubmit={onSubmit} className="mt-12">
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
