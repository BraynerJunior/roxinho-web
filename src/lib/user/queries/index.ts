import { userRepository } from "@/repositories/users";
import { cache } from "react";

export const findUserById = cache(async (id: string) => {
  return userRepository.findById(id);
});

export const findAllUsers = cache(async () => {
  return userRepository.findAll();
});
