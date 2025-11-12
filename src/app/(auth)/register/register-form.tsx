"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/validations/auth-schemas";
import { registerUser } from "@/actions/auth/register";
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
import { loginAction } from "@/actions";

export function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    const toastId = toast.loading("Registrando usuário...");

    const result = await registerUser(values);

    if (!result?.success) {
      toast.error(result?.message ?? "Erro ao registrar.", { id: toastId });
      return;
    }

    toast.success("Usuário registrado com sucesso!", { id: toastId });

    const loginResult = await loginAction({
      email: values.email,
      password: values.password,
    });

    if (loginResult?.error) {
      toast.error(loginResult.error.general[0]);
      return;
    }

    toast.success("Bem-vindo(a)!", { id: toastId });
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-violet-950">Nome Completo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome Completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-violet-950">
                  Confirme a senha
                </FormLabel>
                <FormControl>
                  <PasswordInput>
                    <PasswordInputInput
                      placeholder="Confirmar senha"
                      {...field}
                    />
                    <PasswordInputAdornmentToggle />
                  </PasswordInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
            Registrar
          </Button>
        </form>
      </Form>
      <p className="text-xs pt-2">
        Ou entre{" "}
        <Link className="text-sm text-violet-700 font-semibold" href="/login">
          aqui!
        </Link>
      </p>
    </>
  );
}
