import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDailyTasks = async (req: Request, res: Response) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const tasks = await Task.find({
      user: req.user._id,
      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getWeeklyTasks = async (req: Request, res: Response) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const tasks = await Task.find({
      user: req.user._id,
      dueDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCalendarTasks = async (req: Request, res: Response) => {
  try {
    const month = parseInt(req.params.month);
    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const tasks = await Task.find({
      user: req.user._id,
      dueDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}