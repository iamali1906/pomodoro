import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes";
import settingsRoutes from "./src/routes/settingsRoutes";
import sessionRoutes from "./src/routes/sessionRoutes";
import tasksRoutes from "./src/routes/tasksRoutes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use("/user", userRoutes);
app.use("/settings", settingsRoutes);
app.use("/sessions", sessionRoutes);
app.use("/tasks", tasksRoutes);
app.use("/*", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
