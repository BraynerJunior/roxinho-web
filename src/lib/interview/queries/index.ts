import { interviewRepository } from "@/repositories/interviews";
import { cache } from "react";

export const findInterviewById = cache(async (id: string) => {
  return interviewRepository.findById(id);
});

export const findAllInterviews = cache(async () => {
  return interviewRepository.findAll();
});

export const findALlSummariesInterviews = cache(async () => {
  return interviewRepository.findALlSummaries();
})