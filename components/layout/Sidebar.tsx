import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LucideIcon, School } from 'lucide-react';

export interface SidebarItem {
    path: string;
    name: string;
    icon: LucideIcon;
}

interface SidebarProps {
    items: SidebarItem[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, open, setOpen }) => {
    return (
        <>
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" onClick={() => setOpen(false)}></div>

            <div
                id="sidebar"
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 xl:w-64 shrink-0 bg-paf-blue-900 dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${open ? 'translate-x-0' : '-translate-x-64'}`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                     <button className="lg:hidden text-gray-400 hover:text-gray-200" onClick={() => setOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <X className="w-6 h-6" />
                    </button>
                    <NavLink to="/" className="block">
                        <div className="flex items-center text-white">
                           <School className="w-10 h-10 mr-2"/>
                            <div className="lg:hidden xl:block">
                               <h1 className="text-xl font-bold">SNFC</h1>
                               <p className="text-xs">Management System</p>
                            </div>
                        </div>
                    </NavLink>
                </div>

                {/* Links */}
                <div className="space-y-2">
                    {items.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `block text-gray-300 hover:text-white transition duration-150 rounded-lg ${
                                isActive ? 'bg-paf-blue-800 dark:bg-gray-700' : ''
                                }`
                            }
                        >
                            <div className="flex items-center p-2">
                                <item.icon className="w-6 h-6 shrink-0" />
                                <span className="text-sm font-medium ml-3 lg:hidden xl:block">{item.name}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;