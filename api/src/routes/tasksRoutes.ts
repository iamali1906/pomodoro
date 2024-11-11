import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  startTask,
  getTaskById,
  stopTask,
  calculateRemainingTime,
} from "../controllers/tasksControllers";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.use(authMiddleware);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/start-task/:id", startTask);
router.put("/stop-task/:id", stopTask);
router.get("/calculate/:id", calculateRemainingTime);

router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);
router.get("/:id", getTaskById);

export default router;
