// src/actions/users/find-users-by-name.ts
"use server";

import { userRepository } from "@/repositories/users";

export async function findUsersByName(query: string, page = 1, perPage = 5) {
  if (!query.trim()) return { data: [], totalPages: 0, totalItems: 0 };

  return userRepository.findByName(query, page, perPage);
}
