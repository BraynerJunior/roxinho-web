import { InterviewModel } from "@/models/interview/interview-model";
import { InterviewRepository } from "./interview-repository";
import { db } from "@/db/drizzle";
import {
  interviewsTable,
  jobRolesTable,
  profilesTable,
  usersTable,
} from "@/db/drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";
import { InterviewSummary } from "@/models/interview/interview-summary-model";
import { interviewMessageRepository } from "../interview-messages/index";
import { CreateInterviewInput } from "@/models/interview/dto/create-interview-input";
import { PaginatedInterviews } from "@/models/interview/paginated-interviews";

export class DrizzleInterviewRepository implements InterviewRepository {
  async findLatest(): Promise<InterviewSummary | null> {
    const [result] = await db
      .select({
        interviewId: interviewsTable.id,
        userId: usersTable.id,
        email: usersTable.email,
        username: profilesTable.name,
        avatarUrl: profilesTable.avatarUrl,
        jobRole: jobRolesTable.name,
        createdAt: interviewsTable.createdAt,
      })
      .from(interviewsTable)
      .leftJoin(usersTable, eq(usersTable.id, interviewsTable.userId))
      .leftJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .leftJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .orderBy(desc(interviewsTable.createdAt))
      .limit(1);

    if (!result) return null;

    return {
      id: result.interviewId,
      email: result.email ?? "",
      userId: result.userId,
      username: result.username ?? "Usuário sem nome",
      avatarUrl: result.avatarUrl ?? undefined,
      jobRole: result.jobRole ?? "Sem cargo",
      createdAt: result.createdAt.toISOString(),
    };
  }

  async findAllSummaries(
    page: number = 1,
    perPage: number = 10
  ): Promise<PaginatedInterviews> {
    const offset = (page - 1) * perPage;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(interviewsTable);

    const totalItems = Number(countResult.count);
    const totalPages = Math.ceil(totalItems / perPage);

    const results = await db
      .select({
        id: interviewsTable.id,
        userId: usersTable.id,
        email: usersTable.email,
        username: profilesTable.name,
        avatarUrl: profilesTable.avatarUrl,
        jobRole: jobRolesTable.name,
        createdAt: interviewsTable.createdAt,
      })
      .from(interviewsTable)
      .leftJoin(usersTable, eq(usersTable.id, interviewsTable.userId))
      .leftJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .leftJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .orderBy(desc(interviewsTable.createdAt))
      .limit(perPage)
      .offset(offset);

    const data = results.map((result) => ({
      id: result.id,
      email: result.email ?? "",
      userId: result.userId,
      username: result.username ?? "Usuário sem nome",
      avatarUrl: result.avatarUrl ?? undefined,
      jobRole: result.jobRole ?? "Sem cargo",
      createdAt: result.createdAt.toISOString(),
    }));

    console.log(
      `[DrizzleInterviewRepository] findAllSummaries -> totalItems: ${totalItems}, returned: ${data.length}`
    );

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findById(id: number): Promise<InterviewModel> {
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
      .leftJoin(usersTable, eq(usersTable.id, interviewsTable.userId))
      .leftJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .leftJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .where(eq(interviewsTable.id, Number(id)));

    if (!interview) throw new Error("Entrevista não encotrada!");

    console.log(
      "[DrizzleInterviewRepository] fetching messages for interview id:",
      interview.id
    );
    const messages = await interviewMessageRepository.findByInterviewId(
      interview.id
    );

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

  async update(
    id: number,
    data: Partial<{ userId: number | null }>
  ): Promise<void> {
    await db
      .update(interviewsTable)
      .set({
        userId: data.userId ?? null,
      })
      .where(eq(interviewsTable.id, id));
  }

  async create(data: CreateInterviewInput): Promise<InterviewModel> {
    const { userId, guestName, guestEmail, guestJobRoleId } = data;

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

    let user: InterviewModel["user"];

    if (newInterview.userId) {
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

      user = {
        id: undefined as unknown as number,
        name: guestName ?? "Convidado",
        avatarUrl: undefined,
        role: guestJobRoleId ? `Cargo ID ${guestJobRoleId}` : "Sem cargo",
      };
    }

    return {
      id: newInterview.id,
      createdAt: newInterview.createdAt.toISOString(),
      user,
      messages: [],
    };
  }
}
