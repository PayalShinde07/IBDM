import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="HomeScreen" /> */}
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="EmailScreen" />
      <Stack.Screen name="PasswordScreen" />
      <Stack.Screen name="ResetPasswordScreen" />
      <Stack.Screen name="Notification" />
    </Stack>
  );
}