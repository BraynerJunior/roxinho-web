import { CreateInterviewInput } from "@/models/interview/dto/create-interview-input";
import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewSummary } from "@/models/interview/interview-summary-model";

export interface InterviewRepository {
  findById(id: string): Promise<InterviewModel>;
  findAllSummaries(): Promise<InterviewSummary[]>;
  findLatest(): Promise<InterviewSummary | null>;
  create(data: CreateInterviewInput): Promise<InterviewModel>;
}
