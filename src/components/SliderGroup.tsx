
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { HelpTip } from '@/components/HelpTip';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const sliderConfigs = [
  {
    id: 'cfg',
    label: 'CFG Scale',
    min: 1,
    max: 20,
    step: 0.5,
    default: 7,
    description: 'Controls how closely the AI follows your prompt. Higher values stick closer to the prompt but may reduce creativity.'
  },
  {
    id: 'steps',
    label: 'Sampling Steps',
    min: 10,
    max: 100,
    step: 1,
    default: 20,
    description: 'Number of denoising steps. More steps generally improve quality but take longer to generate.'
  },
  {
    id: 'seed',
    label: 'Seed',
    min: -1,
    max: 2147483647,
    step: 1,
    default: -1,
    description: 'Random seed for generation. Use -1 for random, or set a specific number for reproducible results.'
  }
];

export const SliderGroup = () => {
  const [values, setValues] = useState<Record<string, number>>(
    sliderConfigs.reduce((acc, config) => ({ ...acc, [config.id]: config.default }), {})
  );

  const handleSliderChange = (id: string, newValue: number[]) => {
    setValues(prev => ({ ...prev, [id]: newValue[0] }));
  };

  const handleReset = () => {
    const defaultValues = sliderConfigs.reduce((acc, config) => ({ ...acc, [config.id]: config.default }), {});
    setValues(defaultValues);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generation Settings</CardTitle>
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {sliderConfigs.map((config) => (
          <div key={config.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">{config.label}</label>
                <HelpTip content={config.description} />
              </div>
              <span className="text-sm text-gray-400 bg-gray-900 px-2 py-1 rounded">
                {values[config.id]}
              </span>
            </div>
            <Slider
              value={[values[config.id]]}
              onValueChange={(value) => handleSliderChange(config.id, value)}
              min={config.min}
              max={config.max}
              step={config.step}
              className="w-full"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
