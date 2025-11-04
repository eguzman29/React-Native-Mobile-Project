import { useState } from "react";
import { Alert, Button, Image, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [textInputValue, setTextInputValue] = useState("");


  const onRegister = () => {
    router.push({
      pathname: "./register",
    });
  }

  const handlePress = () => {
    const email = textInputValue.trim();
    const pass = password.trim();

    //  Validar email vacío
    if (!email) {
      Alert.alert("Email inválido", "Por favor ingresa un correo válido.");
      return;
    }

    //  Validar formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      Alert.alert("Email inválido", "Por favor ingresa un correo válido.");
      return;
    }

    //  Validar contraseña vacía
    if (!pass) {
      Alert.alert("Contraseña inválida", "Por favor ingresa tu contraseña.");
      return;
    }

    // Validar que la contraseña tenga al menos una mayúscula
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(pass)) {
      Alert.alert("Contraseña inválida", "Por favor ingresa una contraseña valida con mayúsculas.");
      return;
    }

    // Validar que la contraseña tenga al menos una minúscula
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(pass)) {
      Alert.alert("Contraseña inválida", "Por favor ingresa una contraseña valida con minusculas.");
      return;
    }

    // Validar que la contraseña tenga al menos un caracter especial
    const specialCharacterRegex = /[@!#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    
    if (!specialCharacterRegex.test(pass)) {
      Alert.alert("Contraseña inválida", "Por favor ingresa una contraseña valida con carácteres especiales.");
      return;
    }

    //Validar si la contraseña tiene al menos 8 caracteres
    if (pass.length < 8) { 
      Alert.alert("Contraseña inválida", "Por favor ingresa una contraseña valida con al menos 8 caracteres.");
      return;
    }

    

    // Si todo es válido
    Alert.alert("Login exitoso", "Email y contraseña válidos.");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: 200 }}>
        <Image
          source={require("../assets/imgs/wlcm.png")}
          style={{ width: 250, height: 250, marginBottom: 50 }}
          testID="icon-image"
        />

        <Text style={{ fontSize: 24 }}>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 16,
            borderRadius: 5,
          }}
          placeholder="Email"
          value={textInputValue}
          onChangeText={setTextInputValue}
          keyboardType="email-address"
        />

        <Text style={{ fontSize: 24 }}>Password</Text>
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

        <Button title="Login" onPress={handlePress} />
        <Button title="Registro" onPress={onRegister} />
      </View>
    </View>
  );
}
