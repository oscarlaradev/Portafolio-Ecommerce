import { useEffect, useState } from 'react';
import { createTimeline, stagger } from 'animejs';

const Preloader = ({ onComplete }) => {
    const [progressText, setProgressText] = useState('0%');

    useEffect(() => {
        const loaderTimeline = createTimeline({ 
            ease: 'outExpo',
            onComplete: () => {
                if(onComplete) onComplete();
            }
        });
        
        loaderTimeline
            .add('.load-char', {
                translateY: ['100%', '0%'],
                opacity: [0, 1],
                duration: 400,
                delay: stagger(40)
            })
            .add('#loader-progress', {
                width: ['0%', '100%'],
                duration: 400,
                ease: 'inOutCirc',
                onUpdate: (animation) => {
                    const progress = animation.progress <= 1 ? animation.progress * 100 : animation.progress;
                    setProgressText(`${Math.round(progress)}%`);
                }
            })
            .add('#loader', {
                translateY: '-100%',
                duration: 500,
                ease: 'inOutQuart',
                delay: 100
            });

        loaderTimeline.play();
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