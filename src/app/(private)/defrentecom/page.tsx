import CardFuncionarioDeFrenteCom from "@/components/defrentecomComponents/CardFuncionarioDeFrenteCom";
import DestaqueDeFrenteCom from "@/components/defrentecomComponents/Destaque";
import { findAllInterviews } from "@/lib/interview/queries";

import clsx from "clsx";

export default async function DeFrenteComPage() {
  const interviews = await findAllInterviews();
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
          "flex items-center justify-start flex-col",
          "max-w-7xl",
          "my-8"
        )}
      >
        <h1 className="text-4xl text-violet-100">De frente Com</h1>
        <DestaqueDeFrenteCom
          id={lastInterview.id}
          name={lastInterview.user.name}
          role={lastInterview.user.role}
          profilePictureUrl={lastInterview.user.profilePictureUrl}
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
            {allInterviews.map((interview) => {
              return (
                <CardFuncionarioDeFrenteCom
                  id={interview.id}
                  profilePictureUrl={interview.user.profilePictureUrl}
                  key={interview.id}
                  name={interview.user.name}
                  role={interview.user.role}
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
