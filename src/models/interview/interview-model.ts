import { UserModel } from "../user/user-model";

export type InterviewModel = {
  id: string;
  user: UserModel;
  createdAt: string;
  messages: {
    id: string;
    fromUser: boolean;
    content: string;
  }[];
};
