import type { TCategory, TPriority, TStatus } from "@/db/drizzle/schema/task/types";

/**
 * Поле, по которому производится сортировка задач
 */
export type TOrderBy = "category" | "date" | "priority" | "status";

/**
 * Параметры для фильтрации и сортировки списка задач
 * @property {TCategory} [category] - Фильтр по категории задачи
 * @property {TOrderBy} [orderBy] - Поле для сортировки (по умолчанию "category")
 * @property {TPriority} [priority] - Фильтр по приоритету задачи
 * @property {string} [search] - Поисковая строка для фильтрации по названию или описанию
 * @property {TStatus} [status] - Фильтр по статусу задачи
 */
export interface IGetTasksParams {
  category?: TCategory;
  orderBy?: TOrderBy;
  priority?: TPriority;
  search?: string;
  status?: TStatus;
}
