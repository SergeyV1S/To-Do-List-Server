import type { NextFunction, Request, Response } from "express";
import type http from "node:http";

import cors from "cors";
import express from "express";
import morgan from "morgan";

import config from "./config";
import { logger, LoggerStream } from "./lib/loger";
import { sendResponse } from "./lib/reponse";
import router from "./modules/main.router";
import { CustomError } from "./utils/custom_error";
import { HttpStatus } from "./utils/enums/http-status";

export const app = express();
const port = config.app.port;

export const DI = {} as {
  server: http.Server;
};

export const init = (async () => {
  app.use(cors(config.cors));
  app.use(express.json());
  app.use(morgan("dev", { stream: new LoggerStream() }));

  app.use("/api", router);

  app.disable("x-powered-by");
  app.disable("etag");
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "deny");
    res.setHeader("Content-Security-Policy", "default-src 'none'");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    res.setHeader("Feature-Policy", "geolocation 'none'; microphone 'none'; camera 'none'");

    res.removeHeader("Server");
    next();
  });

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new CustomError(404, `endpoint ${_req.path} not found`));
  });

  app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error.";
    logger.error(message);
    _next();
    sendResponse(res, statusCode, message);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    next();
    sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong...");
  });

  DI.server = app.listen(port, () => logger.info(`listening in port:${port}`));
})();
