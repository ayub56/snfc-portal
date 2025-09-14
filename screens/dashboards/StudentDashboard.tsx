import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SidebarItem } from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import { LayoutDashboard, Calendar, BookOpen, BarChart2, DollarSign, Bell } from 'lucide-react';
import { Assignment, Fee, Result } from '../../types';
import { supabaseService } from '../../services/supabaseService';
import { useAuth } from '../../contexts/AuthContext';

const sidebarItems: SidebarItem[] = [
    { path: '/student', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/timetable', name: 'Timetable', icon: Calendar },
    { path: '/student/homework', name: 'Homework', icon: BookOpen },
    { path: '/student/results', name: 'Results', icon: BarChart2 },
    { path: '/student/fees', name: 'Fees', icon: DollarSign },
    { path: '/student/notices', name: 'Notices', icon: Bell },
];

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [results, setResults] = useState<Result[]>([]);
    const [fees, setFees] = useState<Fee[]>([]);

    useEffect(() => {
        if(user) {
            supabaseService.getAssignmentsForStudent(user.id).then(setAssignments);
            supabaseService.getResultsForStudent(user.id).then(setResults);
            supabaseService.getFees().then(allFees => setFees(allFees.filter(f => f.studentId === user.id)));
        }
    }, [user]);

    const pendingAssignments = assignments.filter(a => !a.submitted);
    const unpaidFee = fees.find(f => f.status !== 'Paid');

    return (
        <DashboardLayout sidebarItems={sidebarItems}>
            <div className="space-y-6">
                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {user?.name}!</h1>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Upcoming Assignments" className="md:col-span-2">
                        {pendingAssignments.length > 0 ? (
                            <ul className="space-y-3">
                                {pendingAssignments.map(assignment => (
                                    <li key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{assignment.title} ({assignment.subject})</p>
                                            <p className="text-sm text-red-500">Due: {assignment.dueDate}</p>
                                        </div>
                                        <button onClick={() => alert(`Viewing assignment: ${assignment.title}`)} className="text-sm bg-paf-blue-500 text-white px-3 py-1 rounded-md hover:bg-paf-blue-600">View</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No pending assignments. Great job!</p>
                        )}
                    </Card>

                    <Card title="Fee Status">
                        {unpaidFee ? (
                            <div className="text-center">
                                <p className="text-lg">Amount Due:</p>
                                <p className="text-3xl font-bold my-2">Rs. {unpaidFee.amount}</p>
                                <p className={`font-semibold ${unpaidFee.status === 'Overdue' ? 'text-red-500' : 'text-yellow-500'}`}>
                                    Status: {unpaidFee.status}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Due by: {unpaidFee.dueDate}</p>
                                <button onClick={() => alert('Redirecting to payment gateway...')} className="mt-4 w-full bg-paf-green-600 text-white py-2 rounded-lg hover:bg-paf-green-700">Pay Now</button>
                            </div>
                        ) : (
                            <div className="text-center">
                               <p className="text-xl font-semibold text-paf-green-600">All fees cleared!</p>
                               <p>Thank you.</p>
                            </div>
                        )}
                    </Card>
                 </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;