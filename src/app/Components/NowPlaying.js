'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NowPlaying() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack] = useState({
    title: "Midnight City",
    artist: "M83",
    album: "Coding Sessions",
  });
  
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-8 right-8 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-lg p-4 w-80"
    >
      <div className="flex items-center gap-4">
        {/* Album Art */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg overflow-hidden">
          <AnimatePresence>
            {isPlaying && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 left-0 w-full bg-black/30"
                    initial={{ height: 0 }}
                    animate={{ 
                      height: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ left: `${i * 25}%`, width: '20%' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white truncate">{currentTrack.title}</h4>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400 truncate">{currentTrack.artist}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-xs text-gray-500">Coding to: {currentTrack.album}</div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  );
}