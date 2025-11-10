import { ProfileModel } from "@/models/profile/profile-model";

export type UpdateProfileInput = {
  name?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export interface ProfileRepository {
  findByUserId(userId: number): Promise<ProfileModel | null>;
  updateByUserId(userId: number, data: UpdateProfileInput): Promise<ProfileModel>;
}
