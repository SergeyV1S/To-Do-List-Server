import type { NextFunction, Request, Response } from "express";

import { sendResponse } from "@/lib/reponse";
import { HttpStatus } from "@/utils/enums/http-status";

import type { ICreateTaskDto, IUpdateTaskDto } from "./dto/create-task.dto";
import type { IGetTasksParams } from "./types";

import * as taskService from "./task.service";

/**
 * Получает список задач с возможностью фильтрации
 * @param req - Запрос с query-параметрами для фильтрации
 * @param res - Ответ сервера
 * @param next - Функция для передачи ошибок в обработчик ошибок
 */
export async function getTasks(
  req: Request<object, object, object, IGetTasksParams>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await taskService.getTasks(req.query);
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}

/**
 * Получает задачу по её уникальному идентификатору
 * @param req - Запрос с параметром uid в URL
 * @param res - Ответ сервера
 * @param next - Функция для передачи ошибок в обработчик ошибок
 */
export async function getTaskByUid(
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await taskService.getTaskByUID(req.params.uid);
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}

/**
 * Создаёт новую задачу
 * @param req - Запрос с телом, содержащим данные для создания задачи
 * @param res - Ответ сервера
 * @param next - Функция для передачи ошибок в обработчик ошибок
 */
export async function createTask(
  req: Request<object, object, ICreateTaskDto>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await taskService.createTask(req.body);
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}

/**
 * Обновляет существующую задачу
 * @param req - Запрос с телом, содержащим данные для обновления задачи
 * @param res - Ответ сервера
 * @param next - Функция для передачи ошибок в обработчик ошибок
 */
export async function updateTask(
  req: Request<object, object, IUpdateTaskDto>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await taskService.updateTask(req.body);
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}

/**
 * Удаляет задачу по её уникальному идентификатору
 * @param req - Запрос с параметром uid в URL
 * @param res - Ответ сервера
 * @param next - Функция для передачи ошибок в обработчик ошибок
 */
export async function deleteTask(
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await taskService.deleteTask(req.params.uid);
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}
