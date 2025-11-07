/* eslint-disable @typescript-eslint/no-explicit-any */
// repositoryJson.ts

import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewRepository } from "./interview-repository";
import { InterviewSummary } from "@/models/interview/interview-summary-model";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

// 1. Importe o JSON diretamente!
// O bundler vai incluir esse arquivo no seu código de servidor.
import interviewsData from "@/db/seed/interviews.json";

export class JsonInterviewRepository implements InterviewRepository {
  findALlSummaries(): Promise<InterviewSummary[]> {
    throw new Error("Method not implemented.");
  }
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  // 2. Esta função agora apenas lê o JSON importado.
  // Note que ela não precisa mais ser 'async' (a menos do simulateWait)
  private async getParsedData(): Promise<InterviewModel[]> {
    // O 'interviewsData' já é o JSON parseado
    const parsedJson = interviewsData;

    let interviews: InterviewModel[] = [];
    if (Array.isArray(parsedJson)) {
      interviews = parsedJson as unknown as InterviewModel[];
    } else if (parsedJson && Array.isArray((parsedJson as any).interview)) {
      // Mantendo sua lógica original para o caso do JSON ter um formato aninhado
      interviews = (parsedJson as any).interview as InterviewModel[];
    }

    return interviews;
  }


  async findAll(): Promise<InterviewModel[]> {
    await this.simulateWait();

    // 4. Use a nova função
    const interview = await this.getParsedData();
    return interview;
  }

  async findById(id: string): Promise<InterviewModel> {
    await this.simulateWait();

    // 5. Use a nova função
    const interviews = await this.getParsedData();
    const interview = interviews.find((user) => user.id === Number(id));

    if (!interview) throw new Error("Entrevista não encontrada para ID");

    return interview;
  }
}
