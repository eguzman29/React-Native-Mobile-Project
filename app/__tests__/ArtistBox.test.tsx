import * as React from 'react';
import { render, screen } from '@testing-library/react-native';
import ArtistBox from '../../components/ArtistBox';
import { Artist } from '@/types/artist'; // Importación necesaria

describe('ArtistBox Component', () => {
  const mockArtist: Artist = {
    id: '1', // Corregido: Tipo 'string'
    name: 'Test Artist',
    image: 'https://example.com/image.jpg',
  };

  it('renders artist name', () => {
    render(<ArtistBox artist={mockArtist} />);
    expect(screen.getByText('Test Artist')).toBeTruthy();
  });

  it('renders artist image', () => {
    render(<ArtistBox artist={mockArtist} />);
    const image = screen.getByTestId('artist-image');
    expect(image).toBeTruthy();
    // Nota: Es mejor usar 'image.props.source.uri' solo si estás seguro que estás probando un componente <Image> de RN.
    // Si la prueba falla aquí, podría ser que 'image' no es el elemento <Image> directamente, sino un View.
    // Pero por ahora, mantenemos la prueba original:
    expect(image.props.source.uri).toBe(mockArtist.image); 
  });
});