import { CreateInterviewMessageInput } from "@/models/interview-messages/create-interview-message-input";
import { InterviewMessageModel } from "@/models/interview-messages/interview-message-model";

export interface InterviewMessageRepository {
  findByInterviewId(interviewId: number): Promise<InterviewMessageModel[]>;
  create(data: CreateInterviewMessageInput): Promise<InterviewMessageModel>;
  delete(id: number): Promise<void>;
  update(id: number, data: { fromUser: boolean; content: string }): Promise<void>;
}


