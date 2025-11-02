import { InterviewModel } from "@/models/interview/interview-model";

export type InterviewSummary = Omit<InterviewModel, "messages">;
export interface InterviewRepository {
    findAll(): Promise<InterviewModel[]>;
    findById(id: string): Promise<InterviewModel>;
    findALlSummaries(): Promise<InterviewSummary[]>;
}