import clsx from "clsx";

export default function DeFrenteComSlugPage() {
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
          "grid grid-cols-4",
          "w-[90%]",
          "my-8 rounded-sm",
          "bg-violet-eggplant-100 shadow-2xl"
        )}
      >
        <div className={clsx("p-4")}>
          <h1>De frente Com</h1>
        </div>
        <div
          className={clsx(
            "col-span-3",
            "bg-[url(/images/background-mascote-2.png)] bg-cover brightness-50"
          )}
        ></div>
      </main>
    </div>
  );
}
