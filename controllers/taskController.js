const { Task } = require('../models');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId },
      order: [['updatedAt', 'DESC']],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    const task = await Task.create({ title, description, isComplete, userId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const retrieveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTasks, createTask, retrieveTask, updateTask, deleteTask };