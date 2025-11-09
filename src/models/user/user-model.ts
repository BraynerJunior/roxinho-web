export type UserModel = {
  id: number | null;
  email: string | null;
  systemRole: string | null;
  name: string | null;
  role: string | null;
  birthdate?: string | null;
  avatarUrl?: string | null;
  createdAt?: Date | null;
  bio?: string | null;
};
