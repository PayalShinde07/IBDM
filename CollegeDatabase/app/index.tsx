// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { StudentProvider } from '../components/studentContext';
import StudentListScreen from '../screens/StudentListScreen';
import { COLORS, FONTS } from '../constants';

export default function App() {
  return (
    <StudentProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>College Database</Text>
          <Text style={styles.headerSubtitle}>Student Management System</Text>
        </View>
        <StudentListScreen />
      </SafeAreaView>
    </StudentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
});