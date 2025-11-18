// components/ArtistBox.tsx
import {Artist} from "@/types/artist";
import React from "react";
import {Text, View, Image} from 'react-native';
import styled from "styled-components/native";

const MainContainer = styled(View)`
    margin: 5px;
    background-color: white;
    flex-direction: row;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-offset: 0px 2px;
    shadow-radius: 2px;
    elevation: 2;
    `;

const ImageContainer = styled(Image)`
    width: 150px;
    height: 150px;
    resize-mode: contain;
`;

// ⬇️ NUEVO: Un componente 'Placeholder' para cuando no hay imagen
const PlaceholderImage = styled(View)`
    width: 150px;
    height: 150px;
    background-color: #f0f0f0; /* Un color gris claro */
    justify-content: center;
    align-items: center;
`;

// ⬇️ NUEVO: Un texto (o ícono) para el placeholder
const PlaceholderText = styled(Text)`
    font-size: 50px;
    color: #ccc;
`;

const Info = styled(View)`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Name = styled(Text)`
    font-size: 20px;
    margin-top: 10px;
    color: #333;
`;

export default function ArtistBox({ artist }: { artist: Artist }) {
    
    // Verificamos si la imagen existe
    const imageSource = artist.image ? { uri: artist.image } : null;

    return (
        <MainContainer>
            
            {/* ⬇️ INICIO DEL CAMBIO: Renderizado Condicional */}
            {imageSource ? (
                // Si la imagen existe, la mostramos
                <ImageContainer source={imageSource} testID="artist-image"/>
            ) : (
                // Si no, mostramos nuestro placeholder
                <PlaceholderImage testID="placeholder-image">
                    <PlaceholderText>★</PlaceholderText>
                </PlaceholderImage>
            )}
            {/* ⬆️ FIN DEL CAMBIO */}

            <Info>
                <Name>{artist.name}</Name>
            </Info>
        </MainContainer>
    );
}