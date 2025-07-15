import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

import type { TCategory, TPriority, TStatus } from "./types";

export const tasks = pgTable("tasks", {
  uid: uuid("uid").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority").$type<TPriority>().notNull(),
  category: text("category").$type<TCategory>().notNull(),
  status: text("status").$type<TStatus>().notNull(),
  createdDate: date("createdDate")
});

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;
