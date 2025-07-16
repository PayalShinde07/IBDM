import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StudentList from '../components/student/StudentList';
import StudentForm from '../components/student/StudentForm';
import UserProfile from '../components/user/UserProfile';
import Navigation from '../components/common/Navigation';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

interface MainNavigatorProps {
  user: User;
  token: string;
  onLogout: () => void;
}

export default function MainNavigator({ user, token, onLogout }: MainNavigatorProps) {
  const [currentScreen, setCurrentScreen] = useState<'students' | 'add-student' | 'profile'>('students');

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'students':
        return <StudentList user={user} token={token} />;
      case 'add-student':
        return <StudentForm user={user} token={token} onSuccess={() => setCurrentScreen('students')} />;
      case 'profile':
        return <UserProfile user={user} token={token} onLogout={onLogout} />;
      default:
        return <StudentList user={user} token={token} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderCurrentScreen()}
      </View>
      <Navigation 
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        userRole={user.role}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});