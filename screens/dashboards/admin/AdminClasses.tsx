
import React, { useState, useEffect } from 'react';
import { supabaseService } from '../../../services/supabaseService';
import { Class } from '../../../types';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminClasses: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentClass, setCurrentClass] = useState<Partial<Class>>({});

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        setLoading(true);
        const data = await supabaseService.getClasses();
        setClasses(data);
        setLoading(false);
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setCurrentClass({});
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (cls: Class) => {
        setIsEditing(true);
        setCurrentClass(cls);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (classId: string) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            await supabaseService.deleteClass(classId);
            fetchClasses();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentClass.name || !currentClass.section || !currentClass.teacherName) {
            alert('Please fill all fields');
            return;
        }

        if (isEditing) {
            await supabaseService.updateClass(currentClass as Class);
        } else {
            await supabaseService.addClass(currentClass as Omit<Class, 'id'>);
        }
        fetchClasses();
        handleCloseModal();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentClass(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Classes</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="flex items-center bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700 transition"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Class
                </button>
            </div>

            <Card>
                {loading ? <p>Loading classes...</p> : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Section</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class Teacher</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {classes.map((cls) => (
                                    <tr key={cls.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{cls.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cls.section}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cls.teacherName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                            <button onClick={() => handleOpenEditModal(cls)} className="text-paf-blue-600 hover:text-paf-blue-900" aria-label={`Edit ${cls.name} class`}><Edit size={18} /></button>
                                            <button onClick={() => handleDelete(cls.id)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${cls.name} class`}><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={isEditing ? 'Edit Class' : 'Add New Class'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Name</label>
                        <input type="text" name="name" id="name" value={currentClass.name || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="section" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
                        <input type="text" name="section" id="section" value={currentClass.section || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Teacher</label>
                        <input type="text" name="teacherName" id="teacherName" value={currentClass.teacherName || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-paf-blue-500 focus:border-paf-blue-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="bg-paf-green-600 text-white px-4 py-2 rounded-lg hover:bg-paf-green-700">{isEditing ? 'Save Changes' : 'Add Class'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminClasses;
