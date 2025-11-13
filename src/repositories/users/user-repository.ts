import type { RegisterSchema } from "@/lib/validations/auth-schemas";
import { UserModel } from "@/models/user/user-model";

export type RegisterInput = Omit<RegisterSchema, "confirmPassword">;
export interface UserRepository {
  findAll(
    page?: number,
    perPage?: number
  ): Promise<{
    data: UserModel[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;
  findById(id: number): Promise<UserModel | null>;
  removeAccess(userId: number): Promise<{ success: boolean }>;
  giveAccess(userId: number): Promise<{ success: boolean }>;
  create(
    data: RegisterInput
  ): Promise<
    | { success: true; user: { id: number; email: string } }
    | { success: false; message: string }
  >;
  findByName(
    name: string,
    page: number,
    perPage: number
  ): Promise<{
    data: UserModel[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;
  deleteUserById(id: number): Promise<{ success: boolean }>;
}
