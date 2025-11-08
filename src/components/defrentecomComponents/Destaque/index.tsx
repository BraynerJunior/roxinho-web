import { limitarTexto } from "@/utils/text-transformer";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export interface DestaqueDeFrenteComProps {
  id: number;
  name: string;
  role: string;
  profilePictureUrl: string | undefined;
}

export default function DestaqueDeFrenteCom({
  id,
  name,
  profilePictureUrl = "/images/default-profile-picture.png",
  role,
}: DestaqueDeFrenteComProps) {
  const [firstName] = name.split(" ");
  const formattedName = limitarTexto(name);
  const formattedRole = limitarTexto(role);

  return (
    <div
      className={clsx(
        "bg-gradient-to-tr from-violet-600 to-violet-300",
        "border border-violet-200/20",
        "backdrop-blur-md",
        "shadow-lg shadow-violet-900/20",
        "p-8 rounded-3xl mx-4 mt-4",
        "max-w-sm sm:max-w-md  md:max-w-4xl"
      )}
    >
      <div
        className={clsx(
          " md:grid-cols-4 gap-5",
          "grid grid-cols-1",
          "overflow-visible",
          "p-3"
        )}
      >
        <Link
          href={`/defrentecom/${id}`}
          className={clsx(
            "mx-auto",
            "w-60 h-60 md:w-90 md:h-90",
            "rounded-full overflow-hidden ",
            "border-1 border-violet-eggplant-600",
            "shadow-violet-eggplant-700/90 shadow-lg group"
          )}
        >
          <Image
            alt="funcionario"
            src={profilePictureUrl}
            width={1200}
            height={740}
            className={clsx(
              "w-full h-full object-cover object-center",
              "group-hover:scale-105",
              "transition"
            )}
          />
        </Link>
        <div
          className={clsx(
            "md:col-span-2 md:col-start-3",
            "flex flex-col flex-start gap-4"
          )}
        >
          <div className={clsx("flex flex-col gap-10 justify-center h-full")}>
            <h1
              className={clsx(
                "text-center text-xl",
                "rounded-sm",
                "bg-violet-eggplant-600/30",
                "text-violet-950",
                "p-2"
              )}
            >
              Funcionário do Momento
            </h1>
            <div className="flex flex-col gap-4">
              <ul
                className={clsx(
                  "bg-violet-200/60 backdrop-blur-md",
                  "border border-violet-200/20",
                  "p-2 rounded-sm",
                  "text-sm",
                  "text-violet-950"
                )}
              >
                <li>Nome: {formattedName}</li>
                <li>Cargo: {formattedRole}</li>
              </ul>
              <p
                className={clsx(
                  "bg-violet-200/60 backdrop-blur-md",
                  "border border-violet-200/20",
                  "p-2 rounded-sm",
                  "text-violet-950",
                  "text-sm"
                )}
              >
                Esta semana, {firstName} conversou com a equipe do Roxinho e nos
                falou como é seu cotidiano dentro da empresa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
