'use client';

import { useState } from 'react';
import { InputWithButton } from '@/components/InputWithButton';
import SimpleMarqueeDemo from "@/components/SimpleMarqueeDemo";

export default function Home() {
  const [songInput, setSongInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songInput.trim()) return;

    setLoading(true);

    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: songInput }),
    });

    const data = await res.json();
    console.log('🎵 Results:', data);
    setLoading(false);
  };

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
    <form onSubmit={handleSubmit} className="mx-auto w-[800px]">
        <InputWithButton
          value={songInput}
          onChange={(e) => setSongInput(e.currentTarget.value)}
        />
    </form>
    <div className="mt-20">
      <SimpleMarqueeDemo />
    </div>
    </div>
    </main>
  );
}