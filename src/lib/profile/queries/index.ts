import { profileRepository } from "@/repositories/profile";
import { UpdateProfileInput } from "@/repositories/profile/profile-repository";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function findProfileByUserId(userId: number) {
  const cachedFn = unstable_cache(
    async (userId: number) => {
      return profileRepository.findByUserId(userId);
    },
    [`profile-${userId}`],
    { tags: [`profile-${userId}`] }
  );

  return cachedFn(userId);
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
