import React, { useState, useEffect } from 'react';
import { getGroups, assignToGroup } from '../../services/adminService';

interface AssignmentModalProps {
    type: 'task' | 'set';
    itemId: string;
    itemTitle: string;
    onClose: () => void;
    onAssign: () => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ type, itemId, itemTitle, onClose, onAssign }) => {
    const [groups, setGroups] = useState<any[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            const data = await getGroups();
            setGroups(data);
        };
        fetchGroups();
    }, []);

    const toggleGroup = (groupId: string) => {
        setSelectedGroups(prev => 
            prev.includes(groupId) 
                ? prev.filter(id => id !== groupId) 
                : [...prev, groupId]
        );
    };

    const handleAssign = async () => {
        if (selectedGroups.length === 0) return;
        setLoading(true);
        try {
            await assignToGroup(type, itemId, selectedGroups);
            setSuccess('Assignment successful!');
            setTimeout(() => {
                onAssign();
                onClose();
            }, 1000);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full transition-colors duration-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Assign "{itemTitle}"</h3>
                
                {success ? (
                    <div className="text-green-600 dark:text-green-400 text-center py-4">{success}</div>
                ) : (
                    <>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">Select groups to assign this {type} to:</p>
                        
                        <div className="max-h-60 overflow-y-auto mb-4 border border-gray-200 dark:border-gray-700 rounded p-2 bg-gray-50 dark:bg-gray-900/50">
                            {groups.map(group => (
                                <label key={group._id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedGroups.includes(group._id)} 
                                        onChange={() => toggleGroup(group._id)}
                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                                    />
                                    <span className="text-gray-900 dark:text-gray-200">{group.name} ({group.members.length} members)</span>
                                </label>
                            ))}
                            {groups.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400">No groups found</p>}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button onClick={onClose} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">Cancel</button>
                            <button 
                                onClick={handleAssign} 
                                disabled={loading || selectedGroups.length === 0}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors"
                            >
                                {loading ? 'Assigning...' : 'Assign'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AssignmentModal;
