import { and, asc, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db/drizzle/connect";
import { tasks } from "@/db/drizzle/schema/task/schema";
import { CustomError } from "@/utils/custom_error";
import { HttpStatus } from "@/utils/enums/http-status";

import type { ICreateTaskDto, IUpdateTaskDto } from "./dto/create-task.dto";
import type { IGetTasksParams } from "./types";

/**
 * Получает список задач с возможностью фильтрации
 * @param params - Параметры фильтрации и сортировки задач
 * @returns Промис с массивом задач, соответствующих критериям фильтрации
 */
export const getTasks = async (params: IGetTasksParams) => {
  try {
    const conditions = [];

    if (params.priority) {
      conditions.push(eq(tasks.priority, params.priority));
    }
    if (params.category) {
      conditions.push(eq(tasks.category, params.category));
    }
    if (params.status) {
      conditions.push(eq(tasks.status, params.status));
    }

    if (params.search) {
      conditions.push(
        or(ilike(tasks.title, `%${params.search}%`), ilike(tasks.description, `%${params.search}%`))
      );
    }

    const query = db
      .select()
      .from(tasks)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(tasks[params.orderBy ?? "category"]));

    return await query;
  } catch (error) {
    throw error;
  }
};

/**
 * Получает задачу по её уникальному идентификатору
 * @param uid - Уникальный идентификатор задачи
 * @returns Промис с найденной задачей или undefined, если задача не найдена
 */
export const getTaskByUID = async (uid: string) => {
  try {
    const [task] = await db.select().from(tasks).where(eq(tasks.uid, uid));
    return task;
  } catch (error) {
    throw error;
  }
};

/**
 * Создаёт новую задачу
 * @param createTaskDto - DTO для создания задачи
 * @throws {CustomError} 409 - Если задача с таким uid уже существует
 */
export const createTask = async (createTaskDto: ICreateTaskDto) => {
  try {
    const tryTask = await db.select().from(tasks).where(eq(tasks.uid, createTaskDto.uid));
    if (tryTask.length > 0) {
      throw new CustomError(HttpStatus.CONFLICT);
    }

    const nowDate = new Date(Date.now()).toISOString();

    await db
      .insert(tasks)
      .values({ ...createTaskDto, createdDate: nowDate })
      .returning();
  } catch (error) {
    throw error;
  }
};

/**
 * Обновляет существующую задачу
 * @param dto - DTO для обновления задачи (должен содержать uid задачи)
 * @returns Промис с объектом, содержащим uid обновлённой задачи
 * @throws {CustomError} 400 - Если задача с указанным uid не найдена
 */
export const updateTask = async (dto: IUpdateTaskDto) => {
  try {
    const { uid, ...updateDto } = dto;
    const [task] = await db.select().from(tasks).where(eq(tasks.uid, uid));

    if (!task) {
      throw new CustomError(HttpStatus.BAD_REQUEST);
    }

    await db.update(tasks).set(updateDto).where(eq(tasks.uid, uid));
    return {
      uid
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Удаляет задачу по её уникальному идентификатору
 * @param uid - Уникальный идентификатор задачи для удаления
 */
export const deleteTask = async (uid: string) => {
  try {
    await db.delete(tasks).where(eq(tasks.uid, uid));
  } catch (error) {
    throw error;
  }
};
