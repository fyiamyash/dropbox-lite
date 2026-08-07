import type { Request, Response } from "express";

export async function syncFileController(req: Request, res: Response) {
  res.send("flow is good till now ");
}
