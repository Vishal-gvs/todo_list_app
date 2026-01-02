import React, { useState, useEffect } from 'react';
import { getGroups, createGroup, addMemberToGroup, removeMemberFromGroup, Group } from '../../services/adminService';
import { userAPI } from '../../utils/api'; // Getting user list from stats or create a new endpoint? 
// Actually userAPI.getStatistics returns user list. Let's use that for now or assume we need a search.
// For simplicity in this iteration, I'll fetch stats to get users.

interface GroupManagerProps {
    onGroupUpdated: () => void;
}

const GroupManager: React.FC<GroupManagerProps> = ({ onGroupUpdated }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [availableUsers, setAvailableUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        fetchGroups();
        fetchUsers();
    }, []);

    const fetchGroups = async () => {
        const data = await getGroups();
        setGroups(data);
    };

    const fetchUsers = async () => {
         // Using stats to get user list is a hack, but efficient for small apps.
         // Ideally we need /api/users/list or similar.
         // Let's try to get users from stats for now as it exposes id, name, email.
         try {
             const stats = await userAPI.getStatistics();
             setAvailableUsers(stats.userStats);
         } catch (err) {
             console.error("Failed to fetch users");
         }
    };

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;
        try {
            await createGroup(newGroupName);
            setNewGroupName('');
            fetchGroups();
            onGroupUpdated();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddMember = async (groupId: string) => {
        if (!selectedUser) return;
        try {
             await addMemberToGroup(groupId, selectedUser);
             fetchGroups();
             setSelectedUser('');
        } catch (err) {
             console.error(err);
        }
    };

    const handleRemoveMember = async (groupId: string, userId: string) => {
        try {
            await removeMemberFromGroup(groupId, userId);
            fetchGroups();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Group</h3>
                <form onSubmit={handleCreateGroup} className="flex gap-2">
                    <input 
                        type="text" 
                        value={newGroupName} 
                        onChange={(e) => setNewGroupName(e.target.value)} 
                        placeholder="Group Name"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create</button>
                </form>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {groups.map(group => (
                    <div key={group._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{group.name}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{group.members.length} members</span>
                        </div>
                        
                        <div className="mb-4">
                             <select 
                                value={selectedUser} 
                                onChange={(e) => setSelectedUser(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                             >
                                 <option value="">Select User to Add</option>
                                 {availableUsers.map(user => (
                                     <option key={user._id} value={user._id}>
                                         {user.name} ({user.email})
                                     </option>
                                 ))}
                             </select>
                             <button 
                                onClick={() => handleAddMember(group._id)}
                                disabled={!selectedUser}
                                className="w-full px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400 dark:disabled:bg-gray-600 hover:bg-blue-600 transition-colors"
                             >
                                 Add Member
                             </button>
                        </div>

                        <ul className="space-y-2">
                            {group.members.map(member => (
                                <li key={member._id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded transition-colors duration-200">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{member.name}</span>
                                    <button 
                                        onClick={() => handleRemoveMember(group._id, member._id)}
                                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                            {group.members.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400 italic">No members yet</p>}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupManager;
