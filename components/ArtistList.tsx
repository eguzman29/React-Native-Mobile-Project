// components/ArtistList.tsx
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import ArtistBox from "./ArtistBox";
import { Artist } from "@/types/artist"; // Revisa esta ruta
import { useRouter } from "expo-router";

export default function ArtistList({ artists }: { artists: Artist[] }) {
    const router = useRouter();

    const handlePress = (artist: Artist) => { // ⬅️ Tipado 'Artist'
        // ⬇️ CAMBIO: La ruta debe coincidir con el nombre del archivo de pantalla
        router.push({
            pathname: "./ArtistDetailView", 
            params: { id: artist.id, name: artist.name, image: artist.image },
        });
    }

    return (
        <View>
            <FlatList
            data={artists}
            keyExtractor={(item, index) => `artist-${index}`} // ⬅️ Usar item.id es más seguro
            renderItem={({ item }) => <TouchableOpacity
                testID={`artist-box-${item.name}`}
                onPress={() => handlePress(item)}
            >
            <ArtistBox artist={item} />
            </TouchableOpacity>}
            />
        </View>
    );
}