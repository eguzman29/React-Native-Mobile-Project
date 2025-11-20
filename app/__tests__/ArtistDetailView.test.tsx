import * as React from 'react';
import { render, screen } from '@testing-library/react-native';
import ArtistDetailView from '../../app/ArtistDetailView';

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({
    name: 'Mock Artist',
    image: 'mock-image-url'
  })
}));

describe('ArtistDetailView', () => {
  it('shows artist name and image', () => {
    render(<ArtistDetailView />);

    expect(screen.getByText('Mock Artist')).toBeTruthy();
    expect(screen.getByTestId('artist-detail-image')).toBeTruthy();
  });
});