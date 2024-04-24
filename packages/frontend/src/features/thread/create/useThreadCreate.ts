import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { logout } from "@/lib/auth";
import { useCreateThreadMutation } from "@/types/graphql.gen";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  title: string;
};

const schema = z.object({
  title: z.string().min(1, "スレッド名は必須です"),
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
  const [, executeMutation] = useCreateThreadMutation();

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      await executeMutation({
        input: {
          title: data.title,
        },
      });
      router.push("/threads");
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
