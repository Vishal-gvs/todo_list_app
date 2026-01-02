import api from '../utils/api';

export interface AdminTask {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    createdBy: string;
}

export interface TaskSet {
    _id: string;
    name: string;
    description: string;
    tasks: AdminTask[];
    createdBy: string;
}

export interface Group {
    _id: string;
    name: string;
    members: { _id: string; name: string; email: string }[];
    createdBy: string;
}

// Admin Tasks
export const getAdminTasks = async () => {
    const response = await api.get('/admin/tasks');
    return response.data;
};

export const createAdminTask = async (data: { title: string; description?: string; dueDate?: string }) => {
    const response = await api.post('/admin/tasks', data);
    return response.data;
};

export const updateAdminTask = async (id: string, data: Partial<AdminTask>) => {
    const response = await api.put(`/admin/tasks/${id}`, data);
    return response.data;
};

export const deleteAdminTask = async (id: string) => {
    const response = await api.delete(`/admin/tasks/${id}`);
    return response.data;
};

// Task Sets
export const getTaskSets = async () => {
    const response = await api.get('/admin/task-sets');
    return response.data;
};

export const createTaskSet = async (data: { name: string; description?: string; tasks: string[] }) => {
    const response = await api.post('/admin/task-sets', data);
    return response.data;
};

// Groups
export const getGroups = async () => {
    const response = await api.get('/admin/groups');
    return response.data;
};

export const createGroup = async (name: string, members: string[] = []) => {
    const response = await api.post('/admin/groups', { name, members });
    return response.data;
};

export const addMemberToGroup = async (groupId: string, userId: string) => {
    const response = await api.post(`/admin/groups/${groupId}/members`, { userId });
    return response.data;
};

export const removeMemberFromGroup = async (groupId: string, userId: string) => {
    const response = await api.delete(`/admin/groups/${groupId}/members/${userId}`);
    return response.data;
};

// Assignments
export const assignToGroup = async (type: 'task' | 'set', id: string, groupIds: string[]) => {
    const response = await api.post('/admin/assignments', { type, id, groupIds });
    return response.data;
};
