import { UserModel } from "@/models/user/user-model";

export interface UserRepository {
    findAll(): Promise<UserModel[]>;
    findById(id: string): Promise<UserModel>;
}