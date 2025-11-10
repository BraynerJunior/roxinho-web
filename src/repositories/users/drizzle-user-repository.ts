import { UserModel } from "@/models/user/user-model";
import { RegisterInput, UserRepository } from "./user-repository";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/drizzle/schema/users";
import { profilesTable } from "@/db/drizzle/schema/profiles";
import { jobRolesTable } from "@/db/drizzle/schema/job-roles";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export class DrizzleUserRepository implements UserRepository {
  async findAll(
    page: number = 1,
    perPage: number = 10
  ): Promise<{
    data: UserModel[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const offset = (page - 1) * perPage;

    // Conta o total de usuários
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(usersTable);

    const totalItems = Number(countResult.count);
    const totalPages = Math.ceil(totalItems / perPage);

    // Busca os dados paginados
    const data = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        systemRole: usersTable.systemRole,
        name: profilesTable.name,
        role: jobRolesTable.name,
        birthdate: profilesTable.birthdate,
        avatarUrl: profilesTable.avatarUrl,
      })
      .from(usersTable)
      .leftJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .leftJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .limit(perPage)
      .offset(offset);

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async giveAccess(userId: number): Promise<{ success: boolean }> {
    const user = await this.findById(userId);

    let success = false;

    if (!user) throw new Error(`Usuário não encontrado`);

    const userNotAllowed = user.systemRole === "not_allowed";

    if (userNotAllowed) {
      await db
        .update(usersTable)
        .set({ systemRole: "user" })
        .where(eq(usersTable.id, userId));

      success = true;
    }
    return { success };
  }

  async removeAccess(userId: number): Promise<{ success: boolean }> {
    const user = await this.findById(userId);

    let success = false;

    if (!user) throw new Error(`Usuário não encontrado`);

    const userAllowed = user.systemRole !== "not_allowed";
    if (userAllowed) {
      await db
        .update(usersTable)
        .set({ systemRole: "not_allowed" })
        .where(eq(usersTable.id, userId));

      success = true;
    }
    return { success };
  }

  async findById(id: number): Promise<UserModel | null> {
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        systemRole: usersTable.systemRole,
        role: jobRolesTable.name,
        birthdate: profilesTable.birthdate,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .leftJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!user) throw new Error(`Usuário não encontrado`);

    return user ?? null;
  }

  async create(
    data: RegisterInput
  ): Promise<
    | { success: true; user: { id: number; email: string } }
    | { success: false; message: string }
  > {
    try {
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, data.email));

      if (existingUser.length > 0) {
        return { success: false, message: "E-mail já cadastrado" };
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const [user] = await db
        .insert(usersTable)
        .values({
          email: data.email,
          passwordHash: hashedPassword,
        })
        .returning({ id: usersTable.id, email: usersTable.email });

      await db.insert(profilesTable).values({
        userId: user.id,
      });

      return { success: true, user };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "23505") {
        return { success: false, message: "E-mail já cadastrado" };
      }

      console.error("Erro inesperado ao criar usuário: ", error);

      return { success: false, message: "Erro interno ao criar usuário" };
    }
  }
}
