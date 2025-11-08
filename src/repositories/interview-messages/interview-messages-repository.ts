import { CreateInterviewMessageInput } from "@/models/interview-messages/create-interview-message-input";
import { InterviewMessageModel } from "@/models/interview-messages/interview-message-model";

export interface InterviewMessageRepository {
  findByInterviewId(interviewId: number): Promise<InterviewMessageModel[]>;
  create(data: CreateInterviewMessageInput): Promise<InterviewMessageModel>;
}


