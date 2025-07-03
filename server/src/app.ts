import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes"; // your tasks router
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

// Public auth routes
app.use("/api/auth", authRoutes);

// Protected task routes
app.use("/api/tasks", authMiddleware, taskRoutes);

export default app;
