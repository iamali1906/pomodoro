import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../util/auth";

const prisma = new PrismaClient();

export const getSession = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  const sessions = await prisma.session.findMany({
    where: { userId },
  });

  res.json(sessions);
};

export const createSession = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  const { taskId, startTime } = req.body;
  const tasks = await prisma.session.create({
    data: { taskId, startTime, type: "task", userId },
  });
  res.json(tasks).status(201);
};

export const deleteSession = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = getUserIdFromToken(req);
  try {
    const deletedSession = await prisma.session.delete({
      where: {
        id,
        userId: userId,
      },
    });
    res.status(200).json(deletedSession);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userId = getUserIdFromToken(req);

  try {
    const { taskId, startTime, endTime, type, completed } = req.body;
    const updateSession = await prisma.session.update({
      where: {
        id,
        userId: userId,
      },
      data: {
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(type && { type }),
        ...(completed && { completed }),
        ...(taskId && { taskId }),
      },
    });

    console.log("Updated session:", updateSession);
    res.status(200).json(updateSession);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneSession = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  const id = parseInt(req.params.id, 10);

  const sessions = await prisma.session.findUnique({
    where: { userId, id },
  });

  res.json(sessions);
};
