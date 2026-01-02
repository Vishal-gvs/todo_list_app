const mongoose = require('mongoose');

const taskSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task Set name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: ''
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminTask'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TaskSet', taskSetSchema);
