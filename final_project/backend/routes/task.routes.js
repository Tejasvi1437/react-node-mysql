const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const { verifyToken } = require('../middleware/authJwt');

// Get all tasks for the user
router.get('/', verifyToken, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.userId } });
  res.json(tasks);
});

// Create a new task
router.post('/', verifyToken, async (req, res) => {
  const { text } = req.body;  // <- frontend sends { text: newTask }
  if (!text) return res.status(400).json({ message: 'Task text is required' });

  try {
    const task = await Task.create({
      title: text,      // map text to title
      description: '',  // keep description empty
      userId: req.userId
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task
router.put('/:id', verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.userId !== req.userId) return res.status(404).json({ message: 'Not found' });
  await task.update(req.body);
  res.json(task);
});

// Delete task
router.delete('/:id', verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.userId !== req.userId) return res.status(404).json({ message: 'Not found' });
  await task.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
