import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';
import { useRouter } from 'expo-router';
interface ResetPasswordScreenProps {
  onContinue?: (newPassword: string, confirmPassword: string) => void;
  onBack?: () => void;
  onConditionsPress?: () => void;
  onPrivacyPress?: () => void;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onContinue,
  onBack,
  onConditionsPress,
  onPrivacyPress,
}) => {
   const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleContinue = () => {
    if (newPassword.trim() === '') {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }
    
    if (confirmPassword.trim() === '') {
      Alert.alert('Error', 'Please confirm your password');
      return;
    }
    
    if (!validatePassword(newPassword)) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    onContinue?.(newPassword, confirmPassword);
  };

  const handleBack = () => {
   router.push('/(tabs)/PasswordScreen');
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConditions = () => {
    onConditionsPress?.();
  };

  const handlePrivacy = () => {
    onPrivacyPress?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C518" />
     
        <View style={styles.header}>
          <Text style={styles.imdbLogo}>IMDb</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Reset Password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New Password"
              placeholderTextColor="#999"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity 
              onPress={toggleNewPasswordVisibility}
            >
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
            >
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleConditions}>
            <Text style={styles.footerLink}>Conditions of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrivacy}>
            <Text style={styles.footerLink}>Privacy Notice</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F5C842',
    paddingVertical: 40,
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 50,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 300,
  },
  footerLink: {
    color: '#666666',
    fontSize: 14,
  },
});

export default ResetPasswordScreen;