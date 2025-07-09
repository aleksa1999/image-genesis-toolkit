
import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const ProgressBar = () => {
  const { data, error } = useSWR('/queue/progress', fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const progress = data?.percent || 0;
  const isVisible = progress > 0 && progress < 100;

  if (!isVisible) return null;

  return (
    <div className="w-full h-1 bg-gray-800 relative overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ 
          width: `${Math.min(progress, 100)}%`,
          transform: `translateX(0%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
    </div>
  );
};
