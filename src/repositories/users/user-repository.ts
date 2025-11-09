import type { RegisterSchema } from "@/lib/validations/auth-schemas";
import { UserModel } from "@/models/user/user-model";

export type RegisterInput = Omit<RegisterSchema, "confirmPassword">;
export interface UserRepository {
  findAll(page?: number, perPage?:number ): Promise<{
    data: UserModel[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>
  findById(id: string): Promise<UserModel>;
  removeAccess(userId: string): Promise<{ success: boolean }>;
  giveAccess(userId: string): Promise<{ success: boolean }>;
  create(
    data: RegisterInput
  ): Promise<
    | { success: true; user: { id: number; email: string } }
    | { success: false; message: string }
  >;
}
