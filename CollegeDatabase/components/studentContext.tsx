// context/StudentContext.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Student, PaginatedResponse, ApiResponse } from '../Types/studentTypes';
import { apiService } from '../services/api';

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    course?: string;
    grade?: string;
    isActive?: boolean;
  };
  searchQuery: string;
  selectedStudent: Student | null;
}

type StudentAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_STUDENTS'; payload: PaginatedResponse<Student> }
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STUDENT'; payload: Student }
  | { type: 'DELETE_STUDENT'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<StudentState['filters']> }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_STUDENT'; payload: Student | null }
  | { type: 'RESET_FILTERS' };

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0,
    hasNext: false,
    hasPrev: false,
  },
  filters: {},
  searchQuery: '',
  selectedStudent: null,
};

const studentReducer = (state: StudentState, action: StudentAction): StudentState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload.data || [],
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [action.payload, ...state.students],
        pagination: {
          ...state.pagination,
          totalStudents: state.pagination.totalStudents + 1,
        },
      };
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student._id === action.payload._id ? action.payload : student
        ),
        selectedStudent: state.selectedStudent?._id === action.payload._id ? action.payload : state.selectedStudent,
      };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student._id !== action.payload),
        selectedStudent: state.selectedStudent?._id === action.payload ? null : state.selectedStudent,
        pagination: {
          ...state.pagination,
          totalStudents: state.pagination.totalStudents - 1,
        },
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_SELECTED_STUDENT':
      return {
        ...state,
        selectedStudent: action.payload,
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {},
        searchQuery: '',
      };
    default:
      return state;
  }
};

interface StudentContextType {
  state: StudentState;
  dispatch: React.Dispatch<StudentAction>;
  actions: {
    fetchStudents: (page?: number, limit?: number) => Promise<void>;
    searchStudents: (query: string, page?: number, limit?: number) => Promise<void>;
    createStudent: (student: Omit<Student, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateStudent: (id: string, student: Partial<Student>) => Promise<void>;
    deleteStudent: (id: string) => Promise<void>;
    deactivateStudent: (id: string) => Promise<void>;
    restoreStudent: (id: string) => Promise<void>;
    getStudentById: (id: string) => Promise<void>;
    getStudentByStudentId: (studentId: string) => Promise<void>;
    setFilters: (filters: Partial<StudentState['filters']>) => void;
    setSearchQuery: (query: string) => void;
    setSelectedStudent: (student: Student | null) => void;
    resetFilters: () => void;
  };
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudentContext = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  const actions = {
    fetchStudents: async (page: number = 1, limit: number = 10) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.getAllStudents({
          ...state.filters,
          page,
          limit,
        });
        dispatch({ type: 'SET_STUDENTS', payload: response });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    searchStudents: async (query: string, page: number = 1, limit: number = 10) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.searchStudents({ query, page, limit });
        dispatch({ type: 'SET_STUDENTS', payload: response });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    createStudent: async (student: Omit<Student, '_id' | 'createdAt' | 'updatedAt'>) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.createStudent(student);
        if (response.data) {
          dispatch({ type: 'ADD_STUDENT', payload: response.data });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    updateStudent: async (id: string, student: Partial<Student>) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.updateStudent(id, student);
        if (response.data) {
          dispatch({ type: 'UPDATE_STUDENT', payload: response.data });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    deleteStudent: async (id: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await apiService.deleteStudent(id);
        dispatch({ type: 'DELETE_STUDENT', payload: id });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    deactivateStudent: async (id: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.deactivateStudent(id);
        if (response.data) {
          dispatch({ type: 'UPDATE_STUDENT', payload: response.data });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    restoreStudent: async (id: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.restoreStudent(id);
        if (response.data) {
          dispatch({ type: 'UPDATE_STUDENT', payload: response.data });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    getStudentById: async (id: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.getStudentById(id);
        if (response.data) {
          dispatch({ type: 'SET_SELECTED_STUDENT', payload: response.data });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    getStudentByStudentId: async (studentId: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await apiService.getStudentByStudentId(studentId);
        if (response.data) {
          dispatch({ type: 'SET_SELECTED_STUDENT', payload: response.data });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    },

    setFilters: (filters: Partial<StudentState['filters']>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    setSearchQuery: (query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    },

    setSelectedStudent: (student: Student | null) => {
      dispatch({ type: 'SET_SELECTED_STUDENT', payload: student });
    },

    resetFilters: () => {
      dispatch({ type: 'RESET_FILTERS' });
    },
  };

  // Initial fetch
  useEffect(() => {
    actions.fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StudentContext.Provider>
  );
};