
import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', icon }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 ${className}`}>
            {title && (
                <div className="flex items-center mb-4">
                    {icon && <div className="mr-3 text-paf-green-500">{icon}</div>}
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
                </div>
            )}
            <div className="text-gray-600 dark:text-gray-300">{children}</div>
        </div>
    );
};

export default Card;
