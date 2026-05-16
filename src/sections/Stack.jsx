import { useEffect, useState } from 'react';
import { FileCode, FileJs, Atom, CaretUp, Wind, ShootingStar, Cube, GitBranch } from '@phosphor-icons/react';
import { useContentMeta } from '../hooks/useContentData.js';

const Stack = () => {
    const [techs, setTechs] = useState([]);
    const [contentMeta] = useContentMeta();

    useEffect(() => {
        // Load stack from server
        fetch('/api/content/stack')
            .then(r => r.json())
            .then(data => setTechs(data))
            .catch(() => setTechs([]));
    }, []);

    const icons = [FileCode, FileJs, Atom, CaretUp, Wind, ShootingStar, Cube, GitBranch];
    const colors = ['hover:text-[#7C3AED]', 'hover:text-[#A855F7]', 'hover:text-[#7C3AED]', 'hover:text-[#1E1B4B]', 'hover:text-[#7C3AED]', 'hover:text-[#A855F7]', 'hover:text-[#1E1B4B]', 'hover:text-[#7C3AED]'];

    return (
        <section id="stack" className="py-32 px-6 md:px-12 lg:px-24 w-full relative z-10 bg-white/75 backdrop-blur-sm border-y border-[#DDD6FE] my-20">
            <h2 className="text-center text-sm uppercase tracking-[0.5em] text-[#7C3AED] mb-16 scroll-anim opacity-0 translate-y-10">{contentMeta.stackTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-4 justify-items-center opacity-80 text-[#1E1B4B]">
                {techs.map((tech, i) => {
                    const Icon = icons[i % icons.length];
                    return (
                    <div key={tech.id} className={`scroll-anim opacity-0 translate-y-10 ${colors[i % colors.length]} transition-all hover:scale-125 duration-300 flex flex-col items-center gap-2`} data-delay={i * 100}>
                        <Icon weight="duotone" className="text-5xl" />
                        <span className="text-xs font-mono">{tech.name}</span>
                    </div>
                );})}
            </div>
        </section>
    );
};

export default Stack;