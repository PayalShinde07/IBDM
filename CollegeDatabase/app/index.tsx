import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  Switch, 
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';

// Match the MyStudent interface from your backend
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

export default function App() {
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

  const handleChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      // Handle nested address fields
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
    // Split by comma and trim whitespace
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
    // Enhanced validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.studentId.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Age validation
    if (formData.age > 150 || formData.age < 1) {
      Alert.alert('Error', 'Please enter a valid age between 1 and 150');
      return;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Phone validation
    if (!validatePhone(formData.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    // CGPA validation
    if (formData.cgpa < 0 || formData.cgpa > 10) {
      Alert.alert('Error', 'CGPA must be between 0 and 10');
      return;
    }

    // Enrollment number validation
    if (formData.enrollmentNumber <= 0) {
      Alert.alert('Error', 'Please enter a valid enrollment number');
      return;
    }

    try {
      console.log('Sending data:', formData);
      
      // Use your computer's IP address instead of localhost
      // For Android emulator: use 10.0.2.2
      // For iOS simulator: use localhost or 127.0.0.1
      // For physical device: use your computer's IP address (e.g., 192.168.1.100)
      
      const BASE_URL = Platform.OS === 'android' 
        ? 'http://10.0.2.2:5000' 
        : 'http://localhost:5000';
      
      const response = await fetch(`${BASE_URL}/api/students/createStudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        console.log('Non-JSON response:', textData);
        throw new Error('Server returned non-JSON response');
      }

      console.log('Response data:', data);

      if (response.ok) {
        Alert.alert('Success', 'Student created successfully!');
        // Reset form after successful submission
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
      } else {
        const errorMessage = data.error || data.message || `Server error: ${response.status}`;
        Alert.alert('Error', errorMessage);
      }
    } catch (error: unknown) {
      console.error('Error details:', error);
      
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        Alert.alert('Network Error', 'Cannot connect to server. Please check if the server is running on http://localhost:5000');
      } else if (error instanceof SyntaxError) {
        Alert.alert('Error', 'Invalid server response format');
      } else if (error instanceof Error) {
        Alert.alert('Error', `Network or server error: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
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
            placeholder="Enter grade (e.g., A, B+, 10th)"
            value={formData.grade}
            onChangeText={(text) => handleChange('grade', text)}
            maxLength={10}
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
            maxLength={10}
          />

          <Text style={styles.label}>CGPA *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CGPA (0-10)"
            keyboardType="decimal-pad"
            value={formData.cgpa === 0 ? '' : formData.cgpa.toString()}
            onChangeText={(text) => handleChange('cgpa', text)}
            maxLength={4}
          />

          <Text style={styles.label}>Subjects (comma-separated)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Math, Science, English"
            value={formData.subjects.join(', ')}
            onChangeText={handleSubjectsChange}
            maxLength={200}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          
          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter street address"
            value={formData.address.street}
            onChangeText={(text) => handleChange('address.street', text)}
            maxLength={100}
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

          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter zip code"
            value={formData.address.zipCode}
            onChangeText={(text) => handleChange('address.zipCode', text)}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Is Active</Text>
          <Switch
            value={formData.isActive}
            onValueChange={(value) => handleChange('isActive', value)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={formData.isActive ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Create Student" 
            onPress={handleSubmit}
            color="#2196F3"
          />
        </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2196F3',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    paddingBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 15,
    color: '#333',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});