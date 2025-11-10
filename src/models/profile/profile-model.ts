export type ProfileModel = {
  userId: number;
  jobRoleId: number | null;
  name: string | null;
  bio: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
