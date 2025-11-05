import { DrizzleInterviewRepository } from "./drizzle-interview.repository";
import { InterviewRepository } from "./interview-repository";

export const interviewRepository: InterviewRepository =
  new DrizzleInterviewRepository();
