import clsx from "clsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { findAllInterviews, findInterviewById } from "@/lib/interview/queries";
import CardFuncionarioDeFrenteCom from "@/components/defrentecomComponents/CardFuncionarioDeFrenteCom";
import MessageBar from "@/components/defrentecomComponents/MessageBar";

export interface DeFrenteComSlugPageProps {
  params: Promise<{ id: string }>
}

export default async function DeFrenteComSlugPage({ params }: DeFrenteComSlugPageProps) {
  const interviews = await findAllInterviews();

  const { id } = await params
  const interview = await findInterviewById(id)
  const { messages }= interview
  console.log(interview)
  return (

    <div
      className={clsx(
        "flex justify-center items-center",
        "w-screen h-screen",
        "from-violet-eggplant-500 bg-gradient-to-tr to-violet-400"
      )}
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[90%] rounded-lg border min-w-[100px] max-w-[85%] shadow-2xl"
      >


        <ResizablePanel defaultSize={20} maxSize={20}>
          <div className="  h-[5%] w-full flex items-center justify-center bg-zinc-400 roud ">
            <h2 className="bg-violet-200/60 border border-violet-200/20 shadow-lg shadow-violet-900/20 font-semibold text-violet-eggplant-900 h-full w-full text-center pt-1">Histórico de entrevistas</h2>
          </div>
          <div className="flex flex-col h-full pb-15 bg-zinc-400 gap-5 items-center justify overflow-y-auto scrollbar-hide pt-4">


            <div className="min-w-[85%] max-w-[85%] ml-3 flex flex-col gap-3 ">
              {interviews.map((interview) => {
                return (
                  <CardFuncionarioDeFrenteCom
                    profilePictureUrl={interview.user.profilePictureUrl}
                    key={interview.user.id}
                    name={interview.user.name}
                    role={interview.user.role}
                    createdAt={interview.createdAt}
                  />
                );
              })}
            </div>

          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6 bg-[url(/images/background-mascote-2.png)] bg-cover brightness-75">
            {messages.map((message) => {
              return (
                <MessageBar
                  profilePictureUrl={interview.user.profilePictureUrl}
                  name={""}
                  message={message}
                  key={message.id}
                />
              )
            })}

          </div>
        </ResizablePanel>
      </ResizablePanelGroup>


    </div>
  );
}
