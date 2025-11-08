import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewSummary } from "@/models/interview/interview-summary-model";

export interface InterviewRepository {
  findById(id: string): Promise<InterviewModel>;
  findALlSummaries(): Promise<InterviewSummary[]>;
  findLatest(): Promise<InterviewSummary | null>;
}
