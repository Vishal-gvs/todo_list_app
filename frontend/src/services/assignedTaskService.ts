import api from '../utils/api';
import { AdminTask, TaskSet } from './adminService';

export interface AssignedTask {
    _id: string;
    adminTaskId: AdminTask;
    status: 'pending' | 'done';
    taskSetId?: TaskSet;
    groupId?: string;
    assignedBy: { _id: string; name: string };
    createdAt: string;
}

export const getAssignedTasks = async () => {
    const response = await api.get('/assigned-tasks');
    return response.data;
};

export const updateTaskStatus = async (id: string, status: 'pending' | 'done') => {
    const response = await api.patch(`/assigned-tasks/${id}/status`, { status });
    return response.data;
};
