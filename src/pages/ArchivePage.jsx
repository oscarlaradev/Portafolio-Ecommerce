import Exhibicion from '../sections/Exhibicion.jsx';
import PageHero from '../components/PageHero.jsx';

const ArchivePage = () => {
    return (
        <>
            <PageHero
                eyebrow="EXHIBICIÓN"
                title={<>El Archivo</>}
                description="Una selección de proyectos digitales donde la forma sigue a la función de manera espectacular."
                ctaLabel="Volver al inicio"
                ctaHref="/"
                note="Casos, interfaces y sistemas con foco en impacto visual y claridad funcional."
                stats={[
                    { label: 'Proyectos', value: '04' },
                    { label: 'Enfoque', value: 'Editorial UI' },
                ]}
            />

            <section className="px-6 md:px-12 lg:px-24 pb-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Dirección visual',
                            text: 'Cada caso prioriza jerarquía, contraste y ritmo para que la pantalla se lea en segundos.',
                        },
                        {
                            title: 'Interacción',
                            text: 'Los movimientos son sutiles, medidos y útiles. Nada de ruido por ruido.',
                        },
                        {
                            title: 'Entrega',
                            text: 'Piezas pensadas para escalar: componentes reutilizables, composición limpia y navegación clara.',
                        },
                    ].map((item) => (
                        <article key={item.title} className="scroll-anim opacity-0 translate-y-10 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-sm p-6 md:p-8">
                            <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">{item.title}</p>
                            <p className="text-gray-400 leading-relaxed text-base md:text-lg">{item.text}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0a0a0a] via-purple-900/20 to-[#0a0a0a] p-8 md:p-10 scroll-anim opacity-0 translate-y-10 shadow-sm" data-delay="120">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">Resumen</p>
                    <p className="text-2xl md:text-4xl font-display font-black uppercase leading-tight max-w-4xl">
                        El archivo funciona como una exhibición viva: piezas seleccionadas para mostrar criterio, consistencia y carácter.
                    </p>
                </div>
            </section>

            <Exhibicion />
        </>
    );
};

export default ArchivePage;