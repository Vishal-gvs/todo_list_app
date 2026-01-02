import React, { useState } from 'react';
import GroupManager from '../../components/admin/GroupManager';

import AdminLayout from '../../components/admin/AdminLayout';

const GroupsPage: React.FC = () => {
    const [, setLastUpdate] = useState(Date.now());

    return (
        <AdminLayout>
            <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Group Management</h1>
            <p className="text-gray-600 mb-4">Create groups and add users to assign tasks efficiently.</p>
            
            <GroupManager onGroupUpdated={() => setLastUpdate(Date.now())} />
            </div>
        </AdminLayout>
    );
};

export default GroupsPage;
