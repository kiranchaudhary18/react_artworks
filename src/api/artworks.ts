export interface Artwork {
  id: number
  title: string
  place_of_origin: string
  artist_display: string
  inscriptions: string
  date_start: number
  date_end: number
}

export interface ArtResponse {
  data: Artwork[]
  pagination: {
    total: number
    limit: number
    offset: number
    total_pages: number
    current_page: number
  }
}

export async function getArtworks(page: number, limit: number = 10): Promise<ArtResponse> {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch artworks')
  return res.json()
}
