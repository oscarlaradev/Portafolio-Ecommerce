import Footer from '../sections/Footer.jsx';
import PageHero from '../components/PageHero.jsx';

const ContactPage = () => {
    return (
        <>
            <PageHero
                eyebrow="CONTACTO"
                title={<>Inicia la Secuencia</>}
                description="Si tienes una idea o proyecto, aquí es donde empieza."
                ctaLabel="WhatsApp directo"
                ctaHref="https://wa.me/528331119884"
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
                        <article key={item.title} className="scroll-anim opacity-0 translate-y-10 rounded-3xl border border-[#DDD6FE] bg-white shadow-sm p-6 md:p-8">
                            <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-4">{item.title}</p>
                            <p className="font-display text-xl md:text-2xl font-black uppercase mb-3">{item.value}</p>
                            <p className="text-[#1E1B4B]/70 leading-relaxed">{item.hint}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 rounded-[2rem] border border-[#DDD6FE] bg-gradient-to-r from-[#FFFFFF] via-[#F8F7FF] to-[#EEE7FF] p-8 md:p-10 scroll-anim opacity-0 translate-y-10 shadow-sm" data-delay="120">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#1E1B4B]/45 mb-4">Mensaje recomendado</p>
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