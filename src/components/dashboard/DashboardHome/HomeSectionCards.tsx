import {
  IconTrendingUp,
  IconTrophy,
  IconClick
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/ui/site-header";

export function HomeSectionCards() {
  return (
    <>
    <SiteHeader title="Resumo" />
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>De frente Com</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              20 de outubro
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Última entrevista <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Último entrevistado: Sergio Brayner
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Nossos resultados</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Hydra
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Equipe top 1<IconTrophy className="size-4" />
            </div>
            <div className="text-muted-foreground">
             Melhor agente: Junin
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Jogos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Caça ao Tesouro
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
             4ª dica <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Está no card de...
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Roxinho News</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Card Atualizado
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                Ver
                <IconClick />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
             Collections<IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Atraso na fatura
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
