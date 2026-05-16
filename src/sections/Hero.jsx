import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from '@phosphor-icons/react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

const SplitText = ({ text, className }) => (
    <div className={`overflow-hidden flex flex-wrap ${className}`}>
         {text.split('').map((char, index) => (
            <span key={index} className="hero-char inline-block translate-y-full opacity-0">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))}
    </div>
);

const HeroBackground = () => {
    return (
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
};

const Hero = ({ isLoaded }) => {
    const heroRef = useRef(null);

    useEffect(() => {
        if (isLoaded) {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.to('.hero-anim', {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.2,
                delay: 0.5
            }, 0)
            .to('.hero-char', {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                stagger: 0.03,
                ease: 'expo.out'
            }, 0.2);
        }
    }, [isLoaded]);

    return (
        <section ref={heroRef} className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 relative pt-20 bg-black">
            <HeroBackground />
            
            <div className="w-full relative z-10 mix-blend-difference">
                <p className="hero-anim opacity-0 translate-y-8 text-white uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[#0a0a0a] block"></span>
                    Creative Digital Studio
                </p>
                
                <h1 className="font-display text-[15vw] md:text-[11vw] leading-[0.85] font-black uppercase tracking-tighter relative w-full text-white">
                    <SplitText text="Experiencias" />
                    <SplitText text="Digitales" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400" />
                    <SplitText text="Sin Límites" />
                </h1>
                
                <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 w-full border-t border-white/20 pt-10 hero-anim opacity-0 translate-y-8">
                    <div className="max-w-2xl">
                        <p className="text-gray-300 text-xl md:text-3xl leading-snug font-light">
                            Soy <strong className="text-white font-semibold">Oscar Lara</strong> (<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">Aureus</span>). Codificando el futuro a través de interfaces ultraminimalistas, animaciones fluidas y rendimiento absoluto.
                        </p>
                    </div>
                    
                    <div className="shrink-0">
                        <a href="#exhibicion" className="group relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 font-bold text-white transition-all duration-500 bg-purple-600 rounded-full hover:bg-purple-500 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] backdrop-blur-md">
                            <span className="absolute inset-0 w-full h-full rounded-full opacity-0 bg-gradient-to-br from-purple-400/30 to-blue-400/30 group-hover:opacity-100 transition-opacity duration-500"></span>
                            <span className="relative flex flex-col items-center gap-2">
                                <ArrowDown weight="bold" className="text-3xl group-hover:animate-bounce" />
                                <span className="text-xs tracking-widest uppercase text-white font-black">Explorar</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;