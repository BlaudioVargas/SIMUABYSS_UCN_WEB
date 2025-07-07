import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/components/AuthContext';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  )
};

