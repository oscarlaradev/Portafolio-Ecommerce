import { useState } from 'react';

const LeadForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-sm w-full max-w-lg mx-auto">
            <h3 className="text-xl font-display font-bold uppercase text-white mb-2">Comencemos tu proyecto</h3>
            <p className="text-gray-400 mb-6 text-sm">Déjanos tus datos y me pondré en contacto contigo de inmediato.</p>
            
            {status === 'success' && (
                <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6 text-sm">
                    ¡Mensaje enviado correctamente! Hablaremos pronto.
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Tu nombre *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#7C3AED] bg-[#0a0a0a]/5 text-sm"
                />
                <input
                    type="email"
                    placeholder="Tu correo electrónico *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#7C3AED] bg-[#0a0a0a]/5 text-sm"
                />
                <input
                    type="tel"
                    placeholder="Tu teléfono (Opcional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#7C3AED] bg-[#0a0a0a]/5 text-sm"
                />
                <textarea
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#7C3AED] bg-[#0a0a0a]/5 text-sm resize-none"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-[#6D28D9] transition-colors uppercase tracking-widest text-xs disabled:opacity-50"
                >
                    {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>
        </div>
    );
};

export default LeadForm;