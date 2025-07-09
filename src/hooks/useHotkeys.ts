
import { useEffect } from 'react';

export const useHotkeys = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Enter for Generate
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        const generateButton = document.querySelector('button:contains("Generate")') as HTMLButtonElement;
        if (generateButton) {
          generateButton.click();
        }
        console.log('Generate image shortcut triggered');
      }

      // Shift+S for Save Settings
      if (event.shiftKey && event.key === 'S') {
        event.preventDefault();
        const saveButton = document.querySelector('button:contains("Save")') as HTMLButtonElement;
        if (saveButton) {
          saveButton.click();
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
  }, []);
};
