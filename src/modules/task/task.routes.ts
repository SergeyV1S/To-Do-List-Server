import { Router } from "express";

import { createTask, deleteTask, getTaskByUid, getTasks, updateTask } from "./task.controller";

/**
 * Роутер для работы с задачами
 * @description Обрабатывает все HTTP-запросы, связанные с задачами
 */
const router = Router();

/** GET /tasks - получение списка задач (с возможностью фильтрации) */
router.get("/", getTasks);
/** GET /tasks/:uid - получение задачи по её уникальному идентификатору */
router.get("/:uid", getTaskByUid);

/** POST /tasks/create - создание новой задачи */
router.post("/create", createTask);
/** PATCH /tasks/update - обновление существующей задачи */
router.patch("/update", updateTask);

/** DELETE /tasks/:uid - удаление задачи по её уникальному идентификатору */
router.delete("/:uid", deleteTask);

export default router;
