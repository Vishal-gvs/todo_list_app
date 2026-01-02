const UserTaskStatus = require('../models/UserTaskStatus');

exports.getAssignedTasks = async (req, res) => {
    try {
        const tasks = await UserTaskStatus.find({ userId: req.user._id })
            .populate('adminTaskId')
            .populate('taskSetId', 'name')
            .populate('assignedBy', 'name')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'done'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const taskStatus = await UserTaskStatus.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { status },
            { new: true }
        );

        if (!taskStatus) {
            return res.status(404).json({ message: 'Assigned task not found' });
        }

        res.json(taskStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
