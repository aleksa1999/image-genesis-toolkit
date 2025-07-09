
import { useReducer, useCallback } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

type HistoryAction<T> = 
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET'; payload: T }
  | { type: 'CLEAR'; payload: T };

const MAX_HISTORY_SIZE = 25;

function historyReducer<T>(state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO':
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };

    case 'REDO':
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };

    case 'SET':
      if (present === action.payload) return state;
      const newPastWithLimit = [...past, present].slice(-MAX_HISTORY_SIZE);
      return {
        past: newPastWithLimit,
        present: action.payload,
        future: [],
      };

    case 'CLEAR':
      return {
        past: [],
        present: action.payload,
        future: [],
      };

    default:
      return state;
  }
}

export const useHistoryReducer = <T>(initialState: T) => {
  const [state, dispatch] = useReducer(historyReducer<T>, {
    past: [],
    present: initialState,
    future: [],
  });

  const setState = useCallback((newState: T) => {
    dispatch({ type: 'SET', payload: newState });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const clear = useCallback((newState: T) => {
    dispatch({ type: 'CLEAR', payload: newState });
  }, []);

  return {
    state: state.present,
    setState,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    clear,
  };
};
