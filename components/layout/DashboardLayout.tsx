
import React, { useState } from 'react';
import Sidebar, { SidebarItem } from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
    sidebarItems: SidebarItem[];
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebarItems, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar items={sidebarItems} open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
