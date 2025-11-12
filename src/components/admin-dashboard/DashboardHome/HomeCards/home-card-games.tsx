import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconDeviceGamepad2 } from "@tabler/icons-react";

export default function AdminHomeCardGames() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Jogos</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          Caça ao Tesouro
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium items-center">
          4ª dica <IconDeviceGamepad2 className="size-4" />
        </div>
        <div className="text-muted-foreground">Está no card de...</div>
      </CardFooter>
    </Card>
  );
}
