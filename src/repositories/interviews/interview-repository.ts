import { CreateInterviewInput } from "@/models/interview/dto/create-interview-input";
import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewSummary } from "@/models/interview/interview-summary-model";
import { PaginatedInterviews } from "@/models/interview/paginated-interviews";

export interface InterviewRepository {
  findById(id: number): Promise<InterviewModel>;
  findAllSummaries(page: number, perPage: number): Promise<PaginatedInterviews>;
  findLatest(): Promise<InterviewSummary | null>;
  create(data: CreateInterviewInput): Promise<InterviewModel>;
  update(id: number, data: Partial<{ userId: number | null }>): Promise<void>;
}
