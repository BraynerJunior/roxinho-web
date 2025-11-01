import DestaqueDeFrenteCom from "@/components/defrentecomComponents/Destaque";
import clsx from "clsx";

export default function DeFrenteComPage() {
  return (
    <div
      className={clsx(
        "flex justify-center",
        "w-screen h-screen",
        "from-violet-eggplant-500 bg-gradient-to-tr to-violet-400"
      )}
    >
      <main
        className={clsx(
          "flex items-center flex-col gap-8",
          "max-w-4xl",
          "my-8"
        )}
      >
        <h1 className="text-4xl">De frente Com</h1>
        <DestaqueDeFrenteCom />
      </main>
    </div>
  );
}
