import Stack from '../sections/Stack.jsx';
import PageHero from '../components/PageHero.jsx';

const StackPage = () => {
    return (
        <>
            <PageHero
                eyebrow="STACK"
                title={<>Arsenal Tecnológico</>}
                description="Herramientas y procesos que sostienen interfaces rápidas, limpias y consistentes."
                ctaLabel="Ver archivo"
                ctaHref="/archivo"
                note="Selección curada de tecnologías orientadas a velocidad, animación y claridad visual."
                stats={[
                    { label: 'Tecnologías', value: '08' },
                    { label: 'Rendimiento', value: 'Optimizado' },
                ]}
            />

            <section className="px-6 md:px-12 lg:px-24 pb-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[
                        ['Core', 'React, Vite, routing y arquitectura modular para escalar sin fricción.'],
                        ['Motion', 'GSAP para entradas, microinteracciones y transición entre estados.'],
                        ['Delivery', 'Construcción simple, componentes claros y flujo de trabajo directo.'],
                        ['Quality', 'Lint, build y chequeo visual antes de cerrar cada cambio.'],
                    ].map(([label, text]) => (
                        <article key={label} className="scroll-anim opacity-0 translate-y-10 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-sm p-6 md:p-8">
                            <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">{label}</p>
                            <p className="text-gray-400 leading-relaxed">{text}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
                    <div className="scroll-anim opacity-0 translate-y-10 rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-10 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">Proceso</p>
                        <p className="text-2xl md:text-4xl font-display font-black uppercase leading-tight">
                            Sistema visual sobrio, motion controlado y decisiones pensadas para producción.
                        </p>
                    </div>
                    <div className="scroll-anim opacity-0 translate-y-10 rounded-[2rem] border border-white/10 bg-[#0a0a0a]/5 p-8 md:p-10 shadow-sm" data-delay="140">
                        <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">Prioridades</p>
                        <ul className="space-y-4 text-gray-400">
                            <li>Arquitectura clara.</li>
                            <li>Animaciones discretas.</li>
                            <li>Rendimiento estable.</li>
                            <li>Lectura editorial.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Stack />
        </>
    );
};

export default StackPage;