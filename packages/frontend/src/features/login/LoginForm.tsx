import { register } from "module";
import { memo } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

type Props = {
  onSubmit: () => void;
  loginErrorMessage: string | null;
};

export const LoginForm = memo<Props>(({ onSubmit, loginErrorMessage }) => {
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
              <h2 className="text-4xl font-bold">ログイン</h2>
              {loginErrorMessage && <p>{loginErrorMessage}</p>}
              <form onSubmit={onSubmit} className="mt-12">
                <div className="mb-3">
                  <input
                    placeholder="you@gmail.com"
                    {...register("email")}
                    className="text-xl w-7/12 p-3 border rounded"
                  />
                  <p>{errors.email?.message?.toString()}</p>
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="パスワード"
                    {...register("password")}
                    className="text-xl w-7/12 p-3 border rounded"
                  />
                  <p>{errors.password?.message?.toString()}</p>
                </div>
                <button
                  type="submit"
                  className="mb-3 text-xl w-4/12 bg-blue-800 text-white py-2 rounded hover:opacity-75"
                >
                  ログイン
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
