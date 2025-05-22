// /src/app/api/search/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  // Mock similar song results (eventually you'll replace this with real scraping or ML)
  const similarSongs = [
    { title: 'Sunroof', artist: 'Nicky Youre' },
    { title: '10:35', artist: 'Tiësto, Tate McRae' },
    { title: 'Daylight', artist: 'David Kushner' },
  ];

  return NextResponse.json({ input: query, results: similarSongs });
}