
import { useEffect } from 'react';

export const useHotkeys = (onGenerate?: () => void, onSaveSettings?: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Enter for Generate
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        if (onGenerate) {
          onGenerate();
        } else {
          // Fallback to clicking the button
          const generateButton = document.querySelector('button:has-text("Generate Image")') as HTMLButtonElement;
          if (generateButton) {
            generateButton.click();
          }
        }
        console.log('Generate image shortcut triggered');
      }

      // Shift+S for Save Settings
      if (event.shiftKey && event.key === 'S') {
        event.preventDefault();
        if (onSaveSettings) {
          onSaveSettings();
        } else {
          // Fallback to clicking the button
          const saveButton = document.querySelector('button:has-text("Save Settings")') as HTMLButtonElement;
          if (saveButton) {
            saveButton.click();
          }
        }
        console.log('Save settings shortcut triggered');
      }

      // Ctrl+Z for Undo
      if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        console.log('Undo shortcut triggered');
      }

      // Ctrl+Y or Ctrl+Shift+Z for Redo
      if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'Z')) {
        event.preventDefault();
        console.log('Redo shortcut triggered');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onGenerate, onSaveSettings]);
};
