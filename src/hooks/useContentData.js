import { useAdminStorage } from './useAdminStorage.js';

const DEFAULT_PROJECTS = [
    { id: 1, title: "Nova Analytics", desc: "Dashboard financiero cuántico.", stack: ["React", "Three.js"] },
    { id: 2, title: "E-Commerce X", desc: "Micro-interacciones en retail.", stack: ["Vue.js", "GSAP"] },
    { id: 3, title: "Creative Agency", desc: "Sitio inmersivo disruptivo.", stack: ["Next.js", "AnimeJS"] },
    { id: 4, title: "Lumina AI", desc: "Interfaz para inteligencia artificial.", stack: ["Svelte", "Tailwind"] },
];

const DEFAULT_STACK = [
    { id: 1, name: 'HTML/CSS' },
    { id: 2, name: 'JavaScript' },
    { id: 3, name: 'React' },
    { id: 4, name: 'Next.js' },
    { id: 5, name: 'Tailwind' },
    { id: 6, name: 'Anime.js' },
    { id: 7, name: 'Three.js' },
    { id: 8, name: 'Git' },
];

export function useProjects() {
    return useAdminStorage('projects', DEFAULT_PROJECTS);
}

export function useStack() {
    return useAdminStorage('stack', DEFAULT_STACK);
}

export function useContentMeta() {
    return useAdminStorage('contentMeta', {
        archiveTitle: 'El Archivo',
        archiveDesc: 'Una selección de proyectos digitales donde la forma sigue a la función de manera espectacular.',
        stackTitle: 'Arsenal Tecnológico',
    });
}
