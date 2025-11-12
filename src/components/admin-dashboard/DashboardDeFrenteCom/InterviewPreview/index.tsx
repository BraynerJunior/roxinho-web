"use client";

import React from "react";
import { InterviewFormData } from "@/lib/validations/interview-schema";
import MessageBar from "@/components/defrentecomComponents/MessageBar";
import { UserModel } from "@/models/user/user-model";
import { formatDatetimeNoHour } from "@/utils/format-datetime";
import clsx from "clsx";

interface InterviewPreviewProps {
  formData: Partial<InterviewFormData>;
  user: UserModel | null;
  createdAt?: string | undefined;
}

export function InterviewPreview({ formData, user, createdAt }: InterviewPreviewProps) {
  const { messages = [] } = formData;

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-muted-foreground">
          Selecione um usuário para iniciar a pré-visualização.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[url(/images/background-mascote-2.png)] bg-cover overflow-y-auto scrollbar-hide rounded-lg">
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-12 mt-4 w-full">
          <h2
            className={clsx(
              "self-center",
              "p-2 rounded-md",
              "bg-violet-200/60 backdrop-blur-md w-fit",
              "border border-violet-200/20",
              "text-lg text-violet-eggplant-900 text-center"
            )}
          >
            Pré-visualização da Entrevista
          </h2>
          {createdAt && (
            <p className="text-center text-sm text-violet-800">Entrevista do dia {formatDatetimeNoHour(createdAt)}</p>
          )}
          {messages.map((message, index) => (
            <MessageBar
              key={index}
              profilePictureUrl={user.avatarUrl ?? undefined}
              name={user.name ?? "Entrevistado"}
              message={{ ...message, id: message.id ?? index }}
            />
          ))}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>Nenhuma mensagem adicionada ainda.</p>
              <p className="text-sm">
                Adicione mensagens no formulário para vê-las aqui.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
