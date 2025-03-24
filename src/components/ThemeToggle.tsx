import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 p-3 bg-gray dark:bg-gray-800 rounded-full shadow-lg z-50"
    >
      {isDark ? (
        <Sun size={24} className="text-yellow-500" />
      ) : (
        <Moon size={24} className="text-gray-700" />
      )}
    </motion.button>
  );
}