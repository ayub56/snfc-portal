import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);
    
    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current || !trigger.current) return;
            if (!isUserMenuOpen || dropdown.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
            setIsUserMenuOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [isUserMenuOpen]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <header className="relative bg-white dark:bg-gray-800 shadow-md z-20">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    <div className="flex">
                        <button
                            className="text-gray-500 hover:text-gray-600 lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6 fill-current" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition duration-150"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-paf-blue-500" />}
                        </button>
                        
                        {/* User menu */}
                        <div className="relative inline-flex">
                            <button
                                ref={trigger}
                                className="inline-flex justify-center items-center group"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <img className="w-8 h-8 rounded-full" src={user?.avatarUrl} alt="User" />
                                <div className="flex items-center truncate">
                                    <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">{user?.name}</span>
                                </div>
                            </button>
                            {isUserMenuOpen && (
                                <div
                                    ref={dropdown}
                                    className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
                                >
                                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700">
                                        <div className="font-medium text-gray-800 dark:text-gray-100">{user?.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 italic capitalize">{user?.role}</div>
                                    </div>
                                    <ul>
                                        <li>
                                            <button
                                                className="font-medium text-sm text-paf-blue-500 hover:text-paf-blue-600 dark:hover:text-paf-blue-400 flex items-center py-1 px-3 w-full"
                                                onClick={logout}
                                            >
                                                <LogOut className="mr-2" size={16} />
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;