import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

interface AuthNavigatorProps {
  onLogin: (user: User, token: string) => void;
}

export default function AuthNavigator({ onLogin }: AuthNavigatorProps) {
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'signup'>('signin');

  const switchToSignUp = () => setCurrentScreen('signup');
  const switchToSignIn = () => setCurrentScreen('signin');

  return (
    <View style={styles.container}>
      {currentScreen === 'signin' ? (
        <SignIn 
          onLogin={onLogin}
          onSwitchToSignUp={switchToSignUp}
        />
      ) : (
        <SignUp 
          onLogin={onLogin}
          onSwitchToSignIn={switchToSignIn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});