import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { initializeNotifications } from '../services/notificationService';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

function RootLayoutContent() {
  const { theme } = useTheme();
  const [bootReady, setBootReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        await initializeNotifications();
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setBootReady(true);
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (bootReady) {
      SplashScreen.hideAsync().catch(console.error);
    }
  }, [bootReady]);

  if (!bootReady) {
    return null;
  }

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
