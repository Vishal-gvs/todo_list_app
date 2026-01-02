const mongoose = require('mongoose');

const userTaskStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminTaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminTask',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    },
    taskSetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskSet'
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Index to quickly find tasks for a user
userTaskStatusSchema.index({ userId: 1, status: 1 });
// Index to prevent duplicate assignments from same group/task combination if needed, 
// though re-assignment might be valid. Let's keep it simple for now.

module.exports = mongoose.model('UserTaskStatus', userTaskStatusSchema);
