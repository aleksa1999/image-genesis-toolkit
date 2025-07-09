
import React, { useState } from 'react';
import useSWR from 'swr';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface ImageData {
  filename: string;
  path: string;
  timestamp: string;
  metadata?: {
    steps: number;
    sampler: string;
    seed: number;
    cfg_scale: number;
  };
}

const History = () => {
  const { data: images, error } = useSWR('/api/history', fetcher);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Image History</h1>
        <p className="text-gray-400">Failed to load images. Make sure the backend is running.</p>
      </div>
    );
  }

  if (!images) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Image History</h1>
        <p className="text-gray-400">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Image History</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.slice(0, 50).map((image: ImageData, index: number) => (
          <Dialog key={image.filename}>
            <DialogTrigger asChild>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer group">
                <CardContent className="p-2">
                  <div className="aspect-square bg-gray-900 rounded overflow-hidden relative">
                    <img
                      src={`/outputs/${image.filename}`}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    {image.metadata && (
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">
                        <div className="text-center">
                          <p>Steps: {image.metadata.steps}</p>
                          <p>CFG: {image.metadata.cfg_scale}</p>
                          <p>Seed: {image.metadata.seed}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
              <img
                src={`/outputs/${image.filename}`}
                alt={`Generated image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
              {image.metadata && (
                <div className="mt-4 text-sm text-gray-300">
                  <p><strong>Steps:</strong> {image.metadata.steps}</p>
                  <p><strong>Sampler:</strong> {image.metadata.sampler}</p>
                  <p><strong>CFG Scale:</strong> {image.metadata.cfg_scale}</p>
                  <p><strong>Seed:</strong> {image.metadata.seed}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default History;
