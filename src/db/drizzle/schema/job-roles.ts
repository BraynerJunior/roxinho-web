import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const jobRolesTable = pgTable("job_roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type JobRolesTableSelectModel = InferSelectModel<typeof jobRolesTable>;
export type JobRolesTableInsertModel = InferInsertModel<typeof jobRolesTable>;