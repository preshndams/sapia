import { NextFunction, Request, Response } from "express";
import * as service from './service'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await service.register(req.body));
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await service.login(req.body));
  } catch (err) {
    next(err);
  }
};
// 