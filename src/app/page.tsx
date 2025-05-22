'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
      <h1 className="text-5xl font-extrabold tracking-tight">
        Algo<span className="text-blue-500">rhythm</span>
      </h1>
      <p className="text-gray-400 text-sm">
        Enter a song to discover others with a similar vibe—powered by social trends and sound similarity.
      </p>
    </div>
      <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto w-[800px] flex items-center gap-2"
        >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          type="text"
          value={songInput}
          onChange={(e) => setSongInput(e.target.value)}
          placeholder="e.g. 'Golden Hour – JVKE'"
          className="flex-1 h-24 px-4 rounded-full bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          disabled={loading}
          className="h-24 px-5 bg-gradient-to-br from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? 'Searching...' : 'Find'}
        </motion.button>
      </motion.form>
      </div>
    </main>
  );
}