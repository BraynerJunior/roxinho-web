import { DrizzleUserRepository } from "./drizzle-user-repository";
import { UserRepository } from "./user-repository";

export const userRepository: UserRepository = new DrizzleUserRepository();
