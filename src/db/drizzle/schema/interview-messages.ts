import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { interviewsTable } from "./interviews";

export const interviewMessagesTable = pgTable("interview_messages", {
  id: serial("id").primaryKey(),
  interviewId: integer("interview_id")
    .references(() => interviewsTable.id, { onDelete: "cascade" })
    .notNull(),
  fromUser: boolean("from_user").notNull(),
  content: varchar("content", { length: 2000 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InterviewMessagesTableSelectModel = InferSelectModel<
  typeof interviewMessagesTable
>;
export type InterviewMessagesTableInsertModel = InferInsertModel<
  typeof interviewMessagesTable
>;
