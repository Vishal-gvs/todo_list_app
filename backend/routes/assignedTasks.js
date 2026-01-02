const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Check if auth export is default or named. Based on reading file, it exports function directly and isAdmin as property.
const assignedTaskController = require('../controllers/assignedTaskController');

// Middleware: auth is the default export
router.use(auth);

router.get('/', assignedTaskController.getAssignedTasks);
router.patch('/:id/status', assignedTaskController.updateTaskStatus);

module.exports = router;
