import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findLatestInterview } from "@/lib/interview/queries";
import { formatDateExtensive } from "@/utils/format-datetime";
import { limitarTexto } from "@/utils/text-transformer";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export default async function AdminHomeCardDeFrenteCom() {
  const lastInterview = await findLatestInterview();

  if (!lastInterview) {
    return (
          <Card className="@container/card">
      <CardHeader>
        <CardDescription>De frente Com</CardDescription>
        <CardTitle className="sm:text-sm lg:text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
        Nada Aqui 👻
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div
          className="line-clamp-1 flex gap-2 font-medium items-center"
        >
          Nenhum dado encontrado
        </div>
        <div className="text-muted-foreground">
          Sem entrevistas no momento
        </div>
      </CardFooter>
    </Card>
    )
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>De frente Com</CardDescription>
        <CardTitle className="sm:text-sm lg:text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {limitarTexto(lastInterview?.username as string, 16, true)}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <Link
          href={`/defrentecom/${lastInterview?.id}`}
          className="line-clamp-1 flex gap-2 font-medium items-center"
        >
          Última entrevista <IconExternalLink className="size-4" />
        </Link>
        <div className="text-muted-foreground">
          data: {formatDateExtensive(lastInterview?.createdAt as string)}
        </div>
      </CardFooter>
    </Card>
  );
}
