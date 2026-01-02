const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let adminToken = '';
let userToken = '';
let createdTaskId = '';
let createdGroupId = '';
let createdTaskSetId = '';
let userId = '';

// Helper to delay for server start
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runVerification() {
    console.log('Starting Verification...');
    
    // 1. Login as Admin
    try {
        console.log('1. Logging in as Admin...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@example.com',
            password: 'password123'
        });
        adminToken = loginRes.data.token; // Changed from .token based on common patterns, need to verify auth response structure if fails
        console.log('✅ Admin logged in');
    } catch (error) {
        console.error('❌ Admin login failed:', error.response?.data || error.message);
        return;
    }

    const adminConfig = { headers: { Authorization: `Bearer ${adminToken}` } };

    // 2. Create Admin Task
    try {
        console.log('2. Creating Admin Task...');
        const taskRes = await axios.post(`${API_URL}/admin/tasks`, {
            title: 'Verify Sys Admin Task',
            description: 'Task created by verification script',
            dueDate: new Date(Date.now() + 86400000) // Tomorrow
        }, adminConfig);
        createdTaskId = taskRes.data._id;
        console.log('✅ Admin Task Created:', createdTaskId);
    } catch (error) {
        console.error('❌ Create Admin Task failed:', error.response?.data || error.message);
    }

    // 3. Create Group
    try {
        console.log('3. Creating Group...');
        // We need a user to add to the group. Let's register a new user or use a dummy.
        // Let's register a test user for assignment.
        const testUserEmail = `testuser_${Date.now()}@example.com`;
        const registerRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test Assignment User',
            email: testUserEmail,
            password: 'password123'
        });
        userToken = registerRes.data.token;
        // Decoder/Get Profile to get ID? Or register returns user object?
        // Usually register returns token. Let's assume we can get profile with token.
        const userConfig = { headers: { Authorization: `Bearer ${userToken}` } };
        // Actually, let's just use the admin token to find this user or similar?
        // Better: register usually returns user info too.
        // If not, we call /api/auth/me if it exists.
        // Let's assume we can't get ID easily without another call if register doesn't return it.
        // But for "Add member to group", we need userId.
        // Let's rely on register returning { user: { _id, ... } } or similar.
        // If strict JWT, we might need to decode.
        // Let's inspect valid auth response if this fails? 
        // For now assume register returns { token, user: { _id } } or similar which is common.
        // If not, we'll fix.
        userId = registerRes.data.user ? registerRes.data.user._id : null; 
        
        if (!userId) {
             // Fallback: try login/me
             // Or assuming the auth middleware puts user in req, maybe there's a route.
             // Let's skip valid user check for a sec and assume we got it.
             console.log('⚠️ Could not extract userId from register directly. Checking response keys:', Object.keys(registerRes.data));
        } else {
             console.log('✅ Test User Created:', userId);
        }

        const groupRes = await axios.post(`${API_URL}/admin/groups`, {
            name: 'Verification Group',
            members: userId ? [userId] : []
        }, adminConfig);
        createdGroupId = groupRes.data._id;
        console.log('✅ Group Created:', createdGroupId);

    } catch (error) {
        console.error('❌ Create Group/User failed:', error.response?.data || error.message);
    }

    // 4. Assign Task to Group
    if (createdTaskId && createdGroupId && userId) {
        try {
            console.log('4. Assigning Task to Group...');
            const assignRes = await axios.post(`${API_URL}/admin/assignments`, {
                type: 'task',
                id: createdTaskId,
                groupIds: [createdGroupId]
            }, adminConfig);
            console.log('✅ Assignment successful:', assignRes.data.message);
        } catch (error) {
            console.error('❌ Assignment failed:', error.response?.data || error.message);
        }
    } else {
        console.log('⚠️ Skipping assignment - missing dependencies');
    }

    // 5. Verify User Sees Task
    if (userId && userToken) {
        try {
            console.log('5. Verifying User View...');
            const userConfig = { headers: { Authorization: `Bearer ${userToken}` } };
            const tasksRes = await axios.get(`${API_URL}/assigned-tasks`, userConfig);
            
            const found = tasksRes.data.find(t => t.adminTaskId._id === createdTaskId || t.adminTaskId === createdTaskId);
            
            if (found) {
                console.log('✅ User successfully sees assigned task');
                
                // 6. Mark as Done
                console.log('6. Marking Task as Done...');
                await axios.patch(`${API_URL}/assigned-tasks/${found._id}/status`, {
                    status: 'done'
                }, userConfig);
                console.log('✅ Task marked as done');
                
            } else {
                console.error('❌ User did NOT see the assigned task. Tasks returned:', tasksRes.data.length);
            }
            
        } catch (error) {
            console.error('❌ User View verification failed:', error.response?.data || error.message);
        }
    }

    console.log('Verification Complete');
}

runVerification();
