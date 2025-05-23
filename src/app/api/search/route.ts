// /src/app/api/search/route.ts

import { NextResponse } from 'next/server';
import { getSpotifyAccessToken } from "@/lib/spotify"

export async function POST(req: Request) {
  const { query } = await req.json();
  console.log('Received search query:', query);

  const token = await getSpotifyAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log('Spotify API response data:', JSON.stringify(data, null, 2));

  return NextResponse.json(data);
}