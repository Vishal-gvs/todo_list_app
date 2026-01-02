import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import LoadingSpinner from './components/LoadingSpinner'
import AdminStatisticsPage from './pages/AdminStatisticsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AdminTasksPage from './pages/admin/AdminTasksPage';
import GroupsPage from './pages/admin/GroupsPage';
// Since I decided to keep AssignedTaskList as a component in Dashboard for now in plan (wait, plan said "Update Dashboard... or link to new AssignedTasksPage").
// Let's create a dedicated page for Assigned Tasks to keep it clean.
import AssignedTaskList from './components/AssignedTaskList'; 
// Actually I'll wrap AssignedTaskList in a page wrapper inline or create AssignedTasksPage.tsx. 
// Let's stick to inline wrapper for simplicity or create page if cleaner.
// I'll create a simple wrapper page.

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Admin Route Component
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminStatisticsPage /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
        <Route path="/admin/stats" element={<AdminRoute><AdminStatisticsPage /></AdminRoute>} />
        <Route path="/admin/tasks" element={<AdminRoute><AdminTasksPage /></AdminRoute>} />
        <Route path="/admin/groups" element={<AdminRoute><GroupsPage /></AdminRoute>} />

        {/* User Routes Extension */}
        <Route path="/assigned-tasks" element={
          <ProtectedRoute>
            <div className="container mx-auto p-4">
              <AssignedTaskList />
            </div>
          </ProtectedRoute>
        } />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasks/create" 
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasks/:id/edit" 
          element={
            <ProtectedRoute>
              <EditTaskPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/statistics" 
          element={
            <ProtectedRoute>
              <AdminStatisticsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <AdminSettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  )
}

export default App 