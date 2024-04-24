import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  content: string;
};

const schema = z.object({
  email: z.string(),
});

export const useThreadCreate = () => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(
    null
  );
  const router = useRouter();
  const { redirect } = router.query;

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
    } catch {
      setCreateErrorMessage("スレッドの作成に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(handleSubmit),
    isLoading,
    createErrorMessage,
  };
};
