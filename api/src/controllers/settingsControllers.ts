import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromToken } from "../util/auth";

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);

  const settings = await prisma.setting.findUnique({
    where: { userId },
  });

  res.json(settings);
};

export const updateSettings = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { shortBreakDuration, longBreakDuration, longBreakInterval } = req.body;

  try {
    const updatedSettings = await prisma.setting.upsert({
      where: { userId },
      update: { shortBreakDuration, longBreakDuration, longBreakInterval },
      create: {
        userId,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
      },
    });

    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
};
