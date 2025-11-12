"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { interviewFormSchema } from "@/lib/validations/interview-schema";
import { interviewRepository } from "@/repositories/interviews";
import { interviewMessageRepository } from "@/repositories/interview-messages";
import { auth } from "@/lib/auth";

export async function createInterview(formData: unknown) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return {
      success: false,
      message: "Você não tem permissão para realizar esta ação.",
    };
  }

  try {
    const data = interviewFormSchema.parse(formData);

    const interview = await interviewRepository.create({
      userId: data.userId!,
    });

    for (const msg of data.messages) {
      await interviewMessageRepository.create({
        interviewId: interview.id!,
        fromUser: msg.fromUser,
        content: msg.content,
      });
    }
    // Revalidate interview-specific cache and listing caches so new interview appears in lists
    console.log("[createInterview] created interview id:", interview.id);
    revalidateTag("interviews-page");
    revalidateTag("last-interview");
    // Also revalidate the public and admin dashboard interview pages (use URL paths, not grouped folder names)
    revalidatePath("/defrentecom");
    revalidatePath("/dashboard/defrentecom");
    // fallback admin path variant (some setups use /admin/...)
    revalidatePath("/admin/dashboard/defrentecom");
    return { success: true, interviewId: interview.id };
  } catch (error) {
    console.error("Erro ao criar entrevista:", error);
    return { success: false, message: "Falha ao criar entrevista." };
  }
}

export async function updateInterview(id: number, formData: unknown) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return {
      success: false,
      message: "Você não tem permissão para realizar esta ação.",
    };
  }

  try {
    const data = interviewFormSchema.parse(formData);

    await interviewRepository.update(id, { userId: data.userId });

    const existingMessages = await interviewMessageRepository.findByInterviewId(
      id
    );
    const existingMessageIds = existingMessages.map((msg) => msg.id);

    const incomingMessages = data.messages || [];
    const incomingMessageIds = incomingMessages
      .map((msg) => msg.id)
      .filter(Boolean);

    const messagesToCreate = incomingMessages.filter((msg) => !msg.id);
    const messagesToUpdate = incomingMessages.filter((msg) =>
      existingMessageIds.includes(msg.id!)
    );
    const messagesToDelete = existingMessageIds.filter(
      (msgId) => !incomingMessageIds.includes(msgId)
    );

    for (const msg of messagesToCreate) {
      await interviewMessageRepository.create({
        interviewId: id,
        fromUser: msg.fromUser,
        content: msg.content,
      });
    }

    for (const msg of messagesToUpdate) {
      await interviewMessageRepository.update(msg.id!, {
        fromUser: msg.fromUser,
        content: msg.content,
      });
    }

    for (const msgId of messagesToDelete) {
      await interviewMessageRepository.delete(msgId);
    }

    // Revalidate interview-specific cache and listing caches so updates appear in lists
    console.log("[updateInterview] updated interview id:", id);
    revalidateTag(`interview-${id}`);
    revalidateTag("interviews-page");
    // Also revalidate the public and admin dashboard interview pages (use URL paths, not grouped folder names)
    revalidatePath("/defrentecom");
    revalidatePath("/dashboard/defrentecom");
    // fallback admin path variant (some setups use /admin/...)
    revalidatePath("/admin/dashboard/defrentecom");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar entrevista:", error);
    return { success: false, message: "Falha ao atualizar entrevista." };
  }
}
