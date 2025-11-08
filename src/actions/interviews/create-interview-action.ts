"use server";

import { revalidateTag } from "next/cache";
import { interviewRepository } from "@/repositories/interviews";
import { interviewMessageRepository } from "@/repositories/interview-messages";

export async function createInterviewAction(formData: FormData) {
  const userId = formData.get("userId") as string | null;
  const guestName = formData.get("guestName") as string | null;
  const guestEmail = formData.get("guestEmail") as string | null;
  const guestJobRoleId = formData.get("guestJobRoleId") as string | null;
  const initialMessage = formData.get("initialMessage") as string | null;

  // Cria a entrevista
  const interview = await interviewRepository.create({
    userId: userId ? Number(userId) : undefined,
    guestName: guestName || undefined,
    guestEmail: guestEmail || undefined,
    guestJobRoleId: guestJobRoleId ? Number(guestJobRoleId) : undefined,
  });

  // Se houver mensagem inicial, cria
  if (initialMessage && initialMessage.trim() !== "") {
    await interviewMessageRepository.create({
      interviewId: interview.id,
      fromUser: true, // ou false, dependendo da lógica
      content: initialMessage,
    });
  }

  // Revalida as tags que listam entrevistas
  revalidateTag("interviews");
  revalidateTag("last-interview");

  return interview;
}
