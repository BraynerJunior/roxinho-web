import { limitarTexto } from "@/utils/text-transformer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DestaqueDeFrenteComProps {
  id: number;
  name: string;
  role: string;
  profilePictureUrl?: string;
}

export default function DestaqueDeFrenteCom({
  id,
  name,
  role,
  profilePictureUrl = "/images/default-profile-picture.png",
}: DestaqueDeFrenteComProps) {
  const [firstName] = name.split(" ");
  const formattedName = limitarTexto(name);
  const formattedRole = limitarTexto(role);

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "bg-stone-100",
        "border border-violet-300/30",
        "shadow-lg hover:shadow-violet-700/20 transition-shadow duration-300",
        "max-w-sm sm:max-w-lg rounded-3xl p-6 mx-auto md:max-w-2xl lg:max-w-4xl"
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <Link
          href={`/defrentecom/${id}`}
          className="mx-auto md:col-span-1 flex justify-center"
        >
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-violet-200 shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src={profilePictureUrl}
              alt={`Foto de ${name}`}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <div className="md:col-span-2 flex flex-col gap-4">
          <CardHeader className="text-center md:text-left">
            <h1 className="text-lg font-semibold text-violet-950 bg-violet-200/60 px-3 py-1 rounded-md inline-block">
              Funcionário do Momento
            </h1>
          </CardHeader>

          <CardContent className="space-y-3 text-violet-950/90 text-sm">
            <div className="space-y-1">
              <p>
                <strong>Nome:</strong> {formattedName}
              </p>
              <p>
                <strong>Cargo:</strong> {formattedRole}
              </p>
            </div>
            <p className="bg-violet-200/40 rounded-md p-3 leading-relaxed">
              Esta semana, <strong>{firstName}</strong> conversou com a equipe
              do Roxinho e nos contou um pouco sobre seu cotidiano na empresa.
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
