import { useState, useEffect } from 'react';

export function useAdminStorage(key, initialValue) {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(true);

    // Mapear la clave que usa React al endpoint correcto en Express
    const endpointMap = {
        'projects': 'projects',
        'stack': 'stack',
        'contentMeta': 'content-meta'
    };
    const endpoint = `/api/content/${endpointMap[key] || key}`;

    useEffect(() => {
        fetch(endpoint, {
            credentials: 'include'
        })
            .then(async (res) => {
                if (!res.ok) throw new Error('API Error');
                const text = await res.text();
                if (text.startsWith('<')) throw new Error('Not JSON (Vite Fallback)');
                return JSON.parse(text);
            })
            .then((serverData) => {
                if (serverData && (Array.isArray(serverData) ? serverData.length > 0 : Object.keys(serverData).length > 0)) {
                    setData(serverData);
                }
            })
            .catch(() => {
                // Silently fail in local dev without Vercel CLI
            })
            .finally(() => setLoading(false));
    }, [endpoint, key]);

    const saveData = async (newData) => {
        setData(newData); 
        
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
                credentials: 'include'
            });
        } catch (error) {
            console.error(`Error guardando ${key}:`, error);
        }
    };

    return [data, saveData, loading];
}