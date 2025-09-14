import React, { useState, useEffect } from 'react';
import { supabaseService } from '../../../services/supabaseService';
import { Teacher } from '../../../types';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminTeachers: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({});

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        setLoading(true);
        const data = await supabaseService.getTeachers();
        setTeachers(data);
        setLoading(false);
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setCurrentTeacher({});
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (teacher: Teacher) => {
        setIsEditing(true);
        setCurrentTeacher(teacher);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (teacherId: string) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            await supabaseService.deleteTeacher(teacherId);
            fetchTeachers();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, subjectName, className } = currentTeacher;
        if (!name || !subjectName || !className) {
            alert('Please fill all fields');
            return;
        }

        if (isEditing) {
            await supabaseService.updateTeacher(currentTeacher as Teacher);
        } else {
            await supabaseService.addTeacher(currentTeacher as Omit<Teacher, 'id'>);
        }
        fetchTeachers();
        handleCloseModal();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentTeacher(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Teachers</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="flex items-center bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700 transition"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Teacher
                </button>
            </div>

            <Card>
                {loading ? <p>Loading teachers...</p> : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {teachers.map((teacher) => (
                                    <tr key={teacher.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{teacher.subjectName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{teacher.className}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                            <button onClick={() => handleOpenEditModal(teacher)} className="text-paf-blue-600 hover:text-paf-blue-900" aria-label={`Edit ${teacher.name}`}><Edit size={18} /></button>
                                            <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${teacher.name}`}><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={isEditing ? 'Edit Teacher' : 'Add New Teacher'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" name="name" id="name" value={currentTeacher.name || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                        <input type="text" name="subjectName" id="subjectName" value={currentTeacher.subjectName || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Assigned</label>
                        <input type="text" name="className" id="className" value={currentTeacher.className || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700">{isEditing ? 'Save Changes' : 'Add Teacher'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminTeachers;
