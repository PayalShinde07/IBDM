export type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export type EmailVerificationScreenProps = {
  email?: string;
  onVerifyOTP?: (otp: string) => void;
  onResendOTP?: () => void;
  onChangeEmail?: () => void;
}

export type ForgotPasswordScreen = {
  onContinue?: (email: string) => void;
  onBack?: () => void;
  onConditionsPress?: () => void;
  onPrivacyPress?: () => void;
}
