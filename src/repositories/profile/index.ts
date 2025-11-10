import { DrizzleProfileRepository } from "./drizzle-profile-repository";
import { ProfileRepository } from "./profile-repository";

export const profileRepository: ProfileRepository =
  new DrizzleProfileRepository();
