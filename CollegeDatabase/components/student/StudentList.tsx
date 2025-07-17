import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { API_CONFIG } from '../../config/api';

interface Student {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  grade: string;
  course: string;
  phoneNumber: string;
  enrollmentNumber: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  subjects: string[];
  cgpa: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

interface StudentListProps {
  user: User;
  token: string;
}

export default function StudentList({ user, token }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/students/getAllStudents`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStudents(data.data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const filterStudents = () => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
      return;
    }

    const filtered = students.filter(student =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredStudents(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStudents();
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (user.role !== 'admin') {
      Alert.alert('Error', 'You do not have permission to delete students');
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this student?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_CONFIG.BASE_URL}/api/students/deleteStudent/${studentId}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();

              if (response.ok && data.success) {
                Alert.alert('Success', 'Student deleted successfully');
                fetchStudents();
              } else {
                Alert.alert('Error', data.message || 'Failed to delete student');
              }
            } catch (error) {
              console.error('Error deleting student:', error);
              Alert.alert('Error', 'Network error. Please try again.');
            }
          },
        },
      ]
    );
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => setSelectedStudent(selectedStudent?._id === item._id ? null : item)}
    >
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.studentId}>ID: {item.studentId}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: item.isActive ? '#4CAF50' : '#f44336' }]}>
            <Text style={styles.statusText}>{item.isActive ? 'Active' : 'Inactive'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.studentDetails}>
        <Text style={styles.detailText}>Course: {item.course}</Text>
        <Text style={styles.detailText}>Grade: {item.grade}</Text>
        <Text style={styles.detailText}>CGPA: {item.cgpa}</Text>
      </View>

      {selectedStudent?._id === item._id && (
        <View style={styles.expandedDetails}>
          <Text style={styles.detailText}>Email: {item.email}</Text>
          <Text style={styles.detailText}>Phone: {item.phoneNumber}</Text>
          <Text style={styles.detailText}>Age: {item.age}</Text>
          <Text style={styles.detailText}>Enrollment: {item.enrollmentNumber}</Text>
          <Text style={styles.detailText}>
            Address: {item.address.street}, {item.address.city}, {item.address.state} {item.address.zipCode}
          </Text>
          <Text style={styles.detailText}>Subjects: {item.subjects.join(', ')}</Text>
          
          {user.role === 'admin' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteStudent(item._id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading students...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <Text style={styles.subtitle}>Total: {filteredStudents.length}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#2196F3']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  listContainer: {
    padding: 20,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  studentId: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  studentDetails: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  expandedDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});