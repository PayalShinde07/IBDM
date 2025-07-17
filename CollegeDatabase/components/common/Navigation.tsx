import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NavigationProps {
  currentScreen: 'students' | 'add-student' | 'profile';
  onNavigate: (screen: 'students' | 'add-student' | 'profile') => void;
  userRole: 'admin' | 'user';
}

export default function Navigation({ currentScreen, onNavigate, userRole }: NavigationProps) {
  const navigationItems = [
    { key: 'students', label: 'Students', icon: '👥' },
    { key: 'add-student', label: 'Add Student', icon: '➕' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[
            styles.navItem,
            currentScreen === item.key && styles.navItemActive,
          ]}
          onPress={() => onNavigate(item.key as 'students' | 'add-student' | 'profile')}
        >
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text
            style={[
              styles.navLabel,
              currentScreen === item.key && styles.navLabelActive,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#e3f2fd',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
});