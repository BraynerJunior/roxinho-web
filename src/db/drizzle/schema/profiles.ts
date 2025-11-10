import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  date,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { jobRolesTable } from "./job-roles";

export const profilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  jobRoleId: integer("job_role_id")
    .references(() => jobRolesTable.id),
  name: varchar("name", { length: 255 }),
  bio: varchar("bio", { length: 1000 }),
  birthdate: date("birthdate"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ProfilesTableTableSelectModel = InferSelectModel<
  typeof profilesTable
>;
export type ProfilesTableInsertModel = InferInsertModel<typeof profilesTable>;
