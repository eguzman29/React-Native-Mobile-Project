import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Image, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateRegister = () => {
    // Validar campos vacíos
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('ERROR DE VALIDACIÓN', 'Los campos no pueden estar vacíos');
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('ERROR DE VALIDACIÓN', 'El formato del email no es válido');
      return;
    }

    // Validación de longitud mínima
    if (password.length < 8) {
      Alert.alert('ERROR DE VALIDACIÓN', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Validación de mayúsculas
    if (!/[A-Z]/.test(password)) {
      Alert.alert('ERROR DE VALIDACIÓN', 'La contraseña debe contener al menos una mayúscula');
      return;
    }

    // Validación de minúsculas
    if (!/[a-z]/.test(password)) {
      Alert.alert('ERROR DE VALIDACIÓN', 'La contraseña debe contener al menos una minúscula');
      return;
    }

    // Validación de carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      Alert.alert('ERROR DE VALIDACIÓN', 'La contraseña debe contener al menos un carácter especial');
      return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
      Alert.alert('ERROR DE VALIDACIÓN', 'Las contraseñas no coinciden');
      return;
    }

    // Si todo es válido
    Alert.alert('VALIDACIÓN EXITOSA', 'Usuario registrado correctamente');
    router.push('/'); // ✅ Redirige correctamente al index (login)
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087579.png' }}
        style={styles.icon}
        testID="icon-image"
      />
      <TextInput
        placeholder="Ingrese su email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirme su contraseña"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button title="Registrar" onPress={validateRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});