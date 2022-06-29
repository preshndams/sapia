"use strict";
import { errorMessage } from "iyasunday";

import { Application, Request, Response, NextFunction } from "express";

import User from "../module/user";

export default (app: Application): void => {
  const version = "/v1";
  app.use(`${version}`, User);

  app.use((err, req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  });

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message: `Requested route ( ${req.get("HOST")}${
        req.originalUrl
      } ) not found`,
    });
  });
};
