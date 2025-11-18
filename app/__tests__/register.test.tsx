import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
// ⬇️ IMPORTANTE: Ajusté la ruta a '../register' para salir de la carpeta __tests__
import Register from '../register'; 

// Mock de Alert
jest.spyOn(Alert, 'alert');

// Mock del router de Expo
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Register Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Ingrese su email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese su contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirme su contraseña')).toBeTruthy();
    expect(screen.getByText('Registrar')).toBeTruthy();
    expect(screen.getByTestId('icon-image')).toBeTruthy();
  });

  // --- VALIDACIONES GENERALES ---
  it('shows alert when fields are empty', () => {
    render(<Register />);
    fireEvent.press(screen.getByText('Registrar'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'ERROR DE VALIDACIÓN',
      expect.stringContaining('vacíos')
    );
  });

  // --- VALIDACIONES DE EMAIL ---
  describe('Email validation', () => {
    it('rejects invalid email formats', () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'invalidEmail');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'Valid123!');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Valid123!');
      fireEvent.press(screen.getByText('Registrar'));
      expect(Alert.alert).toHaveBeenCalledWith(
        'ERROR DE VALIDACIÓN',
        expect.stringContaining('email')
      );
    });
  });

  // --- VALIDACIONES DE CONTRASEÑA ---
  describe('Password validation', () => {
    it('rejects short passwords', () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'user@test.com');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'Ab1!');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Ab1!');
      fireEvent.press(screen.getByText('Registrar'));
      expect(Alert.alert).toHaveBeenCalledWith(
        'ERROR DE VALIDACIÓN',
        expect.stringContaining('8 caracteres')
      );
    });

    it('rejects passwords without uppercase', () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'user@test.com');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'password123!');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'password123!');
      fireEvent.press(screen.getByText('Registrar'));
      expect(Alert.alert).toHaveBeenCalledWith(
        'ERROR DE VALIDACIÓN',
        expect.stringContaining('mayúscula')
      );
    });

    it('rejects passwords without lowercase', () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'user@test.com');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'PASSWORD123!');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'PASSWORD123!');
      fireEvent.press(screen.getByText('Registrar'));
      expect(Alert.alert).toHaveBeenCalledWith(
        'ERROR DE VALIDACIÓN',
        expect.stringContaining('minúscula')
      );
    });

    it('rejects passwords without special characters', () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'user@test.com');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'Password123');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Password123');
      fireEvent.press(screen.getByText('Registrar'));
      expect(Alert.alert).toHaveBeenCalledWith(
        'ERROR DE VALIDACIÓN',
        expect.stringContaining('carácter especial')
      );
    });

    it('shows alert when passwords do not match', () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'user@test.com');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'Valid123!');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Different123!');
      fireEvent.press(screen.getByText('Registrar'));
      expect(Alert.alert).toHaveBeenCalledWith(
        'ERROR DE VALIDACIÓN',
        expect.stringContaining('no coinciden')
      );
    });

    it('accepts valid registration and redirects to login', async () => {
      render(<Register />);
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su email'), 'user@test.com');
      fireEvent.changeText(screen.getByPlaceholderText('Ingrese su contraseña'), 'Valid123!');
      fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Valid123!');
      fireEvent.press(screen.getByText('Registrar'));

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'VALIDACIÓN EXITOSA',
          expect.any(String)
        );
        
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });
});