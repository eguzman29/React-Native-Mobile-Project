// api-client.ts
import { ArtistResource } from "@/types/artist"; // Asegúrate que la ruta a types/ sea correcta

const API_KEY = "fe2cc92248cc7c40fe2ac2aa940649b2";
// ⬇️ CAMBIO: Se usan backticks (`) para que ${API_KEY} funcione
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`;

function getMusicData() {
    return fetch(`${URL}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map((artist: ArtistResource) => { // ⬇️ CAMBIO: 'artist' en lugar de 'artists' para claridad

        // ⬇️ INICIO DE CAMBIO: Verificación robusta de la imagen
        const image = (artist.image && artist.image[0] && artist.image[0]['#text']) 
                      ? artist.image[0]['#text'] 
                      : null; // Asignamos null si no hay imagen
        // ⬆️ FIN DE CAMBIO

        return {
            id: artist.mbid, // mbid es un string
            name: artist.name,
            image: image
        }
    }))
}

export {getMusicData}