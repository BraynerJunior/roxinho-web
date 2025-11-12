"use server";

import { findInterviewById } from "@/lib/interview/queries";

export async function getFullInterviewDetails(id: number) {
  console.log("[getFullInterviewDetails] requested interview id:", id);
  const result = await findInterviewById(id);
  console.log("[getFullInterviewDetails] result messages length:", result?.messages?.length ?? 0);
  return result;
}
