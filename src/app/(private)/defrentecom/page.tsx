import CardFuncionario from "@/components/defrentecomComponents/CardFuncionario";
import DestaqueDeFrenteCom from "@/components/defrentecomComponents/Destaque";
import clsx from "clsx";

export default function DeFrenteComPage() {
  return (
    <div
      className={clsx(
        "flex justify-center",
        "w-screen min-h-screen",
        "bg-[url(/images/backgroundhome.svg)] bg-cover"
      )}
    >
      <main
        className={clsx(
          "flex items-center justify-start flex-col",
          "max-w-4xl",
          "my-8"
        )}
      >
        <h1 className="text-4xl text-violet-100">De frente Com</h1>
        <DestaqueDeFrenteCom />
        <div className={clsx("mt-16")}>
          <h2
            className={clsx(
              "bg-violet-eggplant-700 text-white",
              "p-2 rounded-xl",
              "w-fit"
            )}
          >
            Veja também os anteriores
          </h2>
          <div
            className={clsx(
              "grid grid-cols-3 gap-10",
              "p-8 mt-4",
              "rounded-3xl",
              "bg-gradient-to-tr from-violet-600 to-violet-300",
              "overflow-y-auto scrollbar-hide",
              "max-h-[240px]",
              "w-full"
            )}
            style={{ overscrollBehavior: "contain" }}
          >
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
            <CardFuncionario />
          </div>
        </div>
      </main>
    </div>
  );
}
