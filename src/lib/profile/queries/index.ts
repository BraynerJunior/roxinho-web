import { profileRepository } from "@/repositories/profile";
import { UpdateProfileInput } from "@/repositories/profile/profile-repository";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const findProfileByUserId = cache((userId: number) => {
  return unstable_cache(
    async (userId: number) => {
      return profileRepository.findByUserId(userId);
    },
    [`profile-${userId}`],
    {
      tags: [`profile-${userId}`],
    }
  )(userId);
});

export const updateUserProfile = cache(
  async (userId: number, data: UpdateProfileInput) => {
    const updated = profileRepository.updateByUserId(userId, data);
    return updated;
  }
);
