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
            .then((res) => {
                if (!res.ok) throw new Error('Error al conectar con la API');
                return res.json();
            })
            .then((serverData) => {
                if (serverData && (Array.isArray(serverData) ? serverData.length > 0 : Object.keys(serverData).length > 0)) {
                    setData(serverData);
                }
            })
            .catch((err) => console.error(`Error cargando ${key}:`, err))
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