import { Router, type Request, type Response } from "express";

export const dropBoxRouter = Router();

dropBoxRouter.post("/file", (req: Request, res: Response) => {
  res.send("file upload route!");
});

dropBoxRouter.get("/file/:fileID", (req: Request, res: Response) => {
  res.send("download file");
});
