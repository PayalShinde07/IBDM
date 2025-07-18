import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStudentContext } from './studentContext';
import { Student } from '../Types/studentTypes';
import { COLORS, FONTS, SPACING, COURSES, GRADES } from '../constants';
import { validateEmail, validateCGPA } from '../utils';

interface AddStudentModalProps {
  visible: boolean;
  onClose: () => void;
  student?: Student | null;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  visible,
  onClose,
  student,
}) => {
  const { actions } = useStudentContext();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    course: COURSES[0],
    grade: GRADES[0],
    cgpa: '',
    enrollmentNumber: '',
    isActive: true,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        course: student.course,
        grade: student.grade,
        cgpa: student.cgpa.toString(),
        enrollmentNumber: student.enrollmentNumber.toString(),
        isActive: student.isActive ?? true,
      });
    } else {
      setFormData({
        studentId: '',
        firstName: '',
        lastName: '',
        email: '',
        course: COURSES[0],
        grade: GRADES[0],
        cgpa: '',
        enrollmentNumber: '',
        isActive: true,
      });
    }
  }, [student]);

  const handleSubmit = async () => {
    if (!formData.firstName.trim()) {
      Alert.alert('Error', 'First name is required');
      return;
    }

    if (!formData.lastName.trim()) {
      Alert.alert('Error', 'Last name is required');
      return;
    }

    if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const cgpaValue = parseFloat(formData.cgpa);
    if (isNaN(cgpaValue) || !validateCGPA(cgpaValue)) {
      Alert.alert('Error', 'CGPA must be a number between 0 and 4.0');
      return;
    }

    if (!formData.enrollmentNumber.trim()) {
      Alert.alert('Error', 'Enrollment number is required');
      return;
    }

    if (!formData.studentId.trim()) {
      Alert.alert('Error', 'Student ID is required');
      return;
    }

    try {
      const studentData = {
        ...formData,
        cgpa: cgpaValue,
        enrollmentNumber: Number(formData.enrollmentNumber),
        address: student?.address ?? { street: '', city: '', state: '', zip: '' }, // Provide default Address
        age: student?.age ? String(student.age) : '18',
        phoneNumber: student?.phoneNumber ?? '',
        subjects: student?.subjects ?? [],
      };

      if (student) {
        await actions.updateStudent(student._id!, studentData);
      } else {
        await actions.createStudent(studentData);
      }

      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save student');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {student ? 'Edit Student' : 'Add New Student'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student ID</Text>
              <TextInput
                style={styles.input}
                value={formData.studentId}
                onChangeText={(text) => setFormData({ ...formData, studentId: text })}
                placeholder="Enter student ID"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                  placeholder="Enter first name"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                  placeholder="Enter last name"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Course</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.course}
                  onValueChange={(value) => setFormData({ ...formData, course: value })}
                  style={styles.picker}
                >
                  {COURSES.map((course) => (
                    <Picker.Item key={course} label={course} value={course} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Grade</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.grade}
                    onValueChange={(value) => setFormData({ ...formData, grade: value })}
                    style={styles.picker}
                  >
                    {GRADES.map((grade) => (
                      <Picker.Item key={grade} label={grade} value={grade} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>CGPA</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cgpa}
                  onChangeText={(text) => setFormData({ ...formData, cgpa: text })}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enrollment Number</Text>
              <TextInput
                style={styles.input}
                value={formData.enrollmentNumber}
                onChangeText={(text) => setFormData({ ...formData, enrollmentNumber: text })}
                placeholder="Enter enrollment number"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.label}>Active Status</Text>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => setFormData({ ...formData, isActive: value })}
                trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {student ? 'Update' : 'Add'} Student
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.text.secondary,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  picker: {
    height: 44,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    flex: 1,
    marginRight: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    marginLeft: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default AddStudentModal;
