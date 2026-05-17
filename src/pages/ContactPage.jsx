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

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 mt-8">
                    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0a0a0a] to-[#F8F7FF] p-8 md:p-10 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">Inicia el proceso</p>
                            <p className="text-2xl md:text-4xl font-display font-black uppercase leading-tight">
                                Transforma tu visión en una experiencia digital premium.
                            </p>
                        </div>
                        <div className="mt-8 space-y-4 text-gray-400 text-sm">
                            <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-600"></span> Respuesta en menos de 24h.</p>
                            <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-600"></span> Trato directo y sin intermediarios.</p>
                            <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-600"></span> Evaluación honesta de viabilidad.</p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-10 shadow-sm scroll-anim opacity-0 translate-y-10" data-delay="120">
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target;
                            const btn = form.querySelector('button[type="submit"]');
                            const originalText = btn.innerText;
                            btn.innerText = 'Enviando...';
                            btn.disabled = true;

                            const formData = new FormData(form);
                            const data = Object.fromEntries(formData.entries());
                            
                            try {
                                await fetch('/api/content/leads', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data)
                                });
                                btn.innerText = 'Enviado con éxito';
                                btn.classList.replace('bg-purple-600', 'bg-green-600');
                                form.reset();
                                setTimeout(() => {
                                    btn.innerText = originalText;
                                    btn.classList.replace('bg-green-600', 'bg-purple-600');
                                    btn.disabled = false;
                                }, 3000);
                            } catch (err) {
                                btn.innerText = 'Error. Intenta de nuevo';
                                btn.disabled = false;
                            }
                        }} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-gray-500">Nombre completo</span>
                                    <input required name="name" type="text" placeholder="Ej. Ana García" className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/5 px-4 py-3 text-white outline-none transition focus:border-[#7C3AED]" />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-gray-500">Email o WhatsApp</span>
                                    <input required name="email" type="text" placeholder="ana@empresa.com" className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/5 px-4 py-3 text-white outline-none transition focus:border-[#7C3AED]" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-gray-500">¿Qué quieres construir?</span>
                                <textarea required name="project" rows="4" placeholder="Describe tu idea, el problema que resuelve y cualquier referencia visual..." className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/5 px-4 py-3 text-white outline-none transition focus:border-[#7C3AED] resize-none"></textarea>
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-gray-500">Presupuesto estimado (Opcional)</span>
                                <select name="budget" className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/5 px-4 py-3 text-white outline-none transition focus:border-[#7C3AED] appearance-none">
                                    <option value="Por definir" className="bg-[#0a0a0a]">Por definir</option>
                                    <option value="< $1,000 USD" className="bg-[#0a0a0a]">Menos de $1,000 USD</option>
                                    <option value="$1,000 - $3,000 USD" className="bg-[#0a0a0a]">$1,000 - $3,000 USD</option>
                                    <option value="> $3,000 USD" className="bg-[#0a0a0a]">Más de $3,000 USD</option>
                                </select>
                            </label>
                            <button type="submit" className="mt-2 w-full rounded-full bg-purple-600 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98]">
                                Enviar Propuesta
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactPage;