import Image from "next/image";
import clsx from "clsx";
import { formatDistanceToNow } from "@/utils/format-datetime";

export interface CardFuncionarioDeFrenteComProps {
  name: string;
  role: string;
  profilePictureUrl: string | undefined;
  createdAt: string;
}

export default function CardFuncionarioDeFrenteCom({
  name,
  role,
  profilePictureUrl = "/images/pessoasAleatorio.png",
  createdAt,
}: CardFuncionarioDeFrenteComProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center gap-4",
        "bg-violet-200/60 backdrop-blur-md",
        "border border-violet-200/20",
        "rounded-xl p-4 pr-8",
        "shadow-lg shadow-violet-900/20",
        "group",
        "brightness-90 hover:brightness-100"
      )}
    >
      {/* Foto do funcionário */}
      <div
        className={clsx(
          "group-hover:scale-110 transition",
          "absolute -left-6",
          "w-20 h-20 rounded-full overflow-hidden",
          "shadow-lg shadow-violet-900/40 border-2 border-violet-200/40"
        )}
      >
        <Image
          src={profilePictureUrl}
          alt="Foto do funcionário"
          width={300}
          height={300}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Texto */}
      <div
        className={clsx(
          "pl-16 flex flex-col",
          "group-hover:scale-110 transition",
          "overflow-x-hidden"
        )}
      >
        <div>
          <h2 className="font-semibold text-violet-eggplant-900 text-sm text-nowrap">
            {name}
          </h2>
          <p className="text-violet-eggplant-900/80 text-sm text-nowrap">{role}</p>
        </div>
        <p className="text-xs font-light text-right text-violet-eggplant-900 text-nowrap" >{formatDistanceToNow(createdAt)}</p>
      </div>
    </div>
  );
}
