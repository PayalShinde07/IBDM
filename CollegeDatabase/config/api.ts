// config/api.ts
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000', 
  TIMEOUT: 10000,
  
  // API Endpoints
  ENDPOINTS: {
    // Auth endpoints
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    REFRESH_TOKEN: '/api/auth/refresh',
    
    // Student endpoints
    GET_ALL_STUDENTS: '/api/students/getAllStudents',
    GET_STUDENT_BY_ID: '/api/students/getStudentById',
    CREATE_STUDENT: '/api/students/createStudent',
    UPDATE_STUDENT: '/api/students/updateStudent',
    DELETE_STUDENT: '/api/students/deleteStudent',
    
    // User endpoints
    GET_USER_PROFILE: '/api/users/profile',
    //UPDATE_USER_PROFILE: '/api/users/updateProfile',
  }
};