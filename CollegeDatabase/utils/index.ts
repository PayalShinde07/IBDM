// utils/index.ts
import { Student, Grade } from '../Types/studentTypes';
import { VALIDATION } from '../constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.email.pattern.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.phone.pattern.test(phone);
};

export const validateStudentId = (studentId: string): boolean => {
  return VALIDATION.studentId.pattern.test(studentId) && 
         studentId.length >= VALIDATION.studentId.minLength &&
         studentId.length <= VALIDATION.studentId.maxLength;
};

export const validateName = (name: string): boolean => {
  return VALIDATION.name.pattern.test(name) && 
         name.length >= VALIDATION.name.minLength &&
         name.length <= VALIDATION.name.maxLength;
};

export const validateAge = (age: string): boolean => {
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge >= VALIDATION.age.min && numAge <= VALIDATION.age.max;
};

export const validateCGPA = (cgpa: number): boolean => {
  return cgpa >= VALIDATION.cgpa.min && cgpa <= VALIDATION.cgpa.max;
};

export const validateCourse = (course: string): boolean => {
  return course.length >= VALIDATION.course.minLength && 
         course.length <= VALIDATION.course.maxLength;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getGradeColor = (grade: Grade): string => {
  switch (grade) {
    case 'A+':
    case 'A':
      return '#10b981'; // green
    case 'B+':
    case 'B':
      return '#3b82f6'; // blue
    case 'C+':
    case 'C':
      return '#f59e0b'; // yellow
    case 'D':
      return '#f97316'; // orange
    case 'F':
      return '#ef4444'; // red
    default:
      return '#64748b'; // gray
  }
};

export const getStatusColor = (isActive: boolean): string => {
  return isActive ? '#10b981' : '#ef4444';
};

export const getStatusText = (isActive: boolean): string => {
  return isActive ? 'Active' : 'Inactive';
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFullName = (student: Student): string => {
  return `${student.firstName} ${student.lastName}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateStudentId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `STU${timestamp}${random}`;
};

export const generateEnrollmentNumber = (): number => {
  return Math.floor(Math.random() * 900000) + 100000;
};

export const searchStudents = (students: Student[], query: string): Student[] => {
  const lowercaseQuery = query.toLowerCase();
  return students.filter(student => 
    student.firstName.toLowerCase().includes(lowercaseQuery) ||
    student.lastName.toLowerCase().includes(lowercaseQuery) ||
    student.email.toLowerCase().includes(lowercaseQuery) ||
    student.studentId.toLowerCase().includes(lowercaseQuery) ||
    student.course.toLowerCase().includes(lowercaseQuery) ||
    student.grade.toLowerCase().includes(lowercaseQuery)
  );
};

export const sortStudents = (students: Student[], sortBy: keyof Student, order: 'asc' | 'desc' = 'asc'): Student[] => {
  return [...students].sort((a, b) => {
    const aValue = a[sortBy] ?? '';
    const bValue = b[sortBy] ?? '';
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterStudents = (students: Student[], filters: {
  course?: string;
  grade?: string;
  isActive?: boolean;
}): Student[] => {
  return students.filter(student => {
    if (filters.course && student.course !== filters.course) return false;
    if (filters.grade && student.grade !== filters.grade) return false;
    if (filters.isActive !== undefined && student.isActive !== filters.isActive) return false;
    return true;
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay) as unknown as NodeJS.Timeout;
  };
};

export const isValidStudent = (student: Partial<Student>): boolean => {
  return !!(
    student.studentId &&
    student.firstName &&
    student.lastName &&
    student.email &&
    student.age &&
    student.grade &&
    student.course &&
    student.phoneNumber &&
    student.enrollmentNumber &&
    student.address &&
    student.subjects &&
    student.subjects.length > 0 &&
    student.cgpa !== undefined
  );
};

export const getValidationErrors = (student: Partial<Student>): string[] => {
  const errors: string[] = [];
  
  if (!student.studentId) errors.push('Student ID is required');
  else if (!validateStudentId(student.studentId)) errors.push('Invalid Student ID format');
  
  if (!student.firstName) errors.push('First name is required');
  else if (!validateName(student.firstName)) errors.push('Invalid first name format');
  
  if (!student.lastName) errors.push('Last name is required');
  else if (!validateName(student.lastName)) errors.push('Invalid last name format');
  
  if (!student.email) errors.push('Email is required');
  else if (!validateEmail(student.email)) errors.push('Invalid email format');
  
  if (!student.age) errors.push('Age is required');
  else if (!validateAge(student.age)) errors.push('Invalid age');
  
  if (!student.grade) errors.push('Grade is required');
  
  if (!student.course) errors.push('Course is required');
  else if (!validateCourse(student.course)) errors.push('Invalid course name');
  
  if (!student.phoneNumber) errors.push('Phone number is required');
  else if (!validatePhone(student.phoneNumber)) errors.push('Invalid phone number format');
  
  if (!student.enrollmentNumber) errors.push('Enrollment number is required');
  
  if (!student.address) errors.push('Address is required');
  
  if (!student.subjects || student.subjects.length === 0) errors.push('At least one subject is required');
  
  if (student.cgpa === undefined) errors.push('CGPA is required');
  else if (!validateCGPA(Number(student.cgpa))) errors.push('Invalid CGPA');
  
  return errors;
};