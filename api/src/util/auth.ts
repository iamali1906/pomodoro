import { Request } from "express";
import jwt from "jsonwebtoken";

export const getUserIdFromToken = (req: Request): number => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  return (decoded as any).userId;
};
