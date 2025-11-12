import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrophy } from "@tabler/icons-react";

export default function AdminHomeCardOurResults() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Nossos resultados</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          Hydra
        </CardTitle>
        <CardAction>
          <Badge variant="outline"></Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium items-center">
          Equipe top 1 <IconTrophy className="size-4" />
        </div>
        <div className="text-muted-foreground">Melhor agente: Junin</div>
      </CardFooter>
    </Card>
  );
}
