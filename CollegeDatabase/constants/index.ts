// constants/index.ts
import { Grade } from '../Types/studentTypes';

export const COLORS = {
  primary: '#3b82f6',
  primaryDark: '#2563eb',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  background: '#f8fafc',
  surface: '#ffffff',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
  },
  border: '#e2e8f0',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const GRADES: Grade[] = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

export const COURSES = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
];

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Political Science',
  'Psychology',
  'Sociology',
  'Philosophy',
  'Literature',
  'Data Structures',
  'Algorithms',
  'Database Systems',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering',
  'Web Development',
  'Mobile Development',
  'Machine Learning',
  'Artificial Intelligence',
];

export const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 100,
};

export const VALIDATION = {
  studentId: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[A-Z0-9]+$/,
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  },
  age: {
    min: 16,
    max: 100,
  },
  cgpa: {
    min: 0,
    max: 10,
  },
  course: {
    minLength: 2,
    maxLength: 100,
  },
};

export const SCREEN_NAMES = {
  HOME: 'Home',
  STUDENTS: 'Students',
  ADD_STUDENT: 'AddStudent',
  EDIT_STUDENT: 'EditStudent',
  STUDENT_DETAIL: 'StudentDetail',
  SEARCH: 'Search',
} as const;