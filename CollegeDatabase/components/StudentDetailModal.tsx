import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Student } from '../Types/studentTypes';
import { COLORS, FONTS, SPACING } from '../constants';
import { getFullName, getGradeColor, getStatusColor, getStatusText } from '../utils';

interface StudentDetailModalProps {
  visible: boolean;
  onClose: () => void;
  student: Student | null;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  visible,
  onClose,
  student,
}) => {
  if (!student) return null;

  const DetailRow = ({ label, value, isStatus = false, isGrade = false }: {
    label: string;
    value: string;
    isStatus?: boolean;
    isGrade?: boolean;
  }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      {isStatus ? (
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(student.isActive ?? true) }]}>
          <Text style={styles.statusText}>{getStatusText(student.isActive ?? true)}</Text>
        </View>
      ) : isGrade ? (
        <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(student.grade) }]}>
          <Text style={styles.gradeText}>{student.grade}</Text>
        </View>
      ) : (
        <Text style={styles.detailValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Student Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.profileSection}>
              <View style={styles.nameContainer}>
                <Text style={styles.studentName}>{getFullName(student)}</Text>
                <Text style={styles.studentId}>ID: {student.studentId}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <DetailRow label="Email" value={student.email} />
              <DetailRow label="Course" value={student.course} />
              <DetailRow label="Grade" value={student.grade} isGrade />
              <DetailRow label="CGPA" value={student.cgpa.toFixed(2)} />
              <DetailRow label="Enrollment Number" value={student.enrollmentNumber.toString()} />
              <DetailRow label="Status" value={getStatusText(student.isActive ?? true)} isStatus />
            </View>

            <View style={styles.metaSection}>
              <Text style={styles.metaTitle}>Additional Information</Text>
              <DetailRow 
                label="Created At" 
                value={new Date(student.createdAt ?? '').toLocaleDateString()} 
              />
              <DetailRow 
                label="Updated At" 
                value={new Date(student.updatedAt ?? '').toLocaleDateString()} 
              />
            </View>
          </ScrollView>
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
    fontWeight: "bold",
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
  profileSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  nameContainer: {
    alignItems: 'center',
  },
  studentName: {
    fontSize: FONTS.sizes.xxl,
     fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  studentId: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  detailsSection: {
    marginBottom: SPACING.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  detailLabel: {
    fontSize: FONTS.sizes.md,
     fontWeight: "bold",
    color: COLORS.text.primary,
  },
  detailValue: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
     fontWeight: "bold",
  },
  gradeBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
     fontWeight: "bold",
  },
  metaSection: {
    marginBottom: SPACING.lg,
  },
  metaTitle: {
    fontSize: FONTS.sizes.lg,
   fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
});

export default StudentDetailModal;