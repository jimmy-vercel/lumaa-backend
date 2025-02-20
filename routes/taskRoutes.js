const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { getTasks, createTask, retrieveTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.use(authenticate);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', retrieveTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;