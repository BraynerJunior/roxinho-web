import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewRepository } from "./interview-repository";
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

    // support two shapes:
    // 1) root is an array: [ { ... }, ... ]
    // 2) root is an object: { interview: [ { ... }, ... ] }
    let interviews: InterviewModel[] = [];
    if (Array.isArray(parsedJson)) {
      interviews = parsedJson as InterviewModel[];
    } else if (parsedJson && Array.isArray(parsedJson.interview)) {
      interviews = parsedJson.interview as InterviewModel[];
    }

    return interviews;
  }

  async findAll(): Promise<InterviewModel[]> {
    await this.simulateWait();

    const interview = await this.readFromDisk();
    return interview;
  }

  async findById(id: string): Promise<InterviewModel> {
    const interviews = await this.findAll();
    const interview = interviews.find((user) => user.id === id);

    if (!interview) throw new Error("Entrevistada não encontrada para ID");

    return interview;
  }
}
