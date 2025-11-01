import clsx from "clsx";
import Image from "next/image";

export default function DestaqueDeFrenteCom() {
  return (
    <div
      className={clsx(
        "bg-gradient-to-tr from-violet-600 to-violet-300",
        "border border-violet-200/20",
        "backdrop-blur-md",
        "shadow-lg shadow-violet-900/20",
        "p-8 rounded-3xl mx-4 mt-4",
      )}
    >
      <div
        className={clsx(
          "md:grid-cols-4 gap-5",
          "grid grid-cols-1",
          "overflow-visible",
          "p-3"
        )}
      >
        <div
          className={clsx(
            "w-90 h-90",
            "rounded-full overflow-hidden ",
            "border-1 border-violet-eggplant-600",
            "shadow-violet-eggplant-700/90 shadow-lg group"
          )}
        >
          <Image
            alt="funcionario"
            src="/images/pessoasAleatorio.png"
            width={1200}
            height={740}
            className={clsx(
              "w-full h-full object-cover object-center",
              "group-hover:scale-105",
              "transition"
            )}
          />
        </div>
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
                  "text-sm"
                )}
              >
                <li>Nome: Alberto Santos</li>
                <li>Cargo: Atendente</li>
                <li>Idade: 27 anos</li>
              </ul>
              <p
                className={clsx(
                   "bg-violet-200/60 backdrop-blur-md",
        "border border-violet-200/20",
                  "p-2 rounded-sm",
                  "text-sm"
                )}
              >
                Esta semana, Alberto Santos conversou com a equipe do Roxinho e
                nos falou como é seu cotidiano dentro da empresa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
