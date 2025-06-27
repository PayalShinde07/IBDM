import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';
import { useRouter } from 'expo-router';
interface EmailVerificationScreenProps {
  email?: string;
  onVerifyOTP?: (otp: string) => void;
  onResendOTP?: () => void;
  onChangeEmail?: () => void;
}

const EmailScreen: React.FC<EmailVerificationScreenProps> = ({
  email = 'abc123@gmail.com',
  onVerifyOTP,
  onResendOTP,
  onChangeEmail,
}) => {
    const router = useRouter();
  const [otp, setOtp] = useState<string>('');

  const handleContinue = () => {
    if (otp.trim() === '') {
      Alert.alert('Error', 'Please enter the OTP');
      router.push('/(tabs)/LoginScreen');
      return;
    }
    onVerifyOTP?.(otp);
  };

  const handleResendOTP = () => {
    onResendOTP?.();
    Alert.alert('OTP Sent', 'A new OTP has been sent to your email');
  };

  const handleChangeEmail = () => {
    onChangeEmail?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C518" />
      
      <View style={styles.header}>
        <Text style={styles.imdbLogo}>IMDb</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify email address</Text>
        
        <Text style={styles.description}>
          To verify your email, We have sent a one Time Password (OTP) to{' '}
          <Text style={styles.email}>{email}</Text>{' '}
          <TouchableOpacity onPress={handleChangeEmail}>
            <Text style={styles.changeLink}>(Change)</Text>
          </TouchableOpacity>
        </Text>

        <TextInput
          style={styles.otpInput}
          placeholder="Enter OTP here"
          placeholderTextColor="#999"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
        />

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.resendButton} 
          onPress={handleResendOTP}
        >
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Conditions of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
  email: {
    color: '#000000',
    fontWeight: '500',
  },
  changeLink: {
    color: '#0066CC',
    fontSize: 16,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
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
  resendButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
  },
  resendButtonText: {
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

export default EmailScreen;