import { UserModel } from "@/models/user/user-model";
import { userRepository } from "@/repositories/users";
import { cache } from "react";

export const findUserById = cache(async (id: string) => {
  return userRepository.findById(id);
});

export const findAllUsers = cache(async (page: number, perpage: number): Promise<{
  data: UserModel[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}> => {
  return userRepository.findAll(page, perpage);
});

export const giveAccess = cache(async (userId: string) => {
  return userRepository.giveAccess(userId);
});

export const removeAccess = cache(async (userId: string) => {
  return userRepository.removeAccess(userId);
});


