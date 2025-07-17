import type { InsertTask } from "@/db/drizzle/schema/task/schema";

/**
 * DTO для создания задачи
 * @description Наследует все поля из InsertTask схемы базы данных
 */
export interface ICreateTaskDto extends InsertTask {}

/**
 * DTO для обновления задачи
 * Все поля, кроме uid, являются необязательными
 * @property {string} uid - Обязательный уникальный идентификатор задачи
 */
export interface IUpdateTaskDto extends Partial<Omit<InsertTask, "uid">>, Pick<InsertTask, "uid"> {}
