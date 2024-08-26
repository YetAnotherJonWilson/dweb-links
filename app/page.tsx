// app/page.js
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [exploreSuggestion, setExploreSuggestion] = useState('People');
  const [prevSuggestion, setPrevSuggestion] = useState('');
  const suggestions = ['People', 'Events', 'Groups', 'Places'];
  const [animationDirection, setAnimationDirection] = useState('down');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationDirection('up'); // Trigger slide-out animation
      setTimeout(() => {
        setPrevSuggestion(exploreSuggestion); // Set previous suggestion for slide-out
        setExploreSuggestion((prev) => {
          const currentIndex = suggestions.indexOf(prev);
          const nextIndex = (currentIndex + 1) % suggestions.length;
          return suggestions[nextIndex];
        });
        setAnimationDirection('down'); // Trigger slide-in animation
      }, 500); // Delay to match the slide-out duration
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, [exploreSuggestion]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      {/* Container to ensure sections take up half of the screen height */}
      <div className="flex-1 flex flex-col justify-between h-full">
        {/* Search Section */}
        <div className="flex-1 bg-blue-100 p-4 rounded-lg shadow-md mb-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-2 text-blue-800">Search</h1>
          <input
            type="text"
            placeholder="Enter a keyword..."
            className="w-full p-2 border border-blue-300 rounded-lg text-blue-700"
          />
        </div>

        {/* Explore Section */}
        <div className="flex-1 bg-yellow-100 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-2 text-yellow-800">Explore</h1>
          <div className="text-3xl text-yellow-700 relative">
            Explore [
            <span className="relative inline-block w-20">
              {/* Sliding out suggestion */}
              <span
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  animationDirection === 'up'
                    ? '-translate-y-full opacity-0'
                    : 'translate-y-0 opacity-100'
                }`}
              >
                {prevSuggestion}
              </span>
              {/* Sliding in suggestion */}
              <span
                className={`inset-0 transition-transform duration-500 ease-in-out ${
                  animationDirection === 'down'
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
              >
                {exploreSuggestion}
              </span>
            </span>
            ]
          </div>
        </div>
      </div>
    </div>
  );
}
