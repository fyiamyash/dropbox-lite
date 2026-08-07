import { prisma } from "@repo/db";
import { safeUserBody } from "@repo/zodTypes";
import type { Request, Response } from "express";

export async function signInFunction(
  req: Request,
  res: Response,
): Promise<void> {
  const parsedUserbody = safeUserBody.safeParse(req.body);
  if (!parsedUserbody.success) {
    res.status(400).json({ message: "ERROR", err: parsedUserbody.error });
    return;
  }
  const { username, password } = parsedUserbody.data;
  const id = crypto.randomUUID();
  const userSaved = await prisma.user.create({
    data: {
      userId: id,
      username: username,
      password: password,
    },
  });
  console.log(userSaved);
  res.send({
    message: "User signed up successfully",
    username: userSaved.username,
  });
}

export async function logInFunction(
  req: Request,
  res: Response,
): Promise<void> {
  const parsedUserbody = safeUserBody.safeParse(req.body);

  if (!parsedUserbody.success) {
    res.status(400).json({ message: "ERROR", err: parsedUserbody.error });
    return;
  }
  const { username, password } = parsedUserbody.data;
  const userExist = await prisma.user.findFirst({
    where: {
      username: username,
      password: password,
    },
  });
  if (!userExist) {
    res.status(400).json({ message: "invalid password/usenrame" });
    return;
  }
  res.send({ message: "User logged In" });
}
