import AdminLayout from '../components/admin/AdminLayout';
import React, { useState, useEffect } from 'react';
import { Shield, User, Mail, Save, Trash2 } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../utils/errorHandler';

const schemas = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address')
});

type FormData = z.infer<typeof schemas>;

const AdminSettingsPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const {
      register,
      handleSubmit,
      formState: { errors, isDirty },
      reset
  } = useForm<FormData>({
      resolver: zodResolver(schemas),
      defaultValues: {
          name: user?.name || '',
          email: user?.email || ''
      }
  });

  useEffect(() => {
      if (user) {
          reset({
              name: user.name,
              email: user.email
          });
      }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
      setLoading(true);
      try {
          const response = await userAPI.updateProfile(data);
          updateUser(response.user);
          showSuccessToast('Profile updated successfully');
          reset(data); // Reset form with new values to clear isDirty
      } catch (err: any) {
          showErrorToast(err.response?.data?.message || 'Failed to update profile');
      } finally {
          setLoading(false);
      }
  };

  const handleDeleteAccount = async () => {
      if (!deleteConfirm) {
          setDeleteConfirm(true);
          setTimeout(() => setDeleteConfirm(false), 5000); // Reset after 5 seconds
          return;
      }

      setLoading(true);
      try {
          await userAPI.deleteProfile();
          logout();
          navigate('/login');
          showSuccessToast('Account deleted successfully');
      } catch (err: any) {
           showErrorToast(err.response?.data?.message || 'Failed to delete account');
           setLoading(false);
           setDeleteConfirm(false);
      }
  };

  if (!user) return null; // Should be handled by protected route, but safety check

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 mt-6 transition-colors duration-200">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <Shield className="h-10 w-10 text-purple-600" />
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold gap-1 bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 mt-2">
                <Shield className="h-4 w-4" /> Admin
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !isDirty}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-8">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-500 mb-4">Danger Zone</h3>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Delete Account</h4>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  {deleteConfirm ? 'Click again to confirm' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage; 