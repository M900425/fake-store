import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
    const [storedValue, setStoredValue] = useState(() => {
        return localStorage.getItem(key) || initialValue;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(localStorage.getItem(key) || initialValue);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, initialValue]);

    return storedValue;
}
