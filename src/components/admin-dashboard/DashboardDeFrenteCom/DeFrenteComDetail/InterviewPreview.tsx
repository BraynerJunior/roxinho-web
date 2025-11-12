"use client";

import MessageBar from "@/components/defrentecomComponents/MessageBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InterviewFormData } from "@/lib/validations/interview-schema";
import { formatDatetimeNoHour } from "@/utils/format-datetime";
import clsx from "clsx";
import { InterviewModel } from "@/models/interview/interview-model";

interface InterviewPreviewProps {
  formData: Partial<InterviewFormData> | null | undefined;
  user: InterviewModel["user"] | null;
  createdAt?: string | undefined;
}

export function InterviewPreview({ formData, user, createdAt }: InterviewPreviewProps) {
  const messages = formData?.messages ?? [];

  return (
    // Make the preview follow the viewport while staying inside its column
    // `sticky` keeps it visible while scrolling the page, `self-start` ensures it doesn't stretch,
    // and a calculated height lets the inner area scroll when content is long.
    <Card className="sticky top-36 self-start h-[calc(100vh-9rem)] overflow-y-auto">
      <CardHeader>
        <CardTitle>Pré-visualização</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-full min-h-[400px] items-start justify-start p-6 bg-[url(/images/background-mascote-2.png)] bg-cover overflow-y-auto scrollbar-hide rounded-md border">
          <div className="flex flex-col gap-12 mt-4 w-full px-6 py-2 mx-2">
            {createdAt && (
              <h2
                className={clsx(
                  "self-center",
                  "p-2 rounded-md",
                  "bg-violet-200/60 backdrop-blur-md w-fit",
                  "border border-violet-200/20",
                  "text-lg text-violet-eggplant-900 text-center"
                )}
              >
                Entrevista do dia {formatDatetimeNoHour(createdAt)}
              </h2>
            )}

            {messages.map((message, index) => (
              <MessageBar
                profilePictureUrl={
                  message.fromUser && user ? user.avatarUrl ?? undefined : "/images/mascote.png"
                }
                name={message.fromUser && user ? user.name ?? "Entrevistado" : "Roxinho"}
                message={{ ...message, id: index }}
                key={index}
              />
            ))}

            {messages.length === 0 && (
              <div className="text-center text-muted-foreground">
                <p>A pré-visualização da entrevista aparecerá aqui.</p>
                <p>Adicione mensagens no formulário ao lado.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
