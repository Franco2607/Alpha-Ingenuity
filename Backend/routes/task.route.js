import express from "express";
import Task from "../models/task.model.js";

const router = express.Router();

// llamar a todas las tareas
router.get("/", async (req, res) => {
  try {
    const todos = await Task.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// añadir una nueva tarea
router.post("/", async (req, res) => {
  const task = new Task({
    text: req.body.text,
    description: req.body.description || "",
  });
  try {
    const newTodo = await task.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una tarea
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.body.text !== undefined) {
      task.text = req.body.text;
    }
    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }
    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTodo = await task.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// borrar una tarea
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
