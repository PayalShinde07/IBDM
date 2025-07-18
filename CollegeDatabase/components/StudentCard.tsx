// components/StudentCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Student } from '../Types/studentTypes';
import { COLORS, FONTS, SPACING } from '../constants';
import { getFullName, getGradeColor, getStatusColor, getStatusText } from '../utils';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onPress,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const handleLongPress = () => {
    Alert.alert(
      'Student Actions',
      `Choose an action for ${getFullName(student)}`,
      [
        { text: 'View Details', onPress },
        { text: 'Edit', onPress: onEdit },
        {
          text: student.isActive ? 'Deactivate' : 'Activate',
          onPress: onToggleStatus,
        },
        { text: 'Delete', onPress: onDelete, style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{getFullName(student)}</Text>
          <Text style={styles.studentId}>ID: {student.studentId}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(student.isActive ?? true) },
            ]}
          >
            <Text style={styles.statusText}>
              {getStatusText(student.isActive ?? true)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Course:</Text>
          <Text style={styles.infoValue}>{student.course}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Grade:</Text>
          <View
            style={[
              styles.gradeBadge,
              { backgroundColor: getGradeColor(student.grade) },
            ]}
          >
            <Text style={styles.gradeText}>{student.grade}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>CGPA:</Text>
          <Text style={styles.infoValue}>{student.cgpa.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.emailText}>{student.email}</Text>
        <Text style={styles.enrollmentText}>
          Enrollment: {student.enrollmentNumber}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onEdit}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.statusButton]}
          onPress={onToggleStatus}
        >
          <Text style={styles.actionButtonText}>
            {student.isActive ? 'Deactivate' : 'Activate'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  studentId: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
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
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: '500',
  },
  cardBody: {
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  infoLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  emailText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  enrollmentText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
  },
  statusButton: {
    backgroundColor: COLORS.warning,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default StudentCard;