// types/artist.ts
export interface Artist  {
    id: string // ⬅️ CAMBIO: Era 'number', pero mbid es 'string'
    name: string
    image: string
}

export interface ArtistResource {
    // id: number // Esto no se usa en la respuesta de la API
    name: string
    mbid: string
    image: [
        ImageUrl
    ]
}

interface ImageUrl {
    '#text': string
}