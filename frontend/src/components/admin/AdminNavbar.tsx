import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';
import { LogOut, BarChart2 } from 'lucide-react';

const AdminNavbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="shadow bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-foreground">
                <div className="flex items-center gap-3">
                    <BarChart2 className="h-7 w-7 text-blue-600" />
                    <Link to="/admin" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                        Admin Portal
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link to="/admin/stats" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Statistics
                    </Link>
                    <Link to="/admin/tasks" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Tasks
                    </Link>
                    <Link to="/admin/groups" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Groups
                    </Link>
                    <Link to="/admin/settings" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Settings
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                        {user?.name}
                    </span>
                    <ThemeToggle />
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm font-medium flex items-center transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-1" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
