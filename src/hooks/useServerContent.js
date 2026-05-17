import { useState, useCallback } from 'react';

export function useServerContent(endpoint, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/content${endpoint}`);
      if (!response.ok) throw new Error('API Error');
      const text = await response.text();
      if (text.startsWith('<')) throw new Error('Not JSON (Vite Fallback)');
      setData(JSON.parse(text));
    } catch (error) {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const save = useCallback(async (item) => {
    try {
      const response = await fetch(`/api/content${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      
      if (item.id) {
        // Update
        setData(data.map(d => d.id === item.id ? result : d));
      } else {
        // Create
        setData([...data, result]);
      }
      return result;
    } catch (error) {
      console.error(`Error saving to ${endpoint}:`, error);
    }
  }, [endpoint, data]);

  const remove = useCallback(async (id) => {
    try {
      await fetch(`/api/content${endpoint}/${id}`, { method: 'DELETE' });
      setData(data.filter(d => d.id !== id));
    } catch (error) {
      console.error(`Error deleting from ${endpoint}:`, error);
    }
  }, [endpoint, data]);

  return { data, loading, load, save, remove, setData };
}
