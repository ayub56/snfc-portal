import React, { useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminDashboard from './screens/dashboards/AdminDashboard';
import ClerkDashboard from './screens/dashboards/ClerkDashboard';
import TeacherDashboard from './screens/dashboards/TeacherDashboard';
import StudentDashboard from './screens/dashboards/StudentDashboard';
import ParentDashboard from './screens/dashboards/ParentDashboard';
import { UserRole } from './types';
import LoginScreen from './screens/LoginScreen';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <MainRouter />
        </AuthProvider>
    );
};

const MainRouter = () => {
    const { user, loading } = useAuth();

    const roleToDashboardMap: Record<UserRole, string> = useMemo(() => ({
        [UserRole.Admin]: '/admin',
        [UserRole.Clerk]: '/clerk',
        [UserRole.Teacher]: '/teacher',
        [UserRole.Student]: '/student',
        [UserRole.Parent]: '/parent',
    }), []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Loading...</div>
            </div>
        );
    }
    
    return (
        <HashRouter>
            <Routes>
                {!user ? (
                    <>
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/admin/*" element={<ProtectedRoute role={UserRole.Admin}><AdminDashboard /></ProtectedRoute>} />
                        <Route path="/clerk/*" element={<ProtectedRoute role={UserRole.Clerk}><ClerkDashboard /></ProtectedRoute>} />
                        <Route path="/teacher/*" element={<ProtectedRoute role={UserRole.Teacher}><TeacherDashboard /></ProtectedRoute>} />
                        <Route path="/student/*" element={<ProtectedRoute role={UserRole.Student}><StudentDashboard /></ProtectedRoute>} />
                        <Route path="/parent/*" element={<ProtectedRoute role={UserRole.Parent}><ParentDashboard /></ProtectedRoute>} />
                        
                        <Route path="*" element={<Navigate to={roleToDashboardMap[user.role]} replace />} />
                    </>
                )}
            </Routes>
        </HashRouter>
    );
}

interface ProtectedRouteProps {
  role: UserRole;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== role) {
        const roleToDashboardMap: Record<UserRole, string> = {
            [UserRole.Admin]: '/admin',
            [UserRole.Clerk]: '/clerk',
            [UserRole.Teacher]: '/teacher',
            [UserRole.Student]: '/student',
            [UserRole.Parent]: '/parent',
        };
        return <Navigate to={roleToDashboardMap[user.role]} replace />;
    }

    return children;
};

export default App;