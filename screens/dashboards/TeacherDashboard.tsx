import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SidebarItem } from '../../components/layout/Sidebar';
import { LayoutDashboard, CalendarCheck, Book, Edit } from 'lucide-react';
import Card from '../../components/ui/Card';

const sidebarItems: SidebarItem[] = [
    { path: '/teacher', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/teacher/attendance', name: 'Attendance', icon: CalendarCheck },
    { path: '/teacher/assignments', name: 'Assignments', icon: Book },
    { path: '/teacher/grades', name: 'Grades', icon: Edit },
];

const TeacherDashboard: React.FC = () => {
    return (
        <DashboardLayout sidebarItems={sidebarItems}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Teacher Dashboard</h1>
                <Card title="Today's Classes">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="font-bold text-lg">Mathematics - Class 10A</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">09:00 AM - 09:45 AM</p>
                            </div>
                            <button onClick={() => alert('Opening attendance for Mathematics - Class 10A')} className="bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700 transition">Take Attendance</button>
                        </div>
                         <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="font-bold text-lg">Mathematics - Class 10B</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">11:00 AM - 11:45 AM</p>
                            </div>
                            <button onClick={() => alert('Opening attendance for Mathematics - Class 10B')} className="bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700 transition">Take Attendance</button>
                        </div>
                    </div>
                </Card>
                <Card title="Pending Assignments to Grade">
                     <p>You have 5 assignments pending for grading.</p>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default TeacherDashboard;