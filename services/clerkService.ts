
import { User, UserRole } from '../types';

const MOCK_USERS: Record<UserRole, User> = {
    [UserRole.Admin]: {
        id: 'user_admin_01',
        clerkId: 'clerk_admin_01',
        name: 'Admin User',
        email: 'admin@snfc.edu.pk',
        role: UserRole.Admin,
        avatarUrl: 'https://picsum.photos/seed/admin/100/100'
    },
    [UserRole.Clerk]: {
        id: 'user_clerk_01',
        clerkId: 'clerk_clerk_01',
        name: 'School Clerk',
        email: 'clerk@snfc.edu.pk',
        role: UserRole.Clerk,
        avatarUrl: 'https://picsum.photos/seed/clerk/100/100'
    },
    [UserRole.Teacher]: {
        id: 'user_teacher_01',
        clerkId: 'clerk_teacher_01',
        name: 'Ms. Ayesha Khan',
        email: 'ayesha.khan@snfc.edu.pk',
        role: UserRole.Teacher,
        avatarUrl: 'https://picsum.photos/seed/teacher/100/100'
    },
    [UserRole.Student]: {
        id: 'user_student_01',
        clerkId: 'clerk_student_01',
        name: 'Ahmed Ali',
        email: 'ahmed.ali@snfc.edu.pk',
        role: UserRole.Student,
        avatarUrl: 'https://picsum.photos/seed/student/100/100'
    },
    [UserRole.Parent]: {
        id: 'user_parent_01',
        clerkId: 'clerk_parent_01',
        name: 'Mr. Raza Ali',
        email: 'raza.ali@parent.com',
        role: UserRole.Parent,
        avatarUrl: 'https://picsum.photos/seed/parent/100/100'
    }
};

const SESSION_STORAGE_KEY = 'snfc_user_role';

class ClerkService {
    async signIn(role: UserRole): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = MOCK_USERS[role];
                sessionStorage.setItem(SESSION_STORAGE_KEY, role);
                resolve(user);
            }, 500);
        });
    }

    signOut(): void {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }

    async checkSession(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const role = sessionStorage.getItem(SESSION_STORAGE_KEY) as UserRole;
                if (role && MOCK_USERS[role]) {
                    resolve(MOCK_USERS[role]);
                } else {
                    reject(null);
                }
            }, 300);
        });
    }
}

export const clerkService = new ClerkService();
