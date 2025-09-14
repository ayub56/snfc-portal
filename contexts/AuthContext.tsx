import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { clerkService } from '../services/clerkService';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (role: UserRole) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const sessionUser = await clerkService.checkSession();
                setUser(sessionUser);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUserSession();
    }, []);

    const login = async (role: UserRole) => {
        setLoading(true);
        const loggedInUser = await clerkService.signIn(role);
        setUser(loggedInUser);
        setLoading(false);
    };

    const logout = () => {
        clerkService.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};