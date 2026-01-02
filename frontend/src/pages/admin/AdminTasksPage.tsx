import React, { useState, useEffect } from 'react';
import { getAdminTasks, deleteAdminTask, AdminTask } from '../../services/adminService';
import AdminTaskForm from '../../components/admin/AdminTaskForm';
import AssignmentModal from '../../components/admin/AssignmentModal';

import AdminLayout from '../../components/admin/AdminLayout';

// ...

const AdminTasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<AdminTask[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    const [editingTask, setEditingTask] = useState<AdminTask | null>(null);
    const [assigningTask, setAssigningTask] = useState<AdminTask | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getAdminTasks();
        setTasks(data);
    };

    const handleTaskSaved = () => {
        setShowCreate(false);
        setEditingTask(null);
        fetchTasks();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await deleteAdminTask(id);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Tasks</h1>
                <button 
                    onClick={() => setShowCreate(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Create New Task
                </button>
            </div>

            {(showCreate || editingTask) && (
                <div className="mb-6">
                    <AdminTaskForm 
                        onTaskSaved={handleTaskSaved} 
                        initialData={editingTask} 
                        isEditing={!!editingTask}
                        onCancel={() => { setShowCreate(false); setEditingTask(null); }}
                    />
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map(task => (
                    <div key={task._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h3>
                            <div className="space-x-2">
                                <button 
                                    onClick={() => setEditingTask(task)} 
                                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(task._id)}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
                        {task.dueDate && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                        
                        <button 
                            onClick={() => setAssigningTask(task)}
                            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            Assign to Group
                        </button>
                    </div>
                ))}
            </div>

            {assigningTask && (
                <AssignmentModal 
                    type="task" 
                    itemId={assigningTask._id} 
                    itemTitle={assigningTask.title} 
                    onClose={() => setAssigningTask(null)}
                    onAssign={() => setAssigningTask(null)}
                />
            )}
        </div>
    </AdminLayout>
    );
};

export default AdminTasksPage;
