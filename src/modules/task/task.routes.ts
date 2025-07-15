import { Router } from "express";

import { createTask, deleteTask, getTaskByUid, getTasks, updateTask } from "./task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/:uid", getTaskByUid);

router.post("/create", createTask);
router.patch("/update", updateTask);

router.delete("/:uid", deleteTask);

export default router;
