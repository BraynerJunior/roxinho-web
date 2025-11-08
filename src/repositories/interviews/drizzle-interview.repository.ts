import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewRepository } from "./interview-repository";
import { db } from "@/db/drizzle";
import {
  interviewsTable,
  jobRolesTable,
  profilesTable,
  usersTable,
} from "@/db/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { InterviewSummary } from "@/models/interview/interview-summary-model";
import { DrizzleInterviewMessageRepository } from "../interview-messages/drizzle-interview-messages";
import { CreateInterviewInput } from "@/models/interview/dto/create-interview-input";

export class DrizzleInterviewRepository implements InterviewRepository {
  private messagesRepo = new DrizzleInterviewMessageRepository();

  async findLatest(): Promise<InterviewSummary | null> {
    const [result] = await db
      .select({
        interviewId: interviewsTable.id,
        userId: usersTable.id,
        username: profilesTable.name,
        avatarUrl: profilesTable.avatarUrl,
        jobRole: jobRolesTable.name,
        createdAt: interviewsTable.createdAt,
      })
      .from(interviewsTable)
      .innerJoin(usersTable, eq(usersTable.id, interviewsTable.userId))
      .innerJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .innerJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .orderBy(desc(interviewsTable.createdAt))
      .limit(1);

    if (!result) return null;

    return {
      id: result.interviewId,
      userId: result.userId,
      username: result.username ?? "Usuário sem nome",
      avatarUrl: result.avatarUrl ?? undefined,
      jobRole: result.jobRole ?? "Sem cargo",
      createdAt: result.createdAt.toISOString(),
    };
  }

  async findAllSummaries(): Promise<InterviewSummary[]> {
    const results = await db
      .select({
        id: interviewsTable.id,
        userId: usersTable.id,
        username: profilesTable.name,
        avatarUrl: profilesTable.avatarUrl,
        jobRole: jobRolesTable.name,
        createdAt: interviewsTable.createdAt,
      })
      .from(interviewsTable)
      .innerJoin(usersTable, eq(usersTable.id, interviewsTable.userId))
      .innerJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .innerJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .orderBy(desc(interviewsTable.createdAt));

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      username: result.username ?? "Usuário sem nome",
      avatarUrl: result.avatarUrl ?? undefined,
      jobRole: result.jobRole ?? "Sem cargo",
      createdAt: result.createdAt.toISOString(),
    }));
  }

  async findById(id: string): Promise<InterviewModel> {
    const [interview] = await db
      .select({
        id: interviewsTable.id,
        createdAt: interviewsTable.createdAt,
        userId: interviewsTable.userId,
        userName: profilesTable.name,
        userAvatarUrl: profilesTable.avatarUrl,
        userJobRole: jobRolesTable.name,
      })
      .from(interviewsTable)
      .innerJoin(usersTable, eq(usersTable.id, interviewsTable.userId))
      .innerJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .innerJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .where(eq(interviewsTable.id, Number(id)));

    if (!interview) throw new Error("Entrevista não encotrada!");

    // Busca as mensagens separadamente
    const messages = await this.messagesRepo.findByInterviewId(interview.id);

    return {
      id: interview.id,
      createdAt: interview.createdAt.toISOString(),
      user: {
        id: interview.userId,
        name: interview.userName ?? "Usuário",
        avatarUrl: interview.userAvatarUrl,
        role: interview.userJobRole,
      },
      messages,
    };
  }

  async create(data: CreateInterviewInput): Promise<InterviewModel> {
    const { userId, guestName, guestEmail, guestJobRoleId } = data;

    // 🔹 Cria a entrevista no banco
    const [newInterview] = await db
      .insert(interviewsTable)
      .values({
        userId: userId ?? null,
        guestName: guestName ?? null,
        guestEmail: guestEmail ?? null,
        guestJobRoleId: guestJobRoleId ?? null,
      })
      .returning({
        id: interviewsTable.id,
        createdAt: interviewsTable.createdAt,
        userId: interviewsTable.userId,
        guestName: interviewsTable.guestName,
        guestJobRoleId: interviewsTable.guestJobRoleId,
      });

    // 🔹 Monta dados do usuário (se houver)
    let user: InterviewModel["user"];

    if (newInterview.userId) {
      // Usuário logado
      const [profile] = await db
        .select({
          name: profilesTable.name,
          avatarUrl: profilesTable.avatarUrl,
          jobRole: jobRolesTable.name,
        })
        .from(profilesTable)
        .leftJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
        .where(eq(profilesTable.userId, newInterview.userId));

      user = {
        id: newInterview.userId,
        name: profile?.name ?? "Usuário",
        avatarUrl: profile?.avatarUrl,
        role: profile?.jobRole ?? "Sem cargo",
      };
    } else {
      // Convidado
      user = {
        id: undefined as unknown as number, // compatibilidade com tipagem existente
        name: guestName ?? "Convidado",
        avatarUrl: undefined,
        role: guestJobRoleId ? `Cargo ID ${guestJobRoleId}` : "Sem cargo",
      };
    }

    // 🔹 Retorna o modelo completo da entrevista
    return {
      id: newInterview.id,
      createdAt: newInterview.createdAt.toISOString(),
      user,
      messages: [], // recém-criada, sem mensagens ainda
    };
  }
}
