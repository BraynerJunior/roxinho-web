import { interviewRepository } from "@/repositories/interviews";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const findInterviewById = cache((id: string) => {
  return unstable_cache(
    async (id: string) => {
      return interviewRepository.findById(id);
    },
    [`interview-${id}`],
    { tags: [`interview-${id}`] }
  )(id);
});

export const findALlSummariesInterviews = cache(
  unstable_cache(
    async () => {
      return interviewRepository.findALlSummaries();
    },
    ["interviews"],
    {
      tags: ["interviews"],
      revalidate: 43200,
    }
  )
);

export const findLatestInterview = cache(
  unstable_cache(
    async () => {
      return interviewRepository.findLatest();
    },
    ["last-interview"],
    {
      tags: ["last-interview"],
      revalidate: 86400,
    }
  )
);
