import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { initializeNotifications } from '../services/notificationService';

function RootLayoutContent() {
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize notifications
    initializeNotifications().catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ 
        headerShown: false, 
        animation: 'fade',
        contentStyle: { backgroundColor: theme.colors.background }
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="specs" />
        <Stack.Screen name="report" />
      </Stack>
    </View>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
