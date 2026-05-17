import { useEffect, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const [progressText, setProgressText] = useState('0%');

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if(onComplete) onComplete();
            }
        });
        
        tl.fromTo('.load-char', 
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.4, stagger: 0.04, ease: 'expo.out' }
        )
        .fromTo('#loader-progress', 
            { width: '0%' },
            { 
                width: '100%', 
                duration: 0.4, 
                ease: 'circ.inOut',
                onUpdate: function() {
                    setProgressText(`${Math.round(this.progress() * 100)}%`);
                }
            }
        )
        .to('#loader', 
            { y: '-100%', duration: 0.5, ease: 'quart.inOut' },
            "+=0.1"
        );

    }, [onComplete]);

    return (
        <div id="loader" className="fixed inset-0 bg-[#050505] z-[100000] flex flex-col justify-center items-center pointer-events-none">
            <div className="font-display text-4xl md:text-6xl font-black tracking-widest uppercase overflow-hidden flex">
                {'AUREUS'.split('').map((char, index) => {
                    let colorClass = "text-white";
                    if (index === 4) colorClass = "text-purple-400";
                    if (index === 5) colorClass = "text-blue-400";
                    return (
                        <span key={index} className={`load-char inline-block opacity-0 translate-y-full ${colorClass}`}>
                            {char}
                        </span>
                    );
                })}
            </div>
            <div className="w-64 h-[2px] bg-[#0a0a0a]/10 mt-6 overflow-hidden relative">
                <div id="loader-progress" className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 w-0"></div>
            </div>
            <div className="mt-4 text-xs font-mono text-gray-500 tracking-widest uppercase">
                Iniciando sistema... {progressText}
            </div>
        </div>
    );
};

export default Preloader;