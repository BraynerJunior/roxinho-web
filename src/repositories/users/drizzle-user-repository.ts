import { UserModel } from "@/models/user/user-model";
import { UserRepository } from "./user-repository";
import { drizzleDb } from "@/db/drizzle";
import { usersTable } from "@/db/drizzle/schema/users";
import { profilesTable } from "@/db/drizzle/schema/profiles";
import { jobRolesTable } from "@/db/drizzle/schema/job-roles";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
  async findAll(): Promise<UserModel[]> {
    const results = await drizzleDb
      .select({
        id: usersTable.id,
        name: profilesTable.name,
        role: jobRolesTable.name,
        birthdate: profilesTable.birthdate,
        avatarUrl: profilesTable.avatarUrl,
      })
      .from(usersTable)
      .innerJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .innerJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId));

    return results;
  }
  async findById(id: string): Promise<UserModel> {
    const results = await drizzleDb
      .select({
        id: usersTable.id,
        name: profilesTable.name,
        role: jobRolesTable.name,
        birthdate: profilesTable.birthdate,
        avatarUrl: profilesTable.avatarUrl,
      })
      .from(usersTable)
      .innerJoin(profilesTable, eq(profilesTable.userId, usersTable.id))
      .innerJoin(jobRolesTable, eq(jobRolesTable.id, profilesTable.jobRoleId))
      .where(eq(usersTable.id, Number(id)));

    const user = results[0];
    if (!user) throw new Error(`Usuário não encontrado`);

    return user;
  }
}
