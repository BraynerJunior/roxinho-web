import { logoutAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import Image from "next/image";

export default async function NotAllowedPage() {
  return (
    <div
      className={clsx(
        "flex min-h-screen items-center justify-center",
        "bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat"
      )}
    >
      <div
        className={clsx(
          "flex flex-col md:flex-row gap-8 items-center",
          "min-w-4xl bg-white/10 p-4 rounded-lg mx-8"
        )}
      >
        <div className=" p-5 rounded-full">
          <Image
            src="/images/svg/forbidden.svg"
            alt="imagem de acesso negado"
            width={320}
            height={120}
            className="w-90 sm:w-120"
          />
        </div>
        <Card className="w-sm sm:w-md">
          <CardHeader>
            <CardTitle>Sem Acesso</CardTitle>
            <CardDescription>
              Você ainda não tem acesso ao sistema!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Aguarde até que um administrador libere o seu acesso!</p>
          </CardContent>
          <CardFooter>
            <form action={logoutAction}>
              <Button type="submit">
                Sair
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
