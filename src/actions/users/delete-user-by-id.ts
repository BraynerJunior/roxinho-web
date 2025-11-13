"use server";

import { deleteUserById } from "@/lib/user/queries";
import { revalidateTag } from "next/cache";

export async function deleteUserByIdAction(id: number) {
  const result = await deleteUserById(id);

  if (!result.success) {
    return;
  }

  revalidateTag("users");
}
