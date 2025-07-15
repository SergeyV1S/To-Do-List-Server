import type { InsertTask } from "@/db/drizzle/schema/task/schema";

export interface ICreateTaskDto extends InsertTask {}

export interface IUpdateTaskDto extends Partial<Omit<InsertTask, "uid">>, Pick<InsertTask, "uid"> {}
