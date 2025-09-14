
export enum UserRole {
    Admin = 'admin',
    Clerk = 'clerk',
    Teacher = 'teacher',
    Student = 'student',
    Parent = 'parent'
}

export interface User {
    id: string;
    clerkId: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl: string;
}

export interface Student {
    id: string;
    userId: string;
    admissionNo: string;
    classId: string;
    className: string;
    section: string;
    parentId: string;
    name: string;
    avatarUrl: string;
}

export interface Teacher {
    id: string;
    userId: string;
    subjectId: string;
    subjectName: string;
    classId: string;
    className: string;
    name: string;
    avatarUrl: string;
}

export interface Fee {
    id: string;
    studentId: string;
    studentName: string;
    amount: number;
    status: 'Paid' | 'Unpaid' | 'Overdue';
    dueDate: string;
    paidDate?: string;
}

export interface Attendance {
    id: string;
    studentId: string;
    date: string;
    status: 'Present' | 'Absent' | 'Leave';
}

export interface Result {
    id: string;
    studentId: string;
    examId: string;
    examName: string;
    subjectName: string;
    marks: number;
    totalMarks: number;
    grade: string;
}

export interface Notice {
    id: string;
    title: string;
    description: string;
    date: string;
    postedBy: string;
}

export interface TimetableEntry {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
    period: number;
    subject: string;
    teacher: string;
    time: string;
}

export interface Assignment {
    id: string;
    subject: string;
    title: string;
    description: string;
    dueDate: string;
    submitted: boolean;
}

export interface Class {
    id: string;
    name: string;
    section: string;
    teacherName: string;
}
