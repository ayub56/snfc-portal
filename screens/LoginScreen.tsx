import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { School, User, Shield, UserCheck, GraduationCap, Users } from 'lucide-react';

const LoginScreen: React.FC = () => {
    const { login, loading } = useAuth();

    const handleLogin = (role: UserRole) => {
        login(role);
    };
    
    const roleConfig = [
        { role: UserRole.Admin, icon: Shield, label: 'Admin Login' },
        { role: UserRole.Clerk, icon: User, label: 'Clerk Login' },
        { role: UserRole.Teacher, icon: UserCheck, label: 'Teacher Login' },
        { role: UserRole.Student, icon: GraduationCap, label: 'Student Login' },
        { role: UserRole.Parent, icon: Users, label: 'Parent Login' },
    ]

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
             <div className="text-center mb-10">
                <School className="w-24 h-24 mx-auto mb-4 text-paf-green-700 dark:text-paf-green-400" />
                <h1 className="text-4xl font-extrabold text-paf-green-700 dark:text-paf-green-400">Saleem Nawaz Fazaia College</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">School Management System</p>
            </div>
            
            <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Select Your Role to Sign In</h2>
                {roleConfig.map(({ role, icon: Icon, label }) => (
                     <button
                        key={role}
                        onClick={() => handleLogin(role)}
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 px-4 text-lg font-medium rounded-lg text-white bg-paf-blue-600 hover:bg-paf-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-paf-blue-500 disabled:bg-paf-blue-400 transition-colors duration-200"
                    >
                        <Icon className="w-6 h-6 mr-3" />
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoginScreen;