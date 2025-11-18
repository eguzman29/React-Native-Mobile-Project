// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    // Define el Stack principal
    <Stack>
      {/* Define la pantalla principal (index.tsx) */}
      <Stack.Screen 
        name="index" 
        options={{ 
            title: 'App' // Este es el título "App" que se ve en tu imagen
        }} 
      />
      {/* Define la pantalla de detalle */}
      <Stack.Screen 
        name="ArtistDetailView" 
        options={{ 
            title: 'Detalles' // Este es el título "Detalles"
        }} 
      />
    </Stack>
  );
}