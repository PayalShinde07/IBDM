import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { API_CONFIG } from '../../config/api';

interface Student {
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
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

interface StudentFormProps {
  user: User;
  token: string;
  onSuccess: () => void;
}

export default function StudentForm({ user, token, onSuccess }: StudentFormProps) {
  const [formData, setFormData] = useState<Student>({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    grade: '',
    course: '',
    phoneNumber: '',
    enrollmentNumber: 0,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    subjects: [],
    cgpa: 0.0,
    isActive: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev.address,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: field === 'age' || field === 'enrollmentNumber' 
          ? (value === '' ? 0 : Number(value))
          : field === 'cgpa'
            ? (value === '' ? 0.0 : parseFloat(value as string))
            : value,
      }));
    }
  };

  const handleSubjectsChange = (text: string) => {
    const subjects = text.split(',').map(subject => subject.trim()).filter(subject => subject !== '');
    setFormData(prev => ({
      ...prev,
      subjects: subjects
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.studentId.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.age > 150 || formData.age < 1) {
      Alert.alert('Error', 'Please enter a valid age between 1 and 150');
      return;
    }

    if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePhone(formData.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    if (formData.cgpa < 0 || formData.cgpa > 10) {
      Alert.alert('Error', 'CGPA must be between 0 and 10');
      return;
    }

    if (formData.enrollmentNumber <= 0) {
      Alert.alert('Error', 'Please enter a valid enrollment number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/students/createStudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Student created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                studentId: '',
                firstName: '',
                lastName: '',
                email: '',
                age: 0,
                grade: '',
                course: '',
                phoneNumber: '',
                enrollmentNumber: 0,
                address: {
                  street: '',
                  city: '',
                  state: '',
                  zipCode: ''
                },
                subjects: [],
                cgpa: 0.0,
                isActive: false
              });
              onSuccess();
            }
          }
        ]);
      } else {
        const errorMessage = data.message || `Server error: ${response.status}`;
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error creating student:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Add New Student</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <Text style={styles.label}>Student ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter student ID"
            value={formData.studentId}
            onChangeText={(text) => handleChange('studentId', text)}
            maxLength={50}
          />

          <Text style={styles.label}>First Name *</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter first name"
            value={formData.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
            maxLength={50}
          />

          <Text style={styles.label}>Last Name *</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter last name"
            value={formData.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
            maxLength={50}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter email address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={100}
          />

          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            keyboardType="numeric"
            value={formData.age === 0 ? '' : formData.age.toString()}
            onChangeText={(text) => handleChange('age', text)}
            maxLength={3}
          />

          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 10-digit phone number"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange('phoneNumber', text)}
            maxLength={10}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          
          <Text style={styles.label}>Grade *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter grade (e.g., 10th, 12th, 1st Year)"
            value={formData.grade}
            onChangeText={(text) => handleChange('grade', text)}
            maxLength={20}
          />

          <Text style={styles.label}>Course *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter course name"
            value={formData.course}
            onChangeText={(text) => handleChange('course', text)}
            maxLength={100}
          />

          <Text style={styles.label}>Enrollment Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter enrollment number"
            keyboardType="numeric"
            value={formData.enrollmentNumber === 0 ? '' : formData.enrollmentNumber.toString()}
            onChangeText={(text) => handleChange('enrollmentNumber', text)}
            maxLength={15}
          />

          <Text style={styles.label}>Subjects (comma-separated)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter subjects separated by commas"
            value={formData.subjects.join(', ')}
            onChangeText={handleSubjectsChange}
            multiline
            numberOfLines={3}
            maxLength={500}
          />

          <Text style={styles.label}>CGPA (0-10)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CGPA"
            keyboardType="decimal-pad"
            value={formData.cgpa === 0 ? '' : formData.cgpa.toString()}
            onChangeText={(text) => handleChange('cgpa', text)}
            maxLength={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter street address"
            value={formData.address.street}
            onChangeText={(text) => handleChange('address.street', text)}
            maxLength={200}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={formData.address.city}
            onChangeText={(text) => handleChange('address.city', text)}
            maxLength={50}
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter state"
            value={formData.address.state}
            onChangeText={(text) => handleChange('address.state', text)}
            maxLength={50}
          />

          <Text style={styles.label}>ZIP Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ZIP code"
            value={formData.address.zipCode}
            onChangeText={(text) => handleChange('address.zipCode', text)}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Active Status</Text>
            <Switch
              value={formData.isActive}
              onValueChange={(value) => handleChange('isActive', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={formData.isActive ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Create Student</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
    minHeight: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});