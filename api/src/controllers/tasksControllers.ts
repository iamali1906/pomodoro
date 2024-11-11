import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromToken } from "../util/auth";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  console.log("userid", userId);
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });

  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  const { title, workDuration, description } = req.body;

  const tasks = await prisma.task.create({
    data: { title, workDuration, description, userId },
  });
  console.log("tasks", tasks);

  res.json(tasks).status(201);
};

export const startTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = getUserIdFromToken(req);

  try {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (task) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
      const start = true;

      if (start) {
        const remainingTime =
          task.remainingTime === null
            ? task.workDuration * 60 // workDuration is in minutes, convert to seconds
            : task.remainingTime;

        const taskUpdate = await prisma.task.update({
          where: {
            id: taskId,
          },
          data: {
            startTime: currentTimestamp,
            active: true,
            remainingTime,
          },
        });

        return res.status(200).json(taskUpdate);
      }
    }
    return res
      .status(404)
      .json({ error: "Task not found or cannot be started" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const stopTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = getUserIdFromToken(req);

  try {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });

    if (task) {
      // If the task is already completed, do nothing
      if (task.completed) {
        return res
          .status(200)
          .json({ task, message: "Task is already completed" });
      }

      // If remaining time is 0, do nothing
      if (task.remainingTime === 0) {
        return res
          .status(200)
          .json({ task, message: "No remaining time to update" });
      }

      // Calculate the elapsed time
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
      const elapsedTime =
        currentTimestamp - (task.startTime || currentTimestamp);

      // Update remaining time
      const newRemainingTime = task.remainingTime - elapsedTime;

      // Ensure remaining time does not go below 0
      const updatedRemainingTime = Math.max(newRemainingTime, 0);

      // Update the task in the database
      const taskUpdate = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          startTime: null, // Clear the startTime since the task is stopped
          active: false,
          remainingTime: updatedRemainingTime,
        },
      });

      return res.status(200).json(taskUpdate);
    }

    return res
      .status(404)
      .json({ error: "Task not found or cannot be stopped" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const calculateRemainingTime = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = getUserIdFromToken(req);

  try {
    // Fetch the task from the database
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (task) {
      // If the task is already completed, remaining time is zero
      if (task.completed || !task.active) {
        return res.json(task).status(200);
      }

      // Calculate the elapsed time
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
      const startTime = task.startTime;
      const remainingTime = task.remainingTime;
      const elapsedTime = currentTimestamp - (startTime || currentTimestamp);

      // Calculate the updated remaining time
      const updatedRemainingTime = Math.max(remainingTime - elapsedTime, 0);
      console.log("updatedRemainingTime=>", updatedRemainingTime);
      console.log("remainingTime=>", remainingTime);
      console.log("elapsedTime=>", elapsedTime);

      const active = updatedRemainingTime > 0 ? true : false;
      // Update the task in the database
      const taskUpdate = await prisma.task.update({
        where: { id: taskId },
        data: {
          startTime: currentTimestamp,
          active,
          remainingTime: updatedRemainingTime,
        },
      });

      // Return the updated remaining time
      return res.json(taskUpdate).status(200);
    }

    return res.status(404).json({ error: "Task not found" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = getUserIdFromToken(req);
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    console.log("Deleted task:", deletedTask);
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const userId = getUserIdFromToken(req);

  try {
    const { title, description, status, workDuration } = req.body;
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(workDuration && { workDuration }),
      },
    });

    console.log("Updated task:", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const userId = getUserIdFromToken(req);

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    res.status(200).json(task);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
