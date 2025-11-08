"use server";

import { revalidateTag } from "next/cache";
import { interviewMessageRepository } from "@/repositories/interview-messages";

export async function addMessageToInterviewAction(formData: FormData) {
  const interviewId = formData.get("interviewId") as string;
  const content = formData.get("content") as string;
  const fromUser = formData.get("fromUser") === "true";

  if (!interviewId || !content) {
    throw new Error("Campos obrigatórios não informados.");
  }

  const message = await interviewMessageRepository.create({
    interviewId: Number(interviewId),
    content,
    fromUser,
  });

  revalidateTag(`interview-${interviewId}-messages`);
  revalidateTag(`interview-${interviewId}`);

  return message;
}
