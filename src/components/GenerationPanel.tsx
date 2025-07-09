
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SliderGroup } from '@/components/SliderGroup';
import { HelpTip } from '@/components/HelpTip';
import { useToast } from '@/hooks/use-toast';
import { useHistoryReducer } from '@/hooks/useHistoryReducer';
import { ChevronDown, History } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GenerationState {
  prompt: string;
  settings: {
    cfg: number;
    steps: number;
    seed: number;
  };
}

const PROMPT_HISTORY_KEY = 'ai-generator-prompt-history';

export const GenerationPanel = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const { toast } = useToast();

  // Initialize history reducer with default state
  const {
    state: generationState,
    setState: setGenerationState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryReducer<GenerationState>({
    prompt: '',
    settings: {
      cfg: 7,
      steps: 20,
      seed: -1,
    },
  });

  // Load prompt history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(PROMPT_HISTORY_KEY);
    if (savedHistory) {
      setPromptHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Update generation state when prompt changes
  const handlePromptChange = (newPrompt: string) => {
    setGenerationState({
      ...generationState,
      prompt: newPrompt,
    });
  };

  // Save prompt to history
  const savePromptToHistory = (prompt: string) => {
    if (!prompt.trim()) return;
    
    const newHistory = [prompt, ...promptHistory.filter(p => p !== prompt)].slice(0, 10);
    setPromptHistory(newHistory);
    localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleGenerate = () => {
    if (!generationState.prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an image",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    savePromptToHistory(generationState.prompt);
    console.log('Generating image with:', generationState);
    
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
    localStorage.setItem('ai-generator-settings', JSON.stringify(generationState.settings));
    toast({
      title: "Settings Saved",
      description: "Current settings have been saved to localStorage",
    });
    console.log('Settings saved:', generationState.settings);
  };

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        if (canUndo) undo();
      }
      if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'Z')) {
        event.preventDefault();
        if (canRedo) redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Controls */}
      <div className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Prompt
              <HelpTip content="Describe what you want to generate. Be specific and detailed for better results." />
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={promptHistory.length === 0}>
                      <History className="h-4 w-4" />
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-gray-800 border-gray-600">
                    {promptHistory.map((prompt, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handlePromptChange(prompt)}
                        className="text-white hover:bg-gray-700 cursor-pointer text-xs"
                      >
                        {prompt.length > 60 ? `${prompt.substring(0, 60)}...` : prompt}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="A beautiful landscape with mountains and a lake at sunset..."
              value={generationState.prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              className={`min-h-[120px] bg-gray-900 border-gray-600 text-white resize-none ${
                !generationState.prompt.trim() ? 'ring-2 ring-red-500' : ''
              }`}
              required
            />
          </CardContent>
        </Card>

        <SliderGroup />

        <div className="flex gap-4">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            title="Generate Image (Ctrl+Enter)"
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
            <span className="ml-2 text-xs opacity-70">(Ctrl+Enter)</span>
          </Button>
          <Button
            onClick={handleSaveSettings}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            title="Save Settings (Shift+S)"
          >
            Save Settings
            <span className="ml-2 text-xs opacity-70">(Shift+S)</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={undo}
            disabled={!canUndo}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            title="Undo (Ctrl+Z)"
          >
            Undo
          </Button>
          <Button
            onClick={redo}
            disabled={!canRedo}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            title="Redo (Ctrl+Y)"
          >
            Redo
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
