import { UserModel } from "@/models/user/user-model";
import { userRepository } from "@/repositories/users";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const findUserById = cache(async (id: number) => {
  return userRepository.findById(id);
});

export const findAllUsers = cache((page: number, perpage: number) => {
  return unstable_cache(
    async (
      page: number,
      perpage: number
    ): Promise<{
      data: UserModel[];
      totalItems: number;
      totalPages: number;
      currentPage: number;
    }> => {
      return userRepository.findAll(page, perpage);
    },
    ["users"],
    {
      tags: ["users"],
      revalidate: 43200,
    }
  )(page, perpage);
});

export const deleteUserById = cache((id: number) => {
  return userRepository.deleteUserById(id);
});

export const giveAccess = cache(async (userId: number) => {
  return userRepository.giveAccess(userId);
});

export const removeAccess = cache(
  async (userId: number): Promise<{ success: boolean }> => {
    return userRepository.removeAccess(userId);
  }
);
