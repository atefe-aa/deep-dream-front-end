import { useState, useEffect } from "react";

// Custom hook for synchronizing state with local storage
export function useLocalStorageState(key:string, defaultValue = {}) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });

  useEffect(() => {
    // Handler to call when local storage changes
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // Function to manually update the local storage and state
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}
