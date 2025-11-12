export type UserModel = {
  id: number | null;
  name?: string | null;
  email: string | null;
  systemRole: string | null;
  role: string | null;
  createdAt?: Date | null;
  avatarUrl?: string | null;
};
