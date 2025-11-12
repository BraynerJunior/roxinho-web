"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center m-4 rounded-lg bg-white">
        <h2 className="mb-6 text-5xl font-semibold">Oops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">
          Ocorreu um erro inesperado 😕
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Já estamos trabalhando para resolver. Tente novamente mais tarde.
        </p>
        <Button
          size="lg"
          className="cursor-pointer rounded-lg text-base shadow-sm bg-violet-800 hover:bg-violet-900"
        >
          <Link href="/">Voltar para a tela Inicial</Link>
        </Button>
      </div>

      <div className="relative max-h-screen w-full p-2 max-lg:hidden">
        <div className="bg-white rounded-full absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2 ">
          <Image
            src="/images/svg/bad-request.svg"
            alt="404 illustration"
            width={1200}
            height={800}
          />
        </div>
      </div>
    </div>
  );
}
