import { memo } from "react";
import { FormProvider } from "react-hook-form";

import { Loading } from "@/components/loading/Loading";
import { ThreadCreateForm } from "@/features/thread/create/ThreadCreateForm";
import { useThreadCreate } from "@/features/thread/create/useThreadCreate";

export const ThreadCreate = memo(() => {
  const { formMethods, handleSubmit, isLoading, createErrorMessage } =
    useThreadCreate();

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <FormProvider {...formMethods}>
      <ThreadCreateForm
        onSubmit={handleSubmit}
        createErrorMessage={createErrorMessage}
      />
    </FormProvider>
  );
});
