import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "@/utils/format-datetime";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardFuncionarioDeFrenteComProps {
  id: string;
  name: string;
  role: string;
  profilePictureUrl?: string;
  createdAt: string;
}

export default function CardFuncionarioDeFrenteCom({
  id,
  name,
  role,
  profilePictureUrl = "/images/default-profile-picture.png",
  createdAt,
}: CardFuncionarioDeFrenteComProps) {
  const [firstName, secondName] = name.split(" ");

  return (
    <Link href={`/defrentecom/${id}`} className="block group">
      <Card
        className={cn(
          "relative flex items-center gap-4 overflow-hidden",
          "bg-stone-100",
          "border border-violet-300/30 rounded-xl p-4 pl-20",
          "shadow-md hover:shadow-violet-400/20 transition-all duration-300"
        )}
      >
        {/* Foto */}
        <div className="absolute left-4 w-14 h-14 rounded-full overflow-hidden border-2 border-violet-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Image
            src={profilePictureUrl}
            alt={`Foto de ${name}`}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>

        <CardContent className="pl-4 text-sm flex flex-col justify-center">
          <h2 className="font-semibold text-violet-950 leading-tight">
            {firstName} <span className="hidden sm:inline">{secondName}</span>
          </h2>
          <p className="text-violet-900/80 text-xs">{role}</p>
          <p className="text-violet-900/60 text-xs mt-1">
            {formatDistanceToNow(createdAt)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
