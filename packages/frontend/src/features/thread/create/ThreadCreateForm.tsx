import { register } from 'module';
import { memo } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type Props = {
  onSubmit: () => void;
  createErrorMessage: string | null;
};

export const ThreadCreateForm = memo<Props>(
  ({ onSubmit, createErrorMessage }) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="flex flex-col h-screen">
        <div className="flex-auto">
          <div className="flex justify-center mt-20">
            <div className="w-9/12 border bg-white">
              <div className="my-16 text-center">
                <h2 className="text-4xl font-bold">スレッド作成</h2>
                {createErrorMessage && <p>{createErrorMessage}</p>}
                <form onSubmit={onSubmit} className="mt-12">
                  <div className="mb-3 px-8">
                    <input
                      {...register("title", {
                        required: "スレッド名は必須です",
                      })}
                      className="text-xl w-full p-3 border rounded"
                    />
                    <p>{errors.title?.message?.toString()}</p>
                  </div>
                  <button
                    type="submit"
                    className="mb-3 text-xl w-4/12 bg-blue-800 text-white py-2 rounded hover:opacity-75"
                  >
                    作成
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
