import React, { useState } from 'react';
import {View,Text,TextInput, TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';
import { useRouter } from 'expo-router';
interface ForgotPasswordScreenProps {
  onContinue?: (email: string) => void;
  onBack?: () => void;
  onConditionsPress?: () => void;
  onPrivacyPress?: () => void;
}

const PasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onContinue,
  onBack,
  onConditionsPress,
  onPrivacyPress,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email address');
      router.push('/(tabs)/ResetPasswordScreen');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    onContinue?.(email);
  };

  const handleBack = () => {
    router.push('/(tabs)/LoginScreen');
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
          <Text style={styles.title}>Forgot Password</Text>
          
          <Text style={styles.description}>
            To reset your email, please enter a valid email to send the reset password link.
          </Text>

          <TextInput
            style={styles.emailInput}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />

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
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 30,
    textAlign: 'left',
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
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
    paddingBottom: 330,
  },
  footerLink: {
    color: '#666666',
    fontSize: 14,
  },
});

export default PasswordScreen;