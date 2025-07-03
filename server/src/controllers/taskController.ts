import { AuthRequest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import Task from "../models/Tasks";

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Find the task by id AND userId to ensure user owns the task
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(204).send();
};
