import React, { useState, useEffect } from 'react';
import { getAssignedTasks, updateTaskStatus, AssignedTask } from '../services/assignedTaskService';

const AssignedTaskList: React.FC = () => {
    const [tasks, setTasks] = useState<AssignedTask[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getAssignedTasks();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch assigned tasks', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async (task: AssignedTask) => {
        const newStatus = task.status === 'pending' ? 'done' : 'pending';
        try {
            await updateTaskStatus(task._id, newStatus);
            fetchTasks();
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    if (loading) return <div className="text-center py-4">Loading assigned tasks...</div>;

    if (tasks.length === 0) return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
            No tasks assigned to you yet.
        </div>
    );

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-gray-900 dark:text-white transition-colors duration-200">Assigned Tasks</h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map(task => (
                    <div key={task._id} className={`p-4 rounded-lg shadow-md border-l-4 transition-colors duration-200 
                        ${task.status === 'done' 
                            ? 'bg-gray-50 dark:bg-gray-900 border-green-500' 
                            : 'bg-white dark:bg-gray-800 border-blue-500'}`}>
                        
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-bold ${task.status === 'done' ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                {task.adminTaskId.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'}`}>
                                {task.status}
                            </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.adminTaskId.description}</p>
                        
                        <div className="text-xs text-gray-400 dark:text-gray-500 mb-4 space-y-1">
                            {task.adminTaskId.dueDate && <p>Due: {new Date(task.adminTaskId.dueDate).toLocaleDateString()}</p>}
                            <p>Assigned by: {task.assignedBy.name}</p>
                            {task.taskSetId && <p>Set: {task.taskSetId.name}</p>}
                        </div>

                        <button 
                            onClick={() => handleStatusToggle(task)}
                            className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                                task.status === 'done' 
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {task.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignedTaskList;
