import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Cube, Triangle, Hexagon, Sphere, ArrowUpRight } from '@phosphor-icons/react';
import { useContentMeta } from '../hooks/useContentData.js';

const ProjectCard = ({ index, title, desc, stack, number, artClass, Icon, delay, overlayClass, iconColor }) => {
    const cardRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const inner = innerRef.current;
        if(window.innerWidth > 768 && card && inner) {
             const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                animate(inner, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 100,
                    ease: 'linear'
                });
            };
            const handleMouseLeave = () => {
                animate(inner, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 600,
                    ease: 'outExpo'
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            }
        }
    }, []);

    return (
        <div ref={cardRef} className={`project-card scroll-anim opacity-0 translate-y-20 perspective-[1000px] ${index % 2 !== 0 ? 'md:mt-32' : ''}`} data-delay={delay}>
            <div ref={innerRef} className="project-card-inner flex flex-col h-full transform-style-3d will-change-transform translate-z-[30px] border border-[#DDD6FE] bg-white rounded-3xl overflow-hidden hover:border-[#C4B5FD] transition-colors duration-500 shadow-[0_18px_40px_rgba(124,58,237,0.08)]">
                <div className="project-image-wrapper aspect-[16/10] bg-[#F8F7FF] flex items-center justify-center relative overflow-hidden group">
                    <div className={`art-layer absolute inset-0 bg-gradient-to-tr ${artClass}`}></div>
                    {overlayClass}
                    <Icon weight="duotone" className={`text-8xl ${iconColor} z-10 opacity-70 drop-shadow-[0_0_30px_currentColor]`} />
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
                        <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono border border-[#DDD6FE] text-[#1E1B4B]">{number}</span>
                        <div className="flex gap-2">
                            {stack.map((s, i) => (
                                <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${i===0 ? 'bg-[#7C3AED] text-white' : 'bg-white/80 backdrop-blur-md text-[#1E1B4B] border border-[#DDD6FE]'}`}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-6 mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-3xl font-display font-bold mb-2 text-[#1E1B4B]">{title}</h3>
                            <p className="text-[#1E1B4B]/70">{desc}</p>
                        </div>
                        <a href="#" className={`w-14 h-14 shrink-0 rounded-full border border-[#DDD6FE] flex items-center justify-center transition-all interactive-hover text-[#1E1B4B]
                            ${index===0 ? 'hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white' : 
                              index===1 ? 'hover:bg-[#C4B5FD] hover:border-[#C4B5FD]' :
                              index===2 ? 'hover:bg-[#DDD6FE] hover:border-[#DDD6FE]' : 'hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white'}`}>
                            <ArrowUpRight weight="bold" className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Exhibicion = () => {
    const [projects, setProjects] = useState([]);
    const [contentMeta] = useContentMeta();

    useEffect(() => {
        // Load projects from server
        fetch('/api/content/projects')
            .then(r => r.json())
            .then(data => setProjects(data))
            .catch(() => setProjects([]));
    }, []);

    const iconMap = { Cube, Triangle, Hexagon, Sphere };
    const artClasses = ["from-[#F5F3FF] to-[#DDD6FE]", "from-[#FFFFFF] to-[#EDE9FE]", "from-[#FFFFFF] to-[#F3E8FF]", "from-[#F8F7FF] to-[#E9D5FF]"];
    const icons = [Cube, Triangle, Hexagon, Sphere];
    const iconColors = ["text-[#7C3AED]", "text-[#A855F7]", "text-[#6D28D9]", "text-[#7C3AED]"];
    const overlayClasses = [
        <div key="0" className="art-layer absolute w-[150%] h-[150%] border-[1px] border-[#C4B5FD]/40 rounded-full top-[-50%] left-[-20%] animate-pulse"></div>,
        <><div key="1a" className="art-layer absolute w-full h-[1px] bg-[#7C3AED]/25 rotate-45"></div><div key="1b" className="art-layer absolute w-full h-[1px] bg-[#7C3AED]/25 -rotate-45"></div></>,
        <div key="2" className="art-layer absolute inset-8 border border-dashed border-[#7C3AED]/25 rounded-full"></div>,
        <div key="3" className="art-layer absolute w-[80%] h-[80%] bg-[#C4B5FD]/30 blur-2xl rounded-full"></div>,
    ];

    return (
        <section id="exhibicion" className="py-20 px-6 md:px-12 lg:px-24 relative z-10 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 w-full">
                <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight">{contentMeta.archiveTitle}</h2>
                <div className="hidden md:block h-[1px] bg-[#DDD6FE] flex-grow mb-6 mx-10"></div>
                <p className="text-[#1E1B4B]/70 max-w-sm md:mb-4 text-lg">{contentMeta.archiveDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
                {projects.map((p, i) => (
                    <ProjectCard 
                        key={p.id} 
                        index={i} 
                        title={p.title} 
                        desc={p.desc} 
                        stack={p.stack} 
                        number={String(i + 1).padStart(2, '0')} 
                        artClass={artClasses[i % artClasses.length]} 
                        Icon={icons[i % icons.length]} 
                        iconColor={iconColors[i % iconColors.length]} 
                        overlayClass={overlayClasses[i % overlayClasses.length]} 
                        delay={(i%2)*200} 
                    />
                ))}
            </div>
        </section>
    );
};

export default Exhibicion;