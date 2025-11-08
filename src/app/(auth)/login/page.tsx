import { auth } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect('/home');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-4 text-center text-violet-950">Entrar</h1>
        <LoginForm />
      </div>
    </div>
  );
}
