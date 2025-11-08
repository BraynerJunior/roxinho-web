import { userRepository } from "@/repositories/users";
import { cache } from "react";

export const findUserById = cache(async (id: string) => {
  return userRepository.findById(id);
});

export const findAllUsers = cache(async () => {
  return userRepository.findAll();
});

export const giveAccess = cache(async (userId: string) => {
  return userRepository.giveAccess(userId);
});

export const removeAccess = cache(async () => {
  return userRepository.findAll();
});


