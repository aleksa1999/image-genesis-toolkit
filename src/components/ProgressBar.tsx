
import React, { useState, useEffect } from 'react';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate progress updates
    let interval: NodeJS.Timeout;
    
    if (isVisible) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsVisible(false);
            return 0;
          }
          return prev + Math.random() * 10;
        });
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible]);

  // Listen for generation start (this would normally come from your state management)
  useEffect(() => {
    const handleGenerationStart = () => {
      setProgress(0);
      setIsVisible(true);
    };

    // Simulate starting progress when generation begins
    window.addEventListener('generation-start', handleGenerationStart);
    return () => window.removeEventListener('generation-start', handleGenerationStart);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-1 bg-gray-800">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
};
