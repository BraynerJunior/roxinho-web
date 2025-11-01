import { InterviewRepository } from "./interview-repository";
import { JsonInterviewRepository } from "./json-interview-repository";

export const interviewRepository: InterviewRepository = new JsonInterviewRepository();
