import { ArtistResource } from "./types/artist";

const API_KEY = "fe2cc92248cc7c40fe2ac2aa940649b2";
const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json'

function getMusicData() {
    return fetch(`${URL}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(date => date.topartists.artist)
    .then(artists => artists.map((artists: ArtistResource) => {
        return {
            id: artists.mbid,
            name: artists.name,
            image: artists.image[0]['#text']
        }
    }))
}

export {getMusicData}