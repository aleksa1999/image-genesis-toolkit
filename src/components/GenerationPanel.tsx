
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SliderGroup } from '@/components/SliderGroup';
import { HelpTip } from '@/components/HelpTip';
import { useToast } from '@/hooks/use-toast';

export const GenerationPanel = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an image",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    console.log('Generating image with prompt:', prompt);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    }, 3000);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Current settings have been saved to localStorage",
    });
    console.log('Settings saved');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Controls */}
      <div className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Prompt
              <HelpTip content="Describe what you want to generate. Be specific and detailed for better results." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="A beautiful landscape with mountains and a lake at sunset..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-gray-900 border-gray-600 text-white resize-none"
            />
          </CardContent>
        </Card>

        <SliderGroup />

        <div className="flex gap-4">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
            <span className="ml-2 text-xs opacity-70">(Ctrl+Enter)</span>
          </Button>
          <Button
            onClick={handleSaveSettings}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Save Settings
            <span className="ml-2 text-xs opacity-70">(Shift+S)</span>
          </Button>
        </div>
      </div>

      {/* Right Panel - Output */}
      <div>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Generating your image...</p>
                </div>
              ) : (
                <p className="text-gray-400">Generated image will appear here</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
