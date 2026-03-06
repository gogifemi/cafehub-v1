import { useState } from 'react';

const STORAGE_KEY = 'cafehub-welcome-completed';

const readInitialValue = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'true';
  } catch {
    return false;
  }
};

export const useWelcomeState = () => {
  const [hasCompletedWelcome, setHasCompletedWelcome] = useState<boolean>(() => readInitialValue());

  const markWelcomeCompleted = () => {
    setHasCompletedWelcome(true);

    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore storage errors
    }
  };

  const resetWelcome = () => {
    setHasCompletedWelcome(false);

    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  return {
    hasCompletedWelcome,
    markWelcomeCompleted,
    resetWelcome
  };
};

