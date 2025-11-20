// app/ArtistDetailView.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import styled from 'styled-components/native';

// Estilos limpios (sin comentarios CSS)
const MainContainer = styled(View)`
    flex: 1;
    background-color: #f0f0f0;
    align-items: center;
`;

const Card = styled(View)`
    background-color: white;
    margin-top: 10px;
    width: 95%;
    flex-direction: row; 
    padding: 10px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-offset: 0px 2px;
    shadow-radius: 2px;
    elevation: 2;
`;

const ArtistImage = styled(Image)`
    width: 100px;
    height: 100px;
    resize-mode: contain;
`;

const ArtistName = styled(Text)`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-left: 15px;
    align-self: center;
`;

export default function ArtistDetailView() {
    const { name, image } = useLocalSearchParams();

    // Aseguramos que los parámetros sean strings
    const artistName = typeof name === 'string' ? name : '';
    const artistImage = typeof image === 'string' ? image : undefined;

    return (
        <MainContainer>
            <Card>
                {/* Aquí también haremos un renderizado condicional, 
                  igual que en la lista 
                */}
                {artistImage ? (
                    <ArtistImage 
                        testID="artist-detail-image"
                        source={{ uri: artistImage }} />
                ) : (
                    // Si no hay imagen, mostramos un 'placeholder'
                    <ArtistImage 
                        testID="placeholder-image"
                        style={{ backgroundColor: '#eee' }} />
                )}
                <ArtistName>{artistName}</ArtistName>
            </Card>
        </MainContainer>
    );
}