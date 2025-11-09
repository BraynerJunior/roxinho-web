import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  systemRole: varchar("system_role", { length: 50 }).notNull().default("not_allowed"), // 'admin' | 'user' | 'manager' | 'notAlowed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UsersTableSelectModel = InferSelectModel<typeof usersTable>;
export type UsersTableInsertModel = InferInsertModel<typeof usersTable>;
