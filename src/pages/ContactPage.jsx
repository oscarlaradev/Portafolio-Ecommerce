import Footer from '../sections/Footer.jsx';
import PageHero from '../components/PageHero.jsx';
import { useEffect } from 'react';


const ContactPage = () => {
    useEffect(() => {
        fetch('/api/stats/record', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'visits', increment: 1, meta: JSON.stringify({ page: '/contacto' }) }) }).catch(() => {});
    }, []);

    const handleCta = async () => {
        try {
            await fetch('/api/stats/record', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'leads', increment: 1, meta: JSON.stringify({ via: 'whatsapp', page: '/contacto' }) }) });
        } catch {
            // ignore
        }
    };

    return (
        <>
            <PageHero
                eyebrow="CONTACTO"
                title={<>Inicia la Secuencia</>}
                description="Si tienes una idea o proyecto, aquí es donde empieza."
                ctaLabel="WhatsApp directo"
                ctaHref="https://wa.me/528331119884"
                onCtaClick={handleCta}
                note="Respuesta directa para proyectos, colaboraciones y dirección creativa."
                stats={[
                    { label: 'Respuesta', value: 'Rápida' },
                    { label: 'Disponibilidad', value: 'Abierta' },
                ]}
            />

            <section className="px-6 md:px-12 lg:px-24 pb-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'WhatsApp',
                            value: '833 111 9884',
                            hint: 'Para propuestas, freelancing y dirección creativa.',
                        },
                        {
                            title: 'Tiempo de respuesta',
                            value: '< 24 h',
                            hint: 'Si el mensaje es claro, la respuesta también lo será.',
                        },
                        {
                            title: 'Formato ideal',
                            value: 'Breve + concreto',
                            hint: 'Objetivo, alcance, referencia visual y fecha.',
                        },
                    ].map((item) => (
                        <article key={item.title} className="scroll-anim opacity-0 translate-y-10 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-sm p-6 md:p-8">
                            <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">{item.title}</p>
                            <p className="font-display text-xl md:text-2xl font-black uppercase mb-3">{item.value}</p>
                            <p className="text-gray-400 leading-relaxed">{item.hint}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0a0a0a] via-purple-900/20 to-[#0a0a0a] p-8 md:p-10 scroll-anim opacity-0 translate-y-10 shadow-sm" data-delay="120">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">Mensaje recomendado</p>
                    <p className="text-2xl md:text-4xl font-display font-black uppercase leading-tight max-w-5xl">
                        Cuéntame qué quieres construir, qué problema resuelve y qué fecha tienes en mente.
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactPage;