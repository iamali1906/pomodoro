import { Router } from "express";
import { createSession, deleteSession, getOneSession, getSession, updateSession } from "../controllers/sessionsControllers";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.use(authMiddleware);
router.get("/", getSession);
router.post("/", createSession);
router.delete("/:id", deleteSession);
router.patch("/:id", updateSession);
router.get("/:id", getOneSession);


export default router;
