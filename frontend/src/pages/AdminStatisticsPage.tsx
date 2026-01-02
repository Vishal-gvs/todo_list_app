import AdminLayout from '../components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/utils/api';
import { User as UserIcon, Shield } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../utils/errorHandler';
// ... (interfaces remain same)

const AdminStatisticsPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await userAPI.getStatistics();
      setStats(data);
    } catch (err: any) {
      setError('Failed to load statistics');
    } finally {
      setFetching(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to delete user ${userName}?`)) return;

    try {
      await userAPI.deleteUserByAdmin(userId);
      showSuccessToast('User deleted successfully');
      fetchStats();
    } catch (err: any) {
      showErrorToast(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (!user || user.role !== 'admin') return <div className="p-8 text-center text-red-600 dark:text-red-400">Access denied. Admins only.</div>;

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-6">User & Task Report</h2>

        {fetching && <div>Loading statistics...</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {stats && (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-6 flex items-center gap-4 shadow">
                <UserIcon className="h-10 w-10 text-blue-600" />
                <div>
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                  <div className="text-blue-800 dark:text-blue-200 font-semibold">Total Users</div>
                </div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-6 flex items-center gap-4 shadow">
                <Shield className="h-10 w-10 text-purple-600" />
                <div>
                  <div className="text-3xl font-bold">{stats.totalAdmins}</div>
                  <div className="text-purple-800 dark:text-purple-200 font-semibold">Total Admins</div>
                </div>
              </div>
            </div>

            {/* Admins Table */}
            <h3 className="text-lg font-semibold mb-2 mt-8">Admins</h3>
            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow mb-8">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 border-b text-left">Name</th>
                    <th className="px-4 py-3 border-b text-left">Email</th>
                    <th className="px-4 py-3 border-b text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.userStats.filter((u: any) => u.role === 'admin').map((u: any, idx: number) => (
                    <tr key={u._id} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                      <td className="px-4 py-3 border-b font-medium">{u.name}</td>
                      <td className="px-4 py-3 border-b">{u.email}</td>
                      <td className="px-4 py-3 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold gap-1 bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                          <Shield className="h-4 w-4" /> Admin
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Users Table */}
            <h3 className="text-lg font-semibold mb-2 mt-8">Users</h3>
            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 border-b text-left">Name</th>
                    <th className="px-4 py-3 border-b text-left">Email</th>
                    <th className="px-4 py-3 border-b text-left">Role</th>
                    <th className="px-4 py-3 border-b text-left">Task Count</th>
                    <th className="px-4 py-3 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.userStats.filter((u: any) => u.role !== 'admin').map((u: any, idx: number) => (
                    <tr key={u._id} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                      <td className="px-4 py-3 border-b font-medium">{u.name}</td>
                      <td className="px-4 py-3 border-b">{u.email}</td>
                      <td className="px-4 py-3 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold gap-1 bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                          <UserIcon className="h-4 w-4" /> User
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b">{u.taskCount}</td>
                      <td className="px-4 py-3 border-b text-center">
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                          onClick={() => handleDeleteUser(u._id, u.name)}
                          disabled={u._id === user._id}
                          title={u._id === user._id ? 'You cannot delete yourself' : 'Delete user'}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
    </AdminLayout>
  );
};

export default AdminStatisticsPage; 