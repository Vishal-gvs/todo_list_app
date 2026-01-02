import React, { useState } from 'react';
import { createAdminTask, updateAdminTask } from '../../services/adminService';

interface AdminTaskFormProps {
    onTaskSaved: () => void;
    initialData?: any;
    isEditing?: boolean;
    onCancel: () => void;
}

const AdminTaskForm: React.FC<AdminTaskFormProps> = ({ onTaskSaved, initialData, isEditing, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const taskData = { title, description, dueDate };
            if (isEditing && initialData?._id) {
                await updateAdminTask(initialData._id, taskData);
            } else {
                await createAdminTask(taskData);
            }
            onTaskSaved();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save task');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{isEditing ? 'Edit Task' : 'Create Admin Task'}</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required 
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={3}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Due Date</label>
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Save</button>
            </div>
        </form>
    );
};

export default AdminTaskForm;
