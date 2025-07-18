// screens/StudentListScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useStudentContext } from '../components/studentContext';
import { Student } from '../Types/studentTypes';
import { COLORS, FONTS, SPACING } from '../constants';
import { getFullName, getGradeColor, getStatusColor, getStatusText } from '../utils';
import SearchBar from '../components/SearchBar';
import StudentCard from '../components/StudentCard';
import FilterModal from '../components/FilterModel';
import AddStudentModal from '../components/AddStudentModel';
import EditStudentModal from '../components/EditStudentModel';
import StudentDetailModal from '../components/StudentDetailModal';

const StudentListScreen: React.FC = () => {
  const { state, actions } = useStudentContext();
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (state.searchQuery) {
      actions.searchStudents(state.searchQuery);
    } else {
      actions.fetchStudents();
    }
  }, [state.filters, state.searchQuery]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (state.searchQuery) {
        await actions.searchStudents(state.searchQuery);
      } else {
        await actions.fetchStudents();
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteStudent = (student: Student) => {
    Alert.alert(
      'Delete Student',
      `Are you sure you want to delete ${getFullName(student)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => actions.deleteStudent(student._id!),
        },
      ]
    );
  };

  const handleToggleStatus = (student: Student) => {
    const action = student.isActive ? 'deactivate' : 'activate';
    Alert.alert(
      `${action.charAt(0).toUpperCase() + action.slice(1)} Student`,
      `Are you sure you want to ${action} ${getFullName(student)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action.charAt(0).toUpperCase() + action.slice(1),
          onPress: () => {
            if (student.isActive) {
              actions.deactivateStudent(student._id!);
            } else {
              actions.restoreStudent(student._id!);
            }
          },
        },
      ]
    );
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {state.searchQuery ? 'No students found matching your search' : 'No students found'}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.addButtonText}>Add First Student</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <SearchBar
        value={state.searchQuery}
        onChangeText={actions.setSearchQuery}
        placeholder="Search students..."
      />
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total: {state.pagination.totalStudents} students
        </Text>
      </View>
    </View>
  );

  if (state.loading && state.students.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading students...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={state.students}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onPress={() => handleViewStudent(item)}
            onEdit={() => handleEditStudent(item)}
            onDelete={() => handleDeleteStudent(item)}
            onToggleStatus={() => handleToggleStatus(item)}
          />
        )}
        keyExtractor={(item) => item._id || item.studentId}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={state.filters}
        onApplyFilters={actions.setFilters}
        onResetFilters={actions.resetFilters}
      />

      <AddStudentModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {selectedStudent && (
        <>
          <EditStudentModal
            visible={showEditModal}
            onClose={() => {
              setShowEditModal(false);
                setSelectedStudent(null);
              }}
              student={selectedStudent}
              onSubmit={(updatedStudent: Student) => {
                actions.updateStudent(selectedStudent._id!, updatedStudent);
                setShowEditModal(false);
                setSelectedStudent(null);
              }}
              />

          <StudentDetailModal
            visible={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedStudent(null);
            }}
            student={selectedStudent}
            onDelete={() => {
              handleDeleteStudent(selectedStudent);
              setShowDetailModal(false);
              setSelectedStudent(null);
            }}
            onToggleStatus={() => {
              handleToggleStatus(selectedStudent);
              setShowDetailModal(false);
              setSelectedStudent(null);
            }}
          />
        </>
      )}

      {state.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{state.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  filterButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    flex: 1,
    marginRight: SPACING.sm,
  },
  filterButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  stats: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  statsText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  listContainer: {
    flexGrow: 1,
    padding: SPACING.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  errorContainer: {
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },
});

export default StudentListScreen;