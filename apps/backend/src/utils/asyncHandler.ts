import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler(
  handlerFunction: (req: Request, res: Response) => Promise<void>,
): RequestHandler {
  return function wrapperFunction(req, res, next) {
    handlerFunction(req, res).catch(next);
  };
}
