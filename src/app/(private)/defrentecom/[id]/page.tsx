import clsx from "clsx";
import { findALlSummariesInterviews, findInterviewById } from "@/lib/interview/queries";
import { InterviewModel } from "@/models/interview/interview-model";
import { MessageContentProps } from "@/components/defrentecomComponents/MessageBar";
import { DeFrenteComResizable } from "@/components/defrentecomComponents/DeFrenteComResizable";
import { InterviewSummary } from "@/repositories/interviews/interview-repository";

export interface DeFrenteComSlugPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeFrenteComChatPage({
  params,
}: DeFrenteComSlugPageProps) {
  const interviews: InterviewSummary[] = await findALlSummariesInterviews();

  const { id } = await params;
  const interview: InterviewModel = await findInterviewById(id);
  const { messages } = interview;
  return (
    <div
      className={clsx(
        "flex justify-center items-center",
        "w-screen h-screen",
        "from-violet-eggplant-500 bg-gradient-to-tr to-violet-400"
      )}
    >
      <DeFrenteComResizable
        interviews={interviews}
        interview={interview}
        messages={messages as MessageContentProps[]}
      />
    </div>
  );
}
