import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SidebarItem } from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import { LayoutDashboard, UserPlus, Receipt, Search } from 'lucide-react';
import { Fee, Student } from '../../types';
import { supabaseService } from '../../services/supabaseService';

const sidebarItems: SidebarItem[] = [
    { path: '/clerk', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/clerk/admissions', name: 'Admissions', icon: UserPlus },
    { path: '/clerk/fees', name: 'Fee Collection', icon: Receipt },
];

const ClerkDashboard: React.FC = () => {
    const [fees, setFees] = useState<Fee[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [feeData, studentData] = await Promise.all([
                supabaseService.getFees(),
                supabaseService.getStudents()
            ]);
            setFees(feeData);
            setStudents(studentData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleMarkAsPaid = async (feeId: string) => {
        try {
            await supabaseService.updateFeeStatus(feeId, 'Paid');
            setFees(prevFees => prevFees.map(fee =>
                fee.id === feeId ? { ...fee, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] } : fee
            ));
        } catch (error) {
            console.error('Failed to mark fee as paid:', error);
            alert('Failed to update fee status.');
        }
    };

    const filteredFees = useMemo(() => {
        const unpaidFees = fees.filter(f => f.status === 'Unpaid' || f.status === 'Overdue');
        if (!searchTerm) {
            return unpaidFees.map(fee => ({
                ...fee,
                admissionNo: students.find(s => s.userId === fee.studentId)?.admissionNo || 'N/A',
            }));
        }

        return unpaidFees.map(fee => ({
            ...fee,
            admissionNo: students.find(s => s.userId === fee.studentId)?.admissionNo || 'N/A',
        })).filter(fee => {
            const search = searchTerm.toLowerCase();
            return fee.studentName.toLowerCase().includes(search) ||
                   fee.admissionNo.toLowerCase().includes(search);
        });
    }, [fees, students, searchTerm]);

    return (
        <DashboardLayout sidebarItems={sidebarItems}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Clerk Dashboard</h1>
                 <Card title="Pending Fee Collections">
                    <div className="mb-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name or admission no..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-sm pl-10 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-paf-blue-500"
                            />
                        </div>
                    </div>
                    {loading ? <p>Loading fees...</p> : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Admission No</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredFees.length > 0 ? filteredFees.map((fee) => (
                                        <tr key={fee.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{fee.admissionNo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{fee.studentName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Rs. {fee.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{fee.dueDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    fee.status === 'Overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                                                }`}>
                                                    {fee.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => handleMarkAsPaid(fee.id)} className="text-paf-green-600 hover:text-paf-green-900 dark:text-paf-green-400 dark:hover:text-paf-green-300">Mark as Paid</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                                No pending fees found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default ClerkDashboard;