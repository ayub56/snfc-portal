import React, { useState, useEffect } from 'react';
import { supabaseService } from '../../../services/supabaseService';
import { Student } from '../../../types';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminStudents: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        const data = await supabaseService.getStudents();
        setStudents(data);
        setLoading(false);
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setCurrentStudent({});
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (student: Student) => {
        setIsEditing(true);
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (studentId: string) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await supabaseService.deleteStudent(studentId);
            fetchStudents();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, admissionNo, className, section, parentId } = currentStudent;
        if (!name || !admissionNo || !className || !section || !parentId) {
            alert('Please fill all fields');
            return;
        }

        if (isEditing) {
            await supabaseService.updateStudent(currentStudent as Student);
        } else {
            await supabaseService.addStudent(currentStudent as Omit<Student, 'id'>);
        }
        fetchStudents();
        handleCloseModal();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentStudent(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Students</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="flex items-center bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700 transition"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Student
                </button>
            </div>

            <Card>
                {loading ? <p>Loading students...</p> : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Admission No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Section</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.admissionNo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.className}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.section}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                            <button onClick={() => handleOpenEditModal(student)} className="text-paf-blue-600 hover:text-paf-blue-900" aria-label={`Edit ${student.name}`}><Edit size={18} /></button>
                                            <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${student.name}`}><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={isEditing ? 'Edit Student' : 'Add New Student'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" value={currentStudent.name || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="admissionNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admission No.</label>
                            <input type="text" name="admissionNo" id="admissionNo" value={currentStudent.admissionNo || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                        </div>
                         <div>
                            <label htmlFor="className" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
                            <input type="text" name="className" id="className" value={currentStudent.className || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                        </div>
                         <div>
                            <label htmlFor="section" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
                            <input type="text" name="section" id="section" value={currentStudent.section || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parent ID</label>
                            <input type="text" name="parentId" id="parentId" value={currentStudent.parentId || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700">{isEditing ? 'Save Changes' : 'Add Student'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminStudents;
