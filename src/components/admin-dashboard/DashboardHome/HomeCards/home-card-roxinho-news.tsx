import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconClick, IconTrendingUp } from "@tabler/icons-react";
import Link from "next/link";

export default function AdminHomeCardRoxinhoNews() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Roxinho News</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          Card Atualizado
        </CardTitle>
        <CardAction>
          <Badge variant="outline" asChild>
            <Link href="/roxinho-news">
              Ver
              <IconClick />
            </Link>
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Collections
          <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Atraso na fatura</div>
      </CardFooter>
    </Card>
  );
}
