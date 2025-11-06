import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const interviewsTable = pgTable("interviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InterviewTableSelectModel = InferSelectModel<typeof interviewsTable>;
export type InterviewTableInsertModel = InferInsertModel<typeof interviewsTable>;