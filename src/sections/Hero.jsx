import { useEffect } from 'react';
import { createTimeline, stagger } from 'animejs';
import { ArrowDown } from '@phosphor-icons/react';

const SplitText = ({ text, className }) => (
    <div className={`overflow-hidden flex flex-wrap ${className}`}>
         {text.split('').map((char, index) => (
            <span key={index} className="hero-char inline-block opacity-0 translate-y-full">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))}
    </div>
);

const Hero = ({ isLoaded }) => {
    useEffect(() => {
        if (isLoaded) {
            const tl = createTimeline();
            tl.add('.hero-anim', {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                delay: stagger(150),
                ease: 'outQuart'
            })
            .add('.hero-char', {
                translateY: ['100%', '0%'],
                opacity: [0, 1],
                duration: 800,
                ease: 'outQuint',
                delay: stagger(20)
            }, '-=800');
        }
    }, [isLoaded]);

    return (
        <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 relative pt-20">
            <div className="w-full relative z-10">
                <p className="hero-anim opacity-0 text-[#7C3AED] uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[#7C3AED] block"></span>
                    Desarrollador Web Creativo
                </p>
                
                <h1 className="font-display text-[15vw] md:text-[11vw] leading-[0.85] font-black uppercase tracking-tighter relative w-full">
                    <SplitText text="Experiencias" />
                    <SplitText text="Digitales" className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600" />
                    <SplitText text="Sin Límites" />
                </h1>
                
                <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 w-full border-t border-[#DDD6FE] pt-10 hero-anim opacity-0">
                    <div className="max-w-2xl">
                        <p className="text-[#1E1B4B]/75 text-xl md:text-3xl leading-snug font-light">
                            Soy <strong className="text-[#1E1B4B] font-semibold">Oscar Lara</strong> (<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C4B5FD] font-bold">Aureus</span>). Codificando el futuro a través de interfaces ultraminimalistas, animaciones fluidas y rendimiento absoluto.
                        </p>
                    </div>
                    
                    <div className="shrink-0">
                        <a href="#exhibicion" className="group relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 font-bold text-[#1E1B4B] transition-all duration-300 bg-white border border-[#DDD6FE] rounded-full hover:border-[#7C3AED] interactive-hover overflow-hidden shadow-lg shadow-[#7C3AED]/10">
                            <span className="absolute inset-0 w-full h-full rounded-full opacity-0 bg-[#C4B5FD] group-hover:opacity-40 transition-opacity duration-500 scale-0 group-hover:scale-150 ease-out"></span>
                            <span className="relative flex flex-col items-center gap-2">
                                <ArrowDown weight="bold" className="text-3xl group-hover:animate-bounce" />
                                <span className="text-xs tracking-widest uppercase">Explorar</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;