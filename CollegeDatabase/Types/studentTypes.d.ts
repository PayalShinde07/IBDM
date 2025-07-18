// types/Student.ts
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface Student {
  _id?: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  course: string;
  phoneNumber: string;
  enrollmentNumber: number;
  address: Address;
  subjects: string[];
  cgpa: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export type Grade = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';

export const GRADES: Grade[] = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];