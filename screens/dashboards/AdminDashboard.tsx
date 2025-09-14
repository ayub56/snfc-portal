

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SidebarItem } from '../../components/layout/Sidebar';
import { LayoutDashboard, Users, UserCheck, BookOpen, BarChart3, Bell, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminClasses from './admin/AdminClasses';
import AdminStudents from './admin/AdminStudents';
import AdminTeachers from './admin/AdminTeachers';

const sidebarItems: SidebarItem[] = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/students', name: 'Students', icon: Users },
    { path: '/admin/teachers', name: 'Teachers', icon: UserCheck },
    { path: '/admin/classes', name: 'Classes', icon: BookOpen },
    { path: '/admin/reports', name: 'Reports', icon: FileText },
    { path: '/admin/notices', name: 'Notices', icon: Bell },
];

const AdminDashboard: React.FC = () => {
    return (
        <DashboardLayout sidebarItems={sidebarItems}>
            <Routes>
                <Route index element={<AdminHome />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="teachers" element={<AdminTeachers />} />
                <Route path="classes" element={<AdminClasses />} />
                <Route path="reports" element={<div>Reports Page</div>} />
                <Route path="notices" element={<div>Notices Page</div>} />
            </Routes>
        </DashboardLayout>
    );
};

// Mock Data for Charts
const attendanceData = [
  { name: 'Class 6', present: 95, absent: 5 },
  { name: 'Class 7', present: 92, absent: 8 },
  { name: 'Class 8', present: 98, absent: 2 },
  { name: 'Class 9', present: 90, absent: 10 },
  { name: 'Class 10', present: 96, absent: 4 },
];

const feeData = [
  { name: 'Paid', value: 400 },
  { name: 'Unpaid', value: 80 },
  { name: 'Overdue', value: 20 },
];

const COLORS = ['#45866c', '#f59e0b', '#ef4444'];


const AdminHome: React.FC = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-paf-blue-100 dark:bg-paf-blue-900/50">
                    <h3 className="text-lg font-semibold text-paf-blue-800 dark:text-paf-blue-200">Total Students</h3>
                    <p className="text-4xl font-bold text-paf-blue-900 dark:text-paf-blue-100">1,250</p>
                </Card>
                <Card className="bg-paf-green-100 dark:bg-paf-green-900/50">
                     <h3 className="text-lg font-semibold text-paf-green-800 dark:text-paf-green-200">Total Teachers</h3>
                    <p className="text-4xl font-bold text-paf-green-900 dark:text-paf-green-100">75</p>
                </Card>
                <Card className="bg-yellow-100 dark:bg-yellow-900/50">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Classes</h3>
                    <p className="text-4xl font-bold text-yellow-900 dark:text-yellow-100">30</p>
                </Card>
                <Card className="bg-red-100 dark:bg-red-900/50">
                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Pending Fees</h3>
                    <p className="text-4xl font-bold text-red-900 dark:text-red-100">100</p>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Today's Attendance by Class" icon={<BarChart3 />}>
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e5e7eb' }} />
                                <Legend />
                                <Bar dataKey="present" fill="#45866c" name="Present %" />
                                <Bar dataKey="absent" fill="#ef4444" name="Absent %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                 <Card title="Fee Collection Status" icon={<BarChart3 />}>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={feeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {feeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e5e7eb' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;