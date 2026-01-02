const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// All routes require auth and admin role
router.use(auth, isAdmin);

// Admin Tasks
router.post('/tasks', adminController.createAdminTask);
router.get('/tasks', adminController.getAdminTasks);
router.put('/tasks/:id', adminController.updateAdminTask);
router.delete('/tasks/:id', adminController.deleteAdminTask);

// Task Sets
router.post('/task-sets', adminController.createTaskSet);
router.get('/task-sets', adminController.getTaskSets);
router.put('/task-sets/:id', adminController.updateTaskSet);

// Groups
router.post('/groups', adminController.createGroup);
router.get('/groups', adminController.getGroups);
router.post('/groups/:groupId/members', adminController.addMemberToGroup);
router.delete('/groups/:groupId/members/:userId', adminController.removeMemberFromGroup);

// Assignments
router.post('/assignments', adminController.assignToGroup);

module.exports = router;
