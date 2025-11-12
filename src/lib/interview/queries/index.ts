import { interviewRepository } from "@/repositories/interviews";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const findInterviewById = cache((id: number) => {
  return unstable_cache(
    async (id: number) => {
      return interviewRepository.findById(id);
    },
    [`interview-${id}`],
    { tags: [`interview-${id}`] }
  )(id);
});

export const findAllSummariesInterviews = cache(
  async (page: number, perPage: number) => {
    const cacheKey = [`interviews-summary`, `page-${page}`, `perPage-${perPage}`];
    const cacheTags = [`interviews-page`];
    return unstable_cache(
      async () => {
        console.log("🔄 fetching fresh interviews data", { page, perPage });
        return interviewRepository.findAllSummaries(page, perPage);
      },
      cacheKey,
      {
        tags: cacheTags,
      }
    )();
  }
);

export const findLatestInterview = cache(
  unstable_cache(
    async () => {
      console.log("🔄 fetching latest interview");
      return interviewRepository.findLatest();
    },
    ["last-interview"],
    {
      tags: ["last-interview"],
    }
  )
);
