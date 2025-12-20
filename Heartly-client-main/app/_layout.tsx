import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

// Try to import reanimated if available (not available in Expo Go)
try {
  require('react-native-reanimated');
} catch {
  // Reanimated not available, continue without it
}

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(auth)/splash' />
        <Stack.Screen name="(auth)/auth" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="appointment/book" options={{ title: 'Select Slot' }} />
        <Stack.Screen name="appointment/confirm" options={{ title: 'Confirm Booking' }} />
        <Stack.Screen name="appointment/details" options={{ title: 'Appointment Details' }} />
        <Stack.Screen name="appointment/success" options={{ title: 'Booking Success' }} />
        <Stack.Screen name="emergency/booking" options={{ title: 'Emergency Request' }} />
        <Stack.Screen name="emergency/tracking" options={{ title: 'Ambulance Tracking', headerShown: false }} />
        <Stack.Screen name="prescription/index" options={{ title: 'Prescriptions', headerShown: false }} />
        <Stack.Screen name="profile/edit" options={{ title: 'Edit Profile', headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="profile/settings" options={{ title: 'Settings', headerShown: false }} />
        <Stack.Screen name="profile/help" options={{ title: 'Help & Support', headerShown: false }} />
        <Stack.Screen name="profile/legal" options={{ title: 'Legal', headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
