'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  const commands = [
    { id: 1, title: 'Home', icon: '🏠', action: () => router.push('/home') },
    { id: 2, title: 'Projects', icon: '💼', action: () => router.push('/projects') },
    { id: 3, title: 'Blog', icon: '📝', action: () => router.push('/blog') },
    { id: 4, title: 'About Me', icon: '👤', action: () => router.push('/me') },
    { id: 5, title: 'Contact', icon: '📧', action: () => router.push('/linktree') },
    { id: 6, title: 'Resume', icon: '📄', action: () => window.open('/resume/Resume-17.pdf', '_blank') },
    { id: 7, title: 'GitHub', icon: '🐙', action: () => window.open('https://github.com/CodeWithInferno', '_blank') },
    { id: 8, title: 'LinkedIn', icon: '💼', action: () => window.open('https://linkedin.com/in/pratham-patel-6a40b5323', '_blank') },
    { id: 9, title: 'Email Me', icon: '✉️', action: () => window.location.href = 'mailto:prathambiren2618@gmail.com' },
    { id: 10, title: 'Hire Me', icon: '🚀', action: () => router.push('/hire-pratham-patel') },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter' && filteredCommands.length > 0) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setSearch('');
        } else if (e.key === 'Escape') {
          setIsOpen(false);
          setSearch('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-gray-700">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">ESC</kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <motion.div
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                      setSearch('');
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center px-3 py-2 rounded cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <span className="mr-3 text-lg">{cmd.icon}</span>
                    <span className="flex-1">{cmd.title}</span>
                    {index === selectedIndex && (
                      <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Enter</kbd>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No commands found
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-700 text-xs text-gray-500 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↵</kbd>
                  Select
                </span>
              </div>
              <span>Pratham&apos;s Portfolio</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}