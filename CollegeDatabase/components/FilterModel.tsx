import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS, SPACING, COURSES, GRADES } from '../constants';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: any;
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<{
    course: string;
    grade: string;
    isActive: boolean | null;
  }>({
    course: '',
    grade: '',
    isActive: null,
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      course: '',
      grade: '',
      isActive: null,
    });
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

          <View style={styles.content}>
            <View style={styles.filterGroup}>
              <Text style={styles.label}>Course</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={localFilters.course}
                  onValueChange={(value) => setLocalFilters({ ...localFilters, course: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="All Courses" value="" />
                  {COURSES.map((course) => (
                    <Picker.Item key={course} label={course} value={course} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.label}>Grade</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={localFilters.grade}
                  onValueChange={(value) => setLocalFilters({ ...localFilters, grade: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="All Grades" value="" />
                  {GRADES.map((grade) => (
                    <Picker.Item key={grade} label={grade} value={grade} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.switchContainer}>
                <TouchableOpacity
                  style={[
                    styles.statusOption,
                    localFilters.isActive === null && styles.statusOptionActive,
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, isActive: null })}
                >
                  <Text style={[
                    styles.statusOptionText,
                    localFilters.isActive === null && styles.statusOptionTextActive,
                  ]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusOption,
                    localFilters.isActive === true && styles.statusOptionActive,
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, isActive: true })}
                >
                  <Text style={[
                    styles.statusOptionText,
                    localFilters.isActive === true && styles.statusOptionTextActive,
                  ]}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusOption,
                    localFilters.isActive === false && styles.statusOptionActive,
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, isActive: false })}
                >
                  <Text style={[
                    styles.statusOptionText,
                    localFilters.isActive === false && styles.statusOptionTextActive,
                  ]}>Inactive</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
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
    maxHeight: '70%',
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
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.text.secondary,
  },
  content: {
    padding: SPACING.lg,
  },
  filterGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
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
    marginBottom: SPACING.lg,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
  },
  statusOption: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  statusOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusOptionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  statusOptionTextActive: {
    color: COLORS.white,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resetButton: {
    flex: 1,
    marginRight: SPACING.sm,
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
    marginLeft: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default FilterModal;