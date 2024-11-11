import { Router } from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsControllers";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.use(authMiddleware);
router.get("/", getSettings);
router.put("/", updateSettings);

export default router;
