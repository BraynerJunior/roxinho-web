import { UserModel } from "../user/user-model";

export type InterviewModel = {
  id: number;
  user?: Partial<UserModel>;
  createdAt: string;
  messages: {
    id: number;
    fromUser: boolean;
    content: string;
  }[];
};
