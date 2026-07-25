import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asynHandler(
  hadlerFunc: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler {
  return function wrapperFunction(req, res, next) {
    hadlerFunc(req, res, next).catch(next);
  };
}
