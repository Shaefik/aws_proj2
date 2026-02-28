const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, async (req, res) => {
  try {
    const { title, completed } = req.body;

const task = new Task({
  title,
  completed,
  user: req.user._id  
});
    await task.save();
    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .populate("user", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", protect, async (req,res) =>{
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;