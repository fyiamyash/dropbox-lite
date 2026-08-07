import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler(
  handlerFunc: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler {
  return function wrappedFunction(req, res, next) {
    handlerFunc(req, res, next).catch(next);
  };
}
