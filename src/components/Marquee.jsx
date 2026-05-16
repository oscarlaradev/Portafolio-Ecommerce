import React from 'react';
import { StarFour } from '@phosphor-icons/react';

const Marquee = () => {
    const textItems = [
        "UI/UX PRO", "ANIMACIONES FLUIDAS", "AUREUS", "CÓDIGO LIMPIO"
    ];

    return (
        <div className="w-full bg-[#7C3AED] text-white py-4 md:py-6 rotate-[-2deg] my-20 scale-110 overflow-hidden relative z-20 shadow-[0_0_50px_rgba(124,58,237,0.18)]">
            <div className="marquee-container flex w-max will-change-transform">
                {[0, 1].map((block) => (
                    <div
                        key={block}
                        className="flex shrink-0 items-center whitespace-nowrap font-display font-black text-2xl md:text-4xl uppercase tracking-widest pr-8"
                    >
                        {textItems.map((text, i) => (
                            <React.Fragment key={i}>
                                <span className="px-8">{text}</span>
                                <StarFour weight="fill" className="mx-8 shrink-0" />
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                .marquee-container {
                    animation: marquee 18s linear infinite;
                }

                @keyframes marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
            `}} />
        </div>
    );
};

export default Marquee;