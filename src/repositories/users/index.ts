import { JsonUserRepository } from "./json-user-repository";
import { UserRepository } from "./user-repository";

export const userRepository: UserRepository = new JsonUserRepository();
