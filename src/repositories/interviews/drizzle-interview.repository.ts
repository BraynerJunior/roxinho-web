import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewRepository } from "./interview-repository";
import { db } from "@/db/drizzle";
import {
  interviewMessagesTable,
  interviewsTable,
  jobRolesTable,
  profilesTable,
  usersTable,
} from "@/db/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { InterviewSummary } from "@/models/interview/interview-summary-model";

export class DrizzleInterviewRepository implements InterviewRepository {
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



  async findALlSummaries(): Promise<InterviewSummary[]> {
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
    const messages = await db
      .select({
        id: interviewMessagesTable.id,
        fromUser: interviewMessagesTable.fromUser,
        content: interviewMessagesTable.content,
        createdAt: interviewMessagesTable.createdAt,
      })
      .from(interviewMessagesTable)
      .where(eq(interviewMessagesTable.interviewId, Number(id)))
      .orderBy(interviewMessagesTable.createdAt);

    return {
      id: interview.id,
      createdAt: interview.createdAt.toISOString(),
      user: {
        id: interview.userId,
        name: interview.userName ?? "Usuário",
        avatarUrl: interview.userAvatarUrl,
        role: interview.userJobRole,
      },
      messages: messages.map((msg) => ({
        id: msg.id,
        fromUser: msg.fromUser,
        content: msg.content,
      })),
    };
  }
}
