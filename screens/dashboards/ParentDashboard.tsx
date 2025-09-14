
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SidebarItem } from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import { LayoutDashboard, User, CalendarDays, BarChart, DollarSign, Bell } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
    { path: '/parent', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/parent/performance', name: 'Performance', icon: BarChart },
    { path: '/parent/attendance', name: 'Attendance', icon: CalendarDays },
    { path: '/parent/fees', name: 'Fees', icon: DollarSign },
    { path: '/parent/notices', name: 'Notices', icon: Bell },
];

const ParentDashboard: React.FC = () => {
    // Assuming the parent is linked to 'Ahmed Ali'
    const childName = 'Ahmed Ali';

    return (
        <DashboardLayout sidebarItems={sidebarItems}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Parent Dashboard</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Viewing information for <span className="font-semibold text-paf-green-700 dark:text-paf-green-400">{childName}</span></p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Recent Performance">
                        <div className="space-y-2">
                            <p><strong>Mid-Term Exam Results:</strong></p>
                            <ul className="list-disc list-inside">
                                <li>Mathematics: 85/100 (Grade A)</li>
                                <li>Physics: 78/100 (Grade B)</li>
                            </ul>
                        </div>
                    </Card>
                    <Card title="Attendance Summary">
                        <p>Overall attendance for this month is <span className="font-bold text-green-600">95%</span>.</p>
                        <p>Total absences: 2 days.</p>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ParentDashboard;
