const PageHero = ({ eyebrow, title, description, ctaLabel, ctaHref, stats = [], note, onCtaClick }) => {
    return (
        <section className="min-h-[70vh] w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 relative pt-24 pb-16">
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DDD6FE]/35 blur-3xl"></div>
                <div className="absolute top-20 right-0 h-64 w-64 rounded-full bg-[#C4B5FD]/35 blur-3xl"></div>
            </div>

            <div className="w-full max-w-6xl relative z-10">
                <p className="text-[#7C3AED] uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[#7C3AED] block"></span>
                    {eyebrow}
                </p>

                <h1 className="font-display text-[14vw] md:text-[8vw] leading-[0.86] font-black uppercase tracking-tighter relative w-full max-w-5xl text-balance">
                    {title}
                </h1>

                <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8 items-end w-full border-t border-[#DDD6FE] pt-8">
                    <div className="space-y-6">
                        <p className="text-[#1E1B4B]/75 text-xl md:text-2xl leading-snug font-light max-w-3xl">
                            {description}
                        </p>
                        {note && <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[#1E1B4B]/45">{note}</p>}
                    </div>

                    <div className="flex flex-col gap-4">
                        {stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="rounded-2xl border border-[#DDD6FE] bg-white shadow-sm px-5 py-4">
                                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#1E1B4B]/45 mb-2">{stat.label}</p>
                                        <p className="font-display text-xl md:text-2xl font-black uppercase text-[#1E1B4B]">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {ctaLabel && ctaHref && (
                            <a
                                href={ctaHref}
                                onClick={(e) => {
                                    if (onCtaClick) {
                                        e.preventDefault();
                                        onCtaClick().finally(() => {
                                            window.location.href = ctaHref;
                                        });
                                    }
                                }}
                                className="group relative inline-flex items-center justify-center px-8 py-5 font-bold text-white transition-all duration-300 bg-[#7C3AED] rounded-full hover:bg-[#6D28D9] hover:scale-[1.02] interactive-hover overflow-hidden w-full shadow-lg shadow-[#7C3AED]/20"
                            >
                                <span className="relative text-sm md:text-base font-display uppercase tracking-wider">{ctaLabel}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageHero;