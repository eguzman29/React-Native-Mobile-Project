import { Artist } from '@/types/artist'; // Importación necesaria
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import ArtistList from '../../components/ArtistList';

const mockPush = jest.fn();

// Mock de expo-router
jest.mock('expo-router', () => ({
 useRouter: () => ({
  push: mockPush,
 }),
}));

// Mock de ArtistBox
jest.mock('../../components/ArtistBox', () => {
 const React = require('react');
 const { Text } = require('react-native');
 return ({ artist }: any) => <Text>Mocked {artist.name}</Text>;
});

describe('ArtistList Component', () => {
 // El tipo 'id' está corregido a 'string'
 const mockArtists: Artist[] = [
  { id: '1', name: 'Artist One', image: 'img1.jpg' },
 { id: '2', name: 'Artist Two', image: 'img2.jpg' },
 ];

 it('renders a list of artists', () => {
  render(<ArtistList artists={mockArtists} />);

 expect(screen.getByText('Mocked Artist One')).toBeTruthy();
 expect(screen.getByText('Mocked Artist Two')).toBeTruthy();
 });

 it('navigates to ArtistDetailView on press', () => {
 render(<ArtistList artists={mockArtists} />);

 const item = screen.getByTestId('artist-box-Artist One');

 fireEvent.press(item);

 expect(mockPush).toHaveBeenCalledWith({
 pathname: "./ArtistDetailView",
 params: {
 id: '1', // 'id' como string
 name: "Artist One",
 image: "img1.jpg",
 },
});
 });
});