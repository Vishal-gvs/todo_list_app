const AdminTask = require('../models/AdminTask');
const TaskSet = require('../models/TaskSet');
const Group = require('../models/Group');
const UserTaskStatus = require('../models/UserTaskStatus');
const User = require('../models/User');

// --- Admin Tasks ---

exports.createAdminTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const task = new AdminTask({
            title,
            description,
            dueDate,
            createdBy: req.user._id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAdminTasks = async (req, res) => {
    try {
        const tasks = await AdminTask.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdminTask = async (req, res) => {
    try {
        const task = await AdminTask.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAdminTask = async (req, res) => {
    try {
        const task = await AdminTask.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        // Optional: Clean up assignments related to this task? 
        // For now, keeping history or we could delete UserTaskStatus too.
        // Let's delete assignments to keep it clean.
        await UserTaskStatus.deleteMany({ adminTaskId: task._id });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Task Sets ---

exports.createTaskSet = async (req, res) => {
    try {
        const { name, description, tasks } = req.body;
        const taskSet = new TaskSet({
            name,
            description,
            tasks,
            createdBy: req.user._id
        });
        await taskSet.save();
        res.status(201).json(taskSet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTaskSets = async (req, res) => {
    try {
        const taskSets = await TaskSet.find({ createdBy: req.user._id })
            .populate('tasks')
            .sort({ createdAt: -1 });
        res.json(taskSets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTaskSet = async (req, res) => {
    try {
        const taskSet = await TaskSet.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true, runValidators: true }
        ).populate('tasks');
        if (!taskSet) return res.status(404).json({ message: 'Task Set not found' });
        res.json(taskSet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Groups ---

exports.createGroup = async (req, res) => {
    try {
        const { name, members } = req.body;
        const group = new Group({
            name,
            members,
            createdBy: req.user._id
        });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ createdBy: req.user._id })
            .populate('members', 'name email') // Only retrieve name and email of members
            .sort({ createdAt: -1 });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMemberToGroup = async (req, res) => {
    try {
        const { userId } = req.body;
        const group = await Group.findOneAndUpdate(
            { _id: req.params.groupId, createdBy: req.user._id },
            { $addToSet: { members: userId } },
            { new: true }
        ).populate('members', 'name email');
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeMemberFromGroup = async (req, res) => {
    try {
        const { userId } = req.params;
        const group = await Group.findOneAndUpdate(
            { _id: req.params.groupId, createdBy: req.user._id },
            { $pull: { members: userId } },
            { new: true }
        ).populate('members', 'name email');
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Assignments ---

exports.assignToGroup = async (req, res) => {
    try {
        const { type, id, groupIds } = req.body; // type: 'task' or 'set'

        if (!['task', 'set'].includes(type)) {
            return res.status(400).json({ message: 'Invalid assignment type' });
        }

        const groups = await Group.find({ _id: { $in: groupIds }, createdBy: req.user._id });
        if (groups.length !== groupIds.length) {
             return res.status(400).json({ message: 'One or more groups not found or not owned by you' });
        }

        let adminTasksToAssign = [];
        let taskSetId = null;

        if (type === 'task') {
            const task = await AdminTask.findOne({ _id: id, createdBy: req.user._id });
            if (!task) return res.status(404).json({ message: 'Task not found' });
            adminTasksToAssign.push(task._id);
        } else {
            const taskSet = await TaskSet.findOne({ _id: id, createdBy: req.user._id });
            if (!taskSet) return res.status(404).json({ message: 'Task Set not found' });
            adminTasksToAssign = taskSet.tasks;
            taskSetId = taskSet._id;
        }

        const assignments = [];

        for (const group of groups) {
            for (const memberId of group.members) {
                for (const taskId of adminTasksToAssign) {
                    assignments.push({
                        userId: memberId,
                        adminTaskId: taskId,
                        status: 'pending',
                        taskSetId: taskSetId,
                        groupId: group._id,
                        assignedBy: req.user._id
                    });
                }
            }
        }
        
        // Use InsertMany with ordered: false to continue if duplicates occur (if we had unique index)
        await UserTaskStatus.insertMany(assignments);

        res.json({ message: `Successfully assigned to ${assignments.length} user-task pairs.` });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
