import * as Icons from '@phosphor-icons/react';
import { useContentMeta } from '../hooks/useContentData.js';

const STACK_DATA = [
    { id: 1, name: 'React', icon: 'Atom' },
    { id: 2, name: 'Vite', icon: 'Lightning' },
    { id: 3, name: 'Tailwind CSS', icon: 'Wind' },
    { id: 4, name: 'GSAP', icon: 'ShootingStar' },
    { id: 5, name: 'JavaScript', icon: 'FileJs' },
    { id: 6, name: 'Node.js', icon: 'Cube' },
    { id: 7, name: 'Git', icon: 'GitBranch' },
    { id: 8, name: 'Figma', icon: 'PenNib' }
];

const Stack = () => {
    const [contentMeta] = useContentMeta();

    const colors = ['hover:text-purple-400', 'hover:text-[#A855F7]', 'hover:text-purple-400', 'hover:text-white', 'hover:text-purple-400', 'hover:text-[#A855F7]', 'hover:text-white', 'hover:text-purple-400'];

    return (
        <section id="stack" className="py-32 px-6 md:px-12 lg:px-24 w-full relative z-10 bg-[#0a0a0a]/75 backdrop-blur-sm border-y border-white/10 my-20">
            <h2 className="text-center text-sm uppercase tracking-[0.5em] text-purple-400 mb-16 scroll-anim opacity-0 translate-y-10">{contentMeta.stackTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-4 justify-items-center opacity-80 text-white">
                {STACK_DATA.map((tech, i) => {
                    const Icon = Icons[tech.icon] || Icons.Cube;
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