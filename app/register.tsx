import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import styled from 'styled-components/native';

const MainContainer = styled(View)`
    flex: 1;
    align-items: center;
    justifyContent: center;
    background-color: #F5FCFF;
`
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        const trimmedEmail = email.trim();
        const pass = password.trim();
        const confirmPass = confirmPassword.trim();

        // Validar que ningún campo esté vacío
        if (!trimmedEmail || !pass || !confirmPass) {
            Alert.alert("Campos incompletos", "Por favor, rellena todos los campos.");
            return;
        }
        
        // Validar formato de email con regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            Alert.alert("Email inválido", "Por favor ingresa un correo válido.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (pass !== confirmPass) {
            Alert.alert("Contraseña inválida", "Las contraseñas no coinciden.");
            return;
        }

        // Validar que la contraseña tenga al menos una mayúscula
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(pass)) {
            Alert.alert("Contraseña inválida", "La contraseña debe contener al menos una mayúscula.");
            return;
        }

        // Validar que la contraseña tenga al menos una minúscula
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(pass)) {
            Alert.alert("Contraseña inválida", "La contraseña debe contener al menos una minúscula.");
            return;
        }

        // Validar que la contraseña tenga al menos un caracter especial
        const specialCharacterRegex = /[@!#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        if (!specialCharacterRegex.test(pass)) {
            Alert.alert("Contraseña inválida", "La contraseña debe contener al menos un carácter especial.");
            return;
        }
        
        // Validar si la contraseña tiene al menos 8 caracteres
        if (pass.length < 8) {
            Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        // Si todo es válido
        Alert.alert("Registro exitoso", "El correo y la contraseña son válidos.");
    };

    return (
        <MainContainer>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Register page</Text>
            <View style={{ width: 250 }}>
                <Text style={{ fontSize: 20 }}>Email</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 8,
                        marginBottom: 16,
                        borderRadius: 5,
                    }}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={{ fontSize: 20 }}>Password</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 8,
                        marginBottom: 16,
                        borderRadius: 5,
                    }}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Text style={{ fontSize: 20 }}>Confirm Password</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 8,
                        marginBottom: 16,
                        borderRadius: 5,
                    }}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                />
                <Button title="Register" onPress={handleRegister} />
            </View>
        </MainContainer>
    );
}