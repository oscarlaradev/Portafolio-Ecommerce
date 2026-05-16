import { FileCode, FileJs, Atom, CaretUp, Wind, ShootingStar, Cube, GitBranch } from '@phosphor-icons/react';

const Stack = () => {
    const techs = [
        { name: 'HTML/CSS', icon: FileCode, color: 'hover:text-[#7C3AED]' },
        { name: 'JavaScript', icon: FileJs, color: 'hover:text-[#A855F7]' },
        { name: 'React', icon: Atom, color: 'hover:text-[#7C3AED]' },
        { name: 'Next.js', icon: CaretUp, color: 'hover:text-[#1E1B4B]' },
        { name: 'Tailwind', icon: Wind, color: 'hover:text-[#7C3AED]' },
        { name: 'Anime.js', icon: ShootingStar, color: 'hover:text-[#A855F7]' },
        { name: 'Three.js', icon: Cube, color: 'hover:text-[#1E1B4B]' },
        { name: 'Git', icon: GitBranch, color: 'hover:text-[#7C3AED]' },
    ];

    return (
        <section id="stack" className="py-32 px-6 md:px-12 lg:px-24 w-full relative z-10 bg-white/75 backdrop-blur-sm border-y border-[#DDD6FE] my-20">
            <h2 className="text-center text-sm uppercase tracking-[0.5em] text-[#7C3AED] mb-16 scroll-anim opacity-0 translate-y-10">Arsenal Tecnológico</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-4 justify-items-center opacity-80 text-[#1E1B4B]">
                {techs.map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                    <div key={i} className={`scroll-anim opacity-0 translate-y-10 ${tech.color} transition-all hover:scale-125 duration-300 flex flex-col items-center gap-2`} data-delay={i * 100}>
                        <Icon weight="duotone" className="text-5xl" />
                        <span className="text-xs font-mono">{tech.name}</span>
                    </div>
                );})}
            </div>
        </section>
    );
};

export default Stack;