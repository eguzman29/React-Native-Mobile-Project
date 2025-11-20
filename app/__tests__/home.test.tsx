import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import Home from '../../app/tindex';

jest.mock('../../api-client', () => ({
  getMusicData: jest.fn().mockResolvedValue([
    { id: '1', name: 'Artist One', image: 'img1.jpg' },
    { id: '2', name: 'Artist Two', image: 'img2.jpg' }
  ])
}));

// Mock del componente ArtistList
jest.mock('../../components/ArtistList', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>Mocked ArtistList</Text>;
});

describe('Home Screen', () => {
  it('renders the ArtistList when data loads', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Mocked ArtistList')).toBeTruthy();
    });
  });
});