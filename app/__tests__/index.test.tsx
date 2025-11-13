

import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import * as React from "react";
import { Alert } from "react-native";
import Index from "../index";

//Mock Alert
jest.spyOn(Alert, 'alert');


//Mock para router.push
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));


describe('Index (Login Screen)', () => {
    beforeEach(() => {
        // Limpiar mocks antes de cada test
        (Alert.alert as jest.Mock).mockClear();
    });

    it('renders correctly', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();

        expect(screen.getByText('Login')).toBeTruthy();
        expect(screen.getByTestId('icon-image')).toBeTruthy();
    });


    it('shows alert when fields are empty', () => {
        render(<Index />);

        // Dejar email vacío y presionar Login
        fireEvent.press(screen.getByText('Login'));

        expect(Alert.alert).toHaveBeenCalledWith('Email inválido', 'Por favor ingresa un correo válido.');

        // Poner un email válido para pasar la validación del email
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');

        // Dejar password vacío y presionar Login
        fireEvent.press(screen.getByText('Login'));

        // Debería haberse llamado Alert.alert con el título de contraseña inválida
        const calls = (Alert.alert as jest.Mock).mock.calls;
        const calledWithPasswordError = calls.some(call => call[0] === 'Contraseña inválida');
        expect(calledWithPasswordError).toBe(true);
    });



     it('shows alert when only password is empty', () => {
        render(<Index />);

        // Primero, ingresa un email válido para que la validación de email pase
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');

      // Dejar password vacío y presionar Login
        fireEvent.press(screen.getByText('Login'));

        // Debería haberse llamado Alert.alert con el título de contraseña inválida
        const calls = (Alert.alert as jest.Mock).mock.calls;
        const calledWithPasswordError = calls.some(call => call[0] === 'Contraseña inválida');
        expect(calledWithPasswordError).toBe(true);
    });

    
    it('has secure text entry for password field', () => {
        render(<Index />);
 
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        
        expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('shows alert when email is empty', () => {
        render(<Index />);
        fireEvent.press(screen.getByText('Login'));
        expect(Alert.alert).toHaveBeenCalledWith('Email inválido', 'Por favor ingresa un correo válido.');
    });

    it('has correct keyboard for email field', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Email');
        expect(emailInput.props.keyboardType).toBe('email-address');
    });
});


describe('Email Validation', () => {
    beforeEach(() => {
        (Alert.alert as jest.Mock).mockClear();
    });

    it('accepts valid email formats', () => {
        render(<Index />);

        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');

        fireEvent.press(screen.getByText('Login'));

        expect(Alert.alert).not.toHaveBeenCalledWith('Email inválido', 'Por favor ingresa un correo válido.');
    });

    it('rejects invalid email formats', () => { 
        render(<Index />);

        // Ingresar un email inválido
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'invalid-email');

        //Presionar login
        fireEvent.press(screen.getByText('Login'));

        expect(Alert.alert).toHaveBeenCalledWith('Email inválido', 'Por favor ingresa un correo válido.');
    });
});


describe('Password Validation', () => {
    beforeEach(() => {
        (Alert.alert as jest.Mock).mockClear();
    });

    it('shows success alert for valid credentials', () => {
        render(<Index />);

        // Ingresar un email válido
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
        // Ingresar una contraseña válida
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'ValidPassword123!');

        // Presionar el botón de inicio de sesión
        fireEvent.press(screen.getByText('Login'));

        // Verificar que se muestra la alerta de éxito
        expect(Alert.alert).toHaveBeenCalledWith('Login exitoso', 'Email y contraseña válidos.');
    });


    it('rejects passwords without uppercase', () => {
        render(<Index />);

        //Ingresar un email válido 
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
        //Ingresar una contraseña sin mayúsculas
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'validpassword123');

        //Presionar el boton de inicio de sesión
        fireEvent.press(screen.getByText('Login'));

        //Verificar que se muestra la alerta de contraseña inválida
        expect(Alert.alert).toHaveBeenCalledWith('Contraseña inválida', 'Por favor ingresa una contraseña valida con mayúsculas.');
    });


    it('rejects passwords without lowercase', () => {
       render(<Index />);

        //Ingresar un email válido 
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
        //Ingresar una contraseña sin minusculas
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'VALIDPASSWORD123');

        //Presionar el boton de inicio de sesión
        fireEvent.press(screen.getByText('Login'));

        //Verificar que se muestra la alerta de contraseña inválida
        expect(Alert.alert).toHaveBeenCalledWith('Contraseña inválida', 'Por favor ingresa una contraseña valida con minusculas.');
        
    });

    it('rejects passwords without special characters', () => {
        render(<Index />);

        //Ingresar un email válido 
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
        //Ingresar una contraseña sin carácteres especiales
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'invalidPassword123');

        //Presionar el boton de inicio de sesión
        fireEvent.press(screen.getByText('Login'));

        //Verificar que se muestra la alerta de contraseña inválida
        expect(Alert.alert).toHaveBeenCalledWith('Contraseña inválida', 'Por favor ingresa una contraseña valida con carácteres especiales.');
    });


    it('rejects passwords shorter than 8 characters', () => {
        render(<Index />);

        //Ingresar un email válido 
        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
        //Ingresar una contraseña menor a 8 caracteres
        fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'Vapa1!');

        //Presionar el boton de inicio de sesión
        fireEvent.press(screen.getByText('Login'));

        //Verificar que se muestra la alerta de contraseña inválida
        expect(Alert.alert).toHaveBeenCalledWith('Contraseña inválida', 'Por favor ingresa una contraseña valida con al menos 8 caracteres.');
    });

    it('rejects passwords with only numbers and special characters', () => {
    render(<Index />);

    //Ingresar un email válido 
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    //Ingresar una contraseña con solo números y carácteres especiales
    fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), '12345678!');

    //Presionar el boton de inicio de sesión
    fireEvent.press(screen.getByText('Login'));

    //Verificar que se muestra la alerta de contraseña inválida
    expect(Alert.alert).toHaveBeenCalledWith('Contraseña inválida', 'Por favor ingresa una contraseña valida con mayúsculas.');
    });


    it('navigates to register screen on register button press', async () => {
        const { getByText } = render(<Index />);
        const registerButton = getByText('register');
        
        fireEvent.press(registerButton);
    
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith({
                pathname: './register',
            });
        });
    });
});