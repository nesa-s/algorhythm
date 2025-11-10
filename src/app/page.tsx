'use client';

import { useState, useEffect } from 'react';
import { InputWithButton } from '@/components/InputWithButton';
import SimpleMarqueeDemo from "@/components/SimpleMarqueeDemo";

type Suggestion = {
  name: string;
  artist: string;
  image?: string;
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
};

export default function Home() {
  const [songInput, setSongInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!songInput.trim() || songInput.length < 2) return setSuggestions([]);

      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: songInput }),
      });

      const data = await res.json();
      const tracks = data.tracks?.items || [];
      setSuggestions(
        tracks.map((track: SpotifyTrack): Suggestion => ({
          name: track.name,
          artist: track.artists?.[0]?.name,
          image: track.album?.images?.[2]?.url,
        }))
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [songInput]);

  return (
    <main className="min-h-screen bg-black text-white px-6 sm:px-10 pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-6 text-center px-4">
          <div className="relative isolate mt-20 flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 pointer-events-none w-screen" />
            <SimpleMarqueeDemo />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <h1 className="text-[100px] sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A9CEF4] to-[#7EA0B7]">
                  Algorhythm
                </span>
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-[20px] text-center" style={{ fontFamily: "Monaco, monospace" }}>
            Search a song to discover others with a similar vibe --powered by social trends and sound similarity.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[800px] z-[100] isolate">
  <form>
    <InputWithButton
      value={songInput}
      onChange={(e) => setSongInput(e.currentTarget.value)}
    />
  </form>

  {suggestions.length > 0 && (
    <ul
      className="absolute left-0 right-0 top-full mt-2
                 bg-white bg-opacity-100 mix-blend-normal
                 text-black rounded-md shadow-2xl
                 max-h-60 overflow-y-auto z-[101]
                 border border-gray-200 divide-y divide-gray-200"
    >
      {suggestions.map((s, index) => (
        <li
          key={index}
          className="px-4 py-2 bg-white hover:bg-gray-100 cursor-pointer flex items-center gap-3"
          onClick={() => setSongInput(`${s.name} - ${s.artist}`)}
        >
          {s.image && (
            <img src={s.image} alt="" className="h-8 w-8 rounded object-cover" />
          )}
          <span>
            {s.name} <span className="text-gray-500">– {s.artist}</span>
          </span>
        </li>
      ))}
    </ul>
  )}
</div>



      </div>
    </main>
  );
}