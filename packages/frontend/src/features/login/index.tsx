import { memo } from "react";
import { FormProvider } from "react-hook-form";

import { Loading } from "@/components/loading/Loading";
import { LoginForm } from "@/features/login/LoginForm";
import { useLogin } from "@/features/login/useLogin";

export const Login = memo(() => {
  const { formMethods, handleSubmit, loginErrorMessage, isLoading } =
    useLogin();

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <FormProvider {...formMethods}>
      <LoginForm
        onSubmit={handleSubmit}
        loginErrorMessage={loginErrorMessage}
      />
    </FormProvider>
  );
});
