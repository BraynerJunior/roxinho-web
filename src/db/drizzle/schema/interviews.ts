import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { jobRolesTable } from "./job-roles";

export const interviewsTable = pgTable("interviews", {
  id: serial("id").primaryKey(),

  // Se o entrevistado tiver conta:
  userId: integer("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),

  // Se nao for cadastrado
  guestName: varchar("guest_name", { length: 255 }),
  guestEmail: varchar("guest_email", { length: 255 }),
  guestJobRoleId: integer("guest_job_role_id").references(
    () => jobRolesTable.id
  ),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InterviewTableSelectModel = InferSelectModel<
  typeof interviewsTable
>;
export type InterviewTableInsertModel = InferInsertModel<
  typeof interviewsTable
>;
