// components/FilterModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { COLORS, FONTS, SPACING, COURSES, GRADES } from '../constants';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    course?: string;
    grade?: string;
    isActive?: boolean;
  };
  onApplyFilters: (filters: {
    course?: string;
    grade?: string;
    isActive?: boolean;
  }) => void;
  onResetFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [selectedCourse, setSelectedCourse] = useState(filters.course || '');
  const [selectedGrade, setSelectedGrade] = useState(filters.grade || '');
  const [isActiveFilter, setIsActiveFilter] = useState(filters.isActive);

  const handleApply = () => {
    const newFilters: any = {};
    if (selectedCourse) newFilters.course = selectedCourse;
    if (selectedGrade) newFilters.grade = selectedGrade;
    if (isActiveFilter !== undefined) newFilters.isActive = isActiveFilter;
    
    onApplyFilters(newFilters);
    onClose();
  };

  const handleReset = () => {
    setSelectedCourse('');
    setSelectedGrade('');
    setIsActiveFilter(undefined);
    onResetFilters();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Students</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Course Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Course</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedCourse === '' && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedCourse('')}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCourse === '' && styles.selectedOptionText,
                    ]}
                  >
                    All Courses
                  </Text>
                </TouchableOpacity>
                {COURSES.map((course) => (
                  <TouchableOpacity
                    key={course}
                    style={[
                      styles.option,
                      selectedCourse === course && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedCourse === course && styles.selectedOptionText,
                      ]}
                    >
                      {course}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Grade Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Grade</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedGrade === '' && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedGrade('')}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedGrade === '' && styles.selectedOptionText,
                    ]}
                  >
                    All Grades
                  </Text>
                </TouchableOpacity>
                {GRADES.map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.option,
                      selectedGrade === grade && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedGrade(grade)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedGrade === grade && styles.selectedOptionText,
                      ]}
                    >
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Status Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.switchContainer}>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Active Only</Text>
                  <Switch
                    value={isActiveFilter === true}
                    onValueChange={(value) => setIsActiveFilter(value ? true : undefined)}
                    trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
                    thumbColor={COLORS.white}
                  />
                </View>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Inactive Only</Text>
                  <Switch
                    value={isActiveFilter === false}
                    onValueChange={(value) => setIsActiveFilter(value ? false : undefined)}
                    trackColor={{ false: COLORS.gray[300], true: COLORS.error }}
                    thumbColor={COLORS.white}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
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
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.bold,
    color: COLORS.text.primary,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.gray[500],
    fontWeight: '300',
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: SPACING.sm, // React Native does not support 'gap'
  },
  option: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  switchContainer: {
    // gap: SPACING.md, // React Native does not support 'gap'
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  switchLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    gap: SPACING.md,
  },
  resetButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
  },
});

export default FilterModal;