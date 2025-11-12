export type InterviewModel = {
  id?: number;
  user: {
    id?: number | null;
    name: string | null;
    avatarUrl: string | null | undefined;
    role: string | null;
  };
  createdAt: string;
  messages: {
    id: number;
    fromUser: boolean;
    content: string;
  }[];
};
