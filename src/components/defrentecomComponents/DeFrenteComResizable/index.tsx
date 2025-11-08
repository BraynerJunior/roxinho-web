/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

import CardFuncionarioDeFrenteCom from "@/components/defrentecomComponents/CardFuncionarioDeFrenteCom";
import MessageBar from "@/components/defrentecomComponents/MessageBar";
import { formatDatetimeNoHour } from "@/utils/format-datetime";
import clsx from "clsx";

interface DeFrenteComResizableProps {
  interviews: any[];
  interview: any;
  messages: any[];
}

export function DeFrenteComResizable({
  interviews,
  interview,
  messages,
}: DeFrenteComResizableProps) {
  const isMobile = useIsMobile();

  const interviewListPanel = (
    <>
      <div className="w-full flex items-center justify-center bg-zinc-400">
        <h2 className="py-2 bg-violet-200/60 border border-violet-200/20 shadow-lg shadow-violet-900/20 font-semibold text-violet-eggplant-900 h-full w-full text-center pt-1">
          Histórico de entrevistas
        </h2>
      </div>
      <div className="flex flex-col h-full pb-15 bg-zinc-400 gap-5 items-center justify overflow-y-auto scrollbar-hide pt-4">
        <div className="min-w-[85%] max-w-[85%] ml-2 flex flex-col gap-3 ">
          {interviews.map((interviewItem) => (
            <CardFuncionarioDeFrenteCom
              id={interviewItem.id}
              profilePictureUrl={interviewItem.avatarUrl}
              key={interviewItem.userId}
              name={interviewItem.username}
              role={interviewItem.jobRole}
              createdAt={interviewItem.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );

  const chatPanel = (
    <div className="flex h-full items-start justify-start p-6 bg-[url(/images/background-mascote-2.png)] bg-cover overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-12 mt-4 w-full px-6 py-2 mx-2">
        <h2
          className={clsx(
            "self-center",
            "p-2 rounded-md",
            "bg-violet-200/60 backdrop-blur-md w-fit",
            "border border-violet-200/20",
            "text-lg text-violet-eggplant-900 text-center"
          )}
        >
          Entrevista do dia {formatDatetimeNoHour(interview.createdAt)}
        </h2>
        {messages.map((message) => (
          <MessageBar
            profilePictureUrl={interview.user.profilePictureUrl}
            name={interview.user.name}
            message={message}
            key={message.id}
          />
        ))}
      </div>
    </div>
  );

  if (isMobile === undefined) {
    return (
      <div className="max-h-[90%] h-[90%] rounded-lg border min-w-[100px] max-w-[85%] w-[85%] shadow-2xl">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <Tabs
        defaultValue="chat"
        className="max-h-[90%] h-full max-w-[95%] w-full rounded-lg border shadow-2xl flex flex-col bg-white"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Histórico</TabsTrigger>
          <TabsTrigger value="chat">Entrevista</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="flex-1 overflow-y-auto">
          {interviewListPanel}
        </TabsContent>
        <TabsContent value="chat" className="flex-1 overflow-y-auto">
          {chatPanel}
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[90%] rounded-lg border min-w-[100px] max-w-[85%] shadow-2xl"
    >
      <ResizablePanel
        defaultSize={20}
        className={clsx(
          "sm:min-w-[20%] md:min-w-[30%]",
          "md:max-w-[35%] lg:max-w-[20%] xl:max-w-[25%]"
        )}
      >
        {interviewListPanel}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75} minSize={50}>
        {chatPanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
