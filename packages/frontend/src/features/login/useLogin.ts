import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上である必要があります" }),
});

export const useLogin = () => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );
  const router = useRouter();
  const { redirect } = router.query;

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      if (!!redirect) {
        router.push(redirect.toString());
      }
    } catch {
      setLoginErrorMessage("ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(handleSubmit),
    isLoading,
    loginErrorMessage,
  };
};
