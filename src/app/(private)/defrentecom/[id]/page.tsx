import clsx from "clsx";
import { findAllSummariesInterviews, findInterviewById } from "@/lib/interview/queries";
import { InterviewModel } from "@/models/interview/interview-model";
import { MessageContentProps } from "@/components/defrentecomComponents/MessageBar";
import { DeFrenteComResizable } from "@/components/defrentecomComponents/DeFrenteComResizable";
import { InterviewSummary } from "@/models/interview/interview-summary-model";

export interface DeFrenteComSlugPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeFrenteComChatPage({
  params,
}: DeFrenteComSlugPageProps) {
  const { data: interviews }: { data: InterviewSummary[] } =
    await findAllSummariesInterviews(1, 100);

  const { id } = await params;
  const interview: InterviewModel = await findInterviewById(parseInt(id));
  const { messages } = interview;
  return (
    <div
      className={clsx(
        "flex justify-center items-center",
        "w-screen h-screen",
        "from-violet-eggplant-500 bg-linear-to-tr to-violet-400"
      )}
    >
      <DeFrenteComResizable
        key={interview.id}
        interviews={interviews}
        interview={interview}
        messages={messages as MessageContentProps[]}
      />
    </div>
  );
}
