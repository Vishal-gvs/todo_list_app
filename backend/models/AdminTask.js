const mongoose = require('mongoose');

const adminTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [1, 'Task title cannot be empty'],
        maxlength: [100, 'Task title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: ''
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function(value) {
                if (!value) return true;
                const now = new Date();
                const due = new Date(value.getFullYear(), value.getMonth(), value.getDate());
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                return due >= today;
            },
            message: 'Due date cannot be in the past'
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminTask', adminTaskSchema);
