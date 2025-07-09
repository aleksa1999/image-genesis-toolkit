
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Mock data for demonstration
const mockImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/400/400?random=${i + 1}`,
  prompt: `Generated image ${i + 1} with a beautiful landscape scene`,
  timestamp: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
}));

const History = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Image History</CardTitle>
          <p className="text-gray-400">Browse your recently generated images</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockImages.map((image) => (
              <div
                key={image.id}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 truncate">
                  {new Date(image.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="w-full rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-white">Prompt</h3>
                <p className="text-gray-300">{selectedImage.prompt}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Generated on {new Date(selectedImage.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
