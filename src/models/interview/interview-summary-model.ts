export type InterviewSummary = {
  id: number;
  userId?: number | null;
  username: string;
  email: string;
  jobRole: string | null;
  avatarUrl?: string | undefined;
  createdAt: string;
};
