import type { TCategory, TPriority, TStatus } from "@/db/drizzle/schema/task/types";

export type TOrderBy = "category" | "date" | "priority" | "status";

export interface IGetTasksParams {
  category?: TCategory;
  orderBy?: TOrderBy;
  priority?: TPriority;
  search?: string;
  status?: TStatus;
}
