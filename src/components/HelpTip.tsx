
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Info } from 'lucide-react';

interface HelpTipProps {
  content: string;
}

export const HelpTip: React.FC<HelpTipProps> = ({ content }) => {
  return (
    <Tippy
      content={<div className="max-w-[320px] text-sm leading-relaxed">{content}</div>}
      placement="top"
      theme="dark"
      arrow={true}
      delay={[300, 0]}
    >
      <button className="inline-flex items-center justify-center">
        <Info className="h-4 w-4 text-blue-400 hover:text-blue-300 transition-colors" />
      </button>
    </Tippy>
  );
};
