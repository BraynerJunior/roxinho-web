/* eslint-disable @typescript-eslint/no-explicit-any */
import CardFuncionarioDeFrenteCom from "@/components/defrentecomComponents/CardFuncionarioDeFrenteCom";
import DestaqueDeFrenteCom from "@/components/defrentecomComponents/Destaque";
import { findALlSummariesInterviews } from "@/lib/interview/queries";

import clsx from "clsx";

export default async function DeFrenteComPage() {
  const interviews = await findALlSummariesInterviews();

  if (!interviews || interviews.length === 0) {
    return (
      <div
        className={clsx(
          "flex justify-center items-center",
          "w-screen min-h-screen",
          "bg-[url(/images/backgroundhome.svg)] bg-cover"
        )}
      >
        <div className="text-center text-violet-100">
          <h1 className="text-4xl mb-4">De frente Com</h1>
          <p>Nenhuma entrevista encontrada.</p>
        </div>
      </div>
    );
  }

  const [lastInterview, ...allInterviews] = interviews;

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
          "flex items-center justify-evenly flex-col",
          "max-w-7xl",
          "my-8"
        )}
      >
        <h1 className="text-4xl text-violet-100">De frente Com</h1>
        <DestaqueDeFrenteCom
          id={lastInterview.id}
          name={lastInterview.username}
          role={lastInterview.jobRole ?? "Sem cargo"}
          profilePictureUrl={lastInterview.avatarUrl}
        />
        <div className={clsx("mt-16")}>
          <h2
            className={clsx(
              "bg-violet-eggplant-700 text-white",
              "p-2 rounded-xl ml-4",
              "w-fit"
            )}
          >
            Veja também os anteriores
          </h2>
          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10",
              "p-8 mt-4 mx-4",
              "rounded-3xl",
              "bg-gradient-to-tr from-violet-600 to-violet-300",
              "overflow-y-auto scrollbar-hide",
              "max-h-[240px]",
              "max-w-sm sm:min-w-md md:max-w-6xl"
            )}
            style={{ overscrollBehavior: "contain" }}
          >
            {(!allInterviews || allInterviews.length === 0) && (
              <div
                className={clsx(
                  "flex items-center justify-center",
                  "bg-stone-100",
                  "border border-violet-300/30 rounded-xl",
                  "shadow-md p-4 mx-8",
                  "text-sm text-violet-900/80 font-medium"
                )}
              >
                <p>Sem mais entrevistas no momento...</p>
              </div>
            )}

            {allInterviews.map((interview: any) => {
              return (
                <CardFuncionarioDeFrenteCom
                  id={interview.id}
                  profilePictureUrl={interview.avatarUrl}
                  key={interview.id}
                  name={interview.username}
                  role={interview.jobRole}
                  createdAt={interview.createdAt}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
