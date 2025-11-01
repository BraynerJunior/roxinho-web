import { InterviewModel } from "@/models/interview/interview-model";

export interface InterviewRepository {
    findAll(): Promise<InterviewModel[]>;
    findById(id: string): Promise<InterviewModel>
}