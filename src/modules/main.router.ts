import { Router } from "express";

import taskRouter from "./task/task.routes";

const router = Router();

router.use("/task", taskRouter);

export default router;
