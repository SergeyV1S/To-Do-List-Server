import { Router } from "express";

import taskRouter from "./task/task.routes";

/**
 * Главный роутер приложения
 * @description Объединяет все маршруты модулей под соответствующими путями
 */
const router = Router();

/** Подключаем маршруты задач по пути /tasks  */
router.use("/tasks", taskRouter);

export default router;
