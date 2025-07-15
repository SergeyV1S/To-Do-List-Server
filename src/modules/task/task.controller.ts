import type { NextFunction, Request, Response } from "express";

import { sendResponse } from "@/lib/reponse";
import { HttpStatus } from "@/utils/enums/http-status";

import type { ICreateTaskDto, IUpdateTaskDto } from "./dto/create-task.dto";
import type { IGetTasksParams } from "./types";

import * as taskService from "./task.service";

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
