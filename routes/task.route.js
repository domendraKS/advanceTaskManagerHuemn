import express from "express";
import { verifyManagerOrAdmin, verifyUser } from "../middleware/verifyUser.js";
import {
  createTask,
  deleteTask,
  getAllOrganizationTask,
  getAllUserTask,
  getOneTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/task.controlle.js";

const taskRoute = express.Router();

taskRoute.post("/create", verifyUser, createTask);
taskRoute.put("/update/:taskId", verifyUser, verifyManagerOrAdmin, updateTask);
taskRoute.patch("/update/:taskId", verifyUser, updateTaskStatus);
taskRoute.get(
  "/getAllOrganizationTask",
  verifyUser,
  verifyManagerOrAdmin,
  getAllOrganizationTask
);
taskRoute.get("/getAllUserTask", verifyUser, getAllUserTask);
taskRoute.get("/getOne/:taskId", verifyUser, getOneTask);
taskRoute.delete(
  "/delete/:taskId",
  verifyUser,
  verifyManagerOrAdmin,
  deleteTask
);

export default taskRoute;
