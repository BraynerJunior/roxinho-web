import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewRepository, InterviewSummary } from "./interview-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

const ROOT_DIR = process.cwd();
const JSON_USERS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "interviews.json"
);

export class JsonInterviewRepository implements InterviewRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk(): Promise<InterviewModel[]> {
    const jsonContent = await readFile(JSON_USERS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);

    let interviews: InterviewModel[] = [];
    if (Array.isArray(parsedJson)) {
      interviews = parsedJson as InterviewModel[];
    } else if (parsedJson && Array.isArray(parsedJson.interview)) {
      interviews = parsedJson.interview as InterviewModel[];
    }

    return interviews;
  }

  async findALlSummaries(): Promise<InterviewSummary[]> {
    await this.simulateWait();

    const interviews = await this.readFromDisk();

    const summaries = interviews.map((interview) => {
      const { messages, ...summary } = interview;
      return summary;
    });

    return summaries;
  }

  async findAll(): Promise<InterviewModel[]> {
    await this.simulateWait();

    const interview = await this.readFromDisk();
    return interview;
  }

  async findById(id: string): Promise<InterviewModel> {
    await this.simulateWait();

    const interviews = await this.readFromDisk();
    const interview = interviews.find((user) => user.id === id);

    if (!interview) throw new Error("Entrevista não encontrada para ID");

    return interview;
  }
}
