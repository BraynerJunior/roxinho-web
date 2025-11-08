"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/validations/auth-schemas";
import { loginAction } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Link from "next/link";
import {
  PasswordInput,
  PasswordInputAdornmentToggle,
  PasswordInputInput,
} from "@/components/ui/password-input";

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const result = await loginAction(values);
    if (result?.error) {
      toast.error("Erro ao logar");
    } else {
      toast.success("Login realizado com sucesso!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-violet-950">E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-violet-950">Senha</FormLabel>
                <FormControl>
                  <PasswordInput>
                    <PasswordInputInput placeholder="Senha" {...field} />
                    <PasswordInputAdornmentToggle />
                  </PasswordInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
            Entrar
          </Button>
        </form>
      </Form>
      <p className="text-xs pt-2">
        Ou crie sua conta{" "}
        <Link
          className="text-sm text-violet-700 font-semibold"
          href="/register"
        >
          aqui!
        </Link>
      </p>
    </>
  );
}
