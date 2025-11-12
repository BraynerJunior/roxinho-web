import { InterviewSummary } from "./interview-summary-model";

export interface PaginatedInterviews {
  data: InterviewSummary[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}