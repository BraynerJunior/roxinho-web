import { profileRepository } from "@/repositories/profile";
import { UpdateProfileInput } from "@/repositories/profile/profile-repository";
import { revalidatePath, revalidateTag } from "next/cache";

export async function findProfileByUserId(userId: number) {
      return profileRepository.findByUserId(userId);
}

export async function updateUserProfile(
  userId: number,
  data: UpdateProfileInput
) {
  const updated = await profileRepository.updateByUserId(userId, data);

  revalidateTag(`profile-${userId}`);
  revalidatePath("/(private)/(admin)/dashboard/perfis");

  return updated;
}
