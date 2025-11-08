import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <main className="relative flex flex-col min-h-screen bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <header className="relative z-10 w-full p-6">
        <nav className="flex justify-end gap-4">
          <Link
            href="/login"
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
          >
            Registrar
          </Link>
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-6xl">
          Bem-vindo ao Roxinho Web
        </h1>
        <p className="mt-4 max-w-lg text-lg text-gray-200 drop-shadow-md">
          Faça login ou registre-se para começar.
        </p>
      </div>
    </main>
  );
}
