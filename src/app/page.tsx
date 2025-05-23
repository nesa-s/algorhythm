'use client';

import { useState, useEffect } from 'react';
import { InputWithButton } from '@/components/InputWithButton';
import SimpleMarqueeDemo from "@/components/SimpleMarqueeDemo";

export default function Home() {
  const [songInput, setSongInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!songInput.trim()) return setSuggestions([]);

      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: songInput }),
      });

      const data = await res.json();
      const tracks = data.tracks?.items || [];
      setSuggestions(tracks.map((track: any) => ({
        name: track.name,
        artist: track.artists?.[0]?.name,
        image: track.album?.images?.[2]?.url,
      })));
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [songInput]);

  return (
    <main className="min-h-screen bg-black text-white px-6 sm:px-10 pt-24 pb-20">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
    <div className="space-y-3 text-center px-4">
      <h1 className="text-[100px] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A9CEF4] to-[#7EA0B7]">Algorhythm</span>
      </h1>
      <p className="text-gray-400 text-[20px] text-center">
        Enter a song to discover others with a similar vibe—powered by social trends and sound similarity.
      </p>
    </div>
    <form className="mx-auto w-[800px]">
        <InputWithButton
          value={songInput}
          onChange={(e) => setSongInput(e.currentTarget.value)}
        />
    </form>
    {suggestions.length > 0 && (
      <ul className="mt-4 bg-white text-black rounded-md shadow-md max-h-60 overflow-y-auto">
        {suggestions.map((s, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-4"
            onClick={() => setSongInput(`${s.name} - ${s.artist}`)}
          >
            {s.image && (
              <img src={s.image} alt={s.name} className="w-10 h-10 rounded object-cover" />
            )}
            <span>{s.name} <span className="text-gray-500">– {s.artist}</span></span>
          </li>
        ))}
      </ul>
    )}
    <div className="mt-20">
      <SimpleMarqueeDemo />
    </div>
    </div>
    </main>
  );
}