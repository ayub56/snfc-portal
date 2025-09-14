import { Student, Teacher, Fee, Attendance, Result, Notice, TimetableEntry, Assignment, Class } from '../types';

let MOCK_STUDENTS: Student[] = [
    { id: 'stud_01', userId: 'user_student_01', admissionNo: 'SNFC-1234', classId: 'cls_10A', className: 'Class 10', section: 'A', parentId: 'user_parent_01', name: 'Ahmed Ali', avatarUrl: 'https://picsum.photos/seed/student1/100/100' },
    { id: 'stud_02', userId: 'user_student_02', admissionNo: 'SNFC-1235', classId: 'cls_10A', className: 'Class 10', section: 'A', parentId: 'user_parent_02', name: 'Fatima Khan', avatarUrl: 'https://picsum.photos/seed/student2/100/100' },
];

let MOCK_TEACHERS: Teacher[] = [
    { id: 'teach_01', userId: 'user_teacher_01', subjectId: 'subj_math', subjectName: 'Mathematics', classId: 'cls_10A', className: 'Class 10', name: 'Ms. Ayesha Khan', avatarUrl: 'https://picsum.photos/seed/teacher1/100/100' },
    { id: 'teach_02', userId: 'user_teacher_02', subjectId: 'subj_phy', subjectName: 'Physics', classId: 'cls_9B', className: 'Class 9', name: 'Mr. Usman Ali', avatarUrl: 'https://picsum.photos/seed/teacher2/100/100' },
];

let MOCK_FEES: Fee[] = [
    { id: 'fee_01', studentId: 'user_student_01', studentName: 'Ahmed Ali', amount: 5000, status: 'Unpaid', dueDate: '2024-08-10' },
    { id: 'fee_02', studentId: 'user_student_02', studentName: 'Fatima Khan', amount: 5000, status: 'Overdue', dueDate: '2024-07-10', paidDate: undefined },
    { id: 'fee_03', studentId: 'user_student_03', studentName: 'Zainab Ahmed', amount: 5000, status: 'Paid', dueDate: '2024-08-10', paidDate: '2024-08-02' },
];

const MOCK_ATTENDANCE: Attendance[] = [
    { id: 'att_01', studentId: 'user_student_01', date: '2024-08-05', status: 'Present' },
    { id: 'att_02', studentId: 'user_student_01', date: '2024-08-04', status: 'Absent' },
];

const MOCK_RESULTS: Result[] = [
    { id: 'res_01', studentId: 'user_student_01', examId: 'exam_mid', examName: 'Mid-Term', subjectName: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
];

const MOCK_NOTICES: Notice[] = [
    { id: 'not_01', title: 'Parent-Teacher Meeting', description: 'A PTM is scheduled for this Saturday.', date: '2024-08-12', postedBy: 'Admin' },
];

const MOCK_TIMETABLE: TimetableEntry[] = [
    { day: 'Monday', period: 1, subject: 'Mathematics', teacher: 'Ms. Ayesha Khan', time: '08:00-08:45' },
    { day: 'Monday', period: 2, subject: 'Physics', teacher: 'Mr. Usman', time: '08:45-09:30' },
];

const MOCK_ASSIGNMENTS: Assignment[] = [
    { id: 'ass_01', subject: 'Mathematics', title: 'Algebra Chapter 5', description: 'Solve all questions from exercise 5.1.', dueDate: '2024-08-15', submitted: false },
    { id: 'ass_02', subject: 'Physics', title: 'Laws of Motion', description: 'Write a detailed note on Newton\'s laws.', dueDate: '2024-08-12', submitted: true },
];

let MOCK_CLASSES: Class[] = [
    { id: 'cls_1', name: 'Class 6', section: 'A', teacherName: 'Mr. Ahmed' },
    { id: 'cls_2', name: 'Class 7', section: 'B', teacherName: 'Ms. Fatima' },
    { id: 'cls_3', name: 'Class 8', section: 'A', teacherName: 'Mr. Khan' },
];


class SupabaseService {
    private simulate = <T>(data: T, delay = 300): Promise<T> => 
        new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay));

    getStudents = () => this.simulate(MOCK_STUDENTS);
    getTeachers = () => this.simulate(MOCK_TEACHERS);
    getFees = () => this.simulate(MOCK_FEES);
    getAttendanceForStudent = (studentId: string) => this.simulate(MOCK_ATTENDANCE.filter(a => a.studentId === studentId));
    getResultsForStudent = (studentId: string) => this.simulate(MOCK_RESULTS.filter(r => r.studentId === studentId));
    getNotices = () => this.simulate(MOCK_NOTICES);
    getTimetableForStudent = (studentId: string) => this.simulate(MOCK_TIMETABLE);
    getAssignmentsForStudent = (studentId: string) => this.simulate(MOCK_ASSIGNMENTS);
    
    // Student CRUD
    addStudent = (newStudent: Omit<Student, 'id' | 'userId' | 'classId' | 'avatarUrl'>): Promise<Student> => {
        const studentToAdd: Student = {
            ...newStudent,
            id: `stud_${Date.now()}`,
            userId: `user_stud_${Date.now()}`,
            classId: `cls_${newStudent.className.replace(' ', '')}`,
            avatarUrl: `https://picsum.photos/seed/student${Date.now()}/100/100`,
        };
        MOCK_STUDENTS.push(studentToAdd);
        return this.simulate(studentToAdd);
    };
    
    updateStudent = (updatedStudent: Student): Promise<Student> => {
        MOCK_STUDENTS = MOCK_STUDENTS.map(stud => stud.id === updatedStudent.id ? updatedStudent : stud);
        return this.simulate(updatedStudent);
    };

    deleteStudent = (studentId: string): Promise<{ success: boolean }> => {
        MOCK_STUDENTS = MOCK_STUDENTS.filter(stud => stud.id !== studentId);
        return this.simulate({ success: true });
    };

    // Teacher CRUD
    addTeacher = (newTeacher: Omit<Teacher, 'id' | 'userId' | 'subjectId' | 'classId' | 'avatarUrl'>): Promise<Teacher> => {
        const teacherToAdd: Teacher = {
            ...newTeacher,
            id: `teach_${Date.now()}`,
            userId: `user_teach_${Date.now()}`,
            subjectId: `subj_${newTeacher.subjectName.toLowerCase().replace(/\s/g, '')}`,
            classId: `cls_${newTeacher.className.replace(/\s/g, '')}`,
            avatarUrl: `https://picsum.photos/seed/teacher${Date.now()}/100/100`,
        };
        MOCK_TEACHERS.push(teacherToAdd);
        return this.simulate(teacherToAdd);
    };

    updateTeacher = (updatedTeacher: Teacher): Promise<Teacher> => {
        MOCK_TEACHERS = MOCK_TEACHERS.map(teach => teach.id === updatedTeacher.id ? updatedTeacher : teach);
        return this.simulate(updatedTeacher);
    };

    deleteTeacher = (teacherId: string): Promise<{ success: boolean }> => {
        MOCK_TEACHERS = MOCK_TEACHERS.filter(teach => teach.id !== teacherId);
        return this.simulate({ success: true });
    };

    // Class CRUD
    getClasses = () => this.simulate(MOCK_CLASSES);
    
    addClass = (newClass: Omit<Class, 'id'>): Promise<Class> => {
        const classToAdd = { ...newClass, id: `cls_${Date.now()}` };
        MOCK_CLASSES.push(classToAdd);
        return this.simulate(classToAdd);
    };
    
    updateClass = (updatedClass: Class): Promise<Class> => {
        MOCK_CLASSES = MOCK_CLASSES.map(cls => cls.id === updatedClass.id ? updatedClass : cls);
        return this.simulate(updatedClass);
    };

    deleteClass = (classId: string): Promise<{ success: boolean }> => {
        MOCK_CLASSES = MOCK_CLASSES.filter(cls => cls.id !== classId);
        return this.simulate({ success: true });
    };

    // Fee CRUD
    updateFeeStatus = (feeId: string, status: 'Paid'): Promise<Fee> => {
        let updatedFee: Fee | undefined;
        MOCK_FEES = MOCK_FEES.map(fee => {
            if (fee.id === feeId) {
                updatedFee = {
                    ...fee,
                    status,
                    paidDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
                };
                return updatedFee;
            }
            return fee;
        });
        if (!updatedFee) {
            return Promise.reject(new Error('Fee not found'));
        }
        return this.simulate(updatedFee);
    };
}

export const supabaseService = new SupabaseService();