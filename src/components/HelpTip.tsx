
import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HelpTipProps {
  content: string;
}

export const HelpTip: React.FC<HelpTipProps> = ({ content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center">
            <Info className="h-4 w-4 text-blue-400 hover:text-blue-300 transition-colors" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[320px] bg-gray-800 border-gray-600 text-white">
          <p className="text-sm leading-relaxed">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
