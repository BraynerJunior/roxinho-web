import { DrizzleInterviewMessageRepository } from "./drizzle-interview-messages";
import { InterviewMessageRepository } from "./interview-messages-repository";

export const interviewMessageRepository: InterviewMessageRepository =
  new DrizzleInterviewMessageRepository();
