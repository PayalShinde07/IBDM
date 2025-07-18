// services/api.ts
import { Student, ApiResponse, PaginatedResponse } from '../Types/studentTypes';

const API_BASE_URL = 'http://192.168.106.175:3000/api/students';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Create a new student
  async createStudent(student: Omit<Student, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>('/', {
      method: 'POST',
      body: JSON.stringify(student),
    });
  }

  // Get all students with optional filters and pagination
  async getAllStudents(params?: {
    course?: string;
    grade?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Student>> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = searchParams.toString() ? `/?${searchParams.toString()}` : '/';
    return this.request<PaginatedResponse<Student>>(endpoint);
  }

  // Get student by MongoDB ID
  async getStudentById(id: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/${id}`);
  }

  // Get student by custom student ID
  async getStudentByStudentId(studentId: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/student-id/${studentId}`);
  }

  // Update student
  async updateStudent(id: string, student: Partial<Student>): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student),
    });
  }

  // Delete student (hard delete)
  async deleteStudent(id: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/${id}`, {
      method: 'DELETE',
    });
  }

  // Soft delete student (deactivate)
  async deactivateStudent(id: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/${id}/deactivate`, {
      method: 'PATCH',
    });
  }

  // Restore student (activate)
  async restoreStudent(id: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/${id}/restore`, {
      method: 'PATCH',
    });
  }

  // Search students
  async searchStudents(params: {
    query: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Student>> {
    const searchParams = new URLSearchParams();
    searchParams.append('query', params.query);
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    
    return this.request<PaginatedResponse<Student>>(`/search?${searchParams.toString()}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch('http://192.168.106.175:3000/health');
    return response.json();
  }
}

export const apiService = new ApiService();
export default apiService;