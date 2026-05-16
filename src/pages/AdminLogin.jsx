import { useState } from 'react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirigir al dashboard administrador y recargar contexto de sesión
                window.location.href = '/admin';
            } else {
                const data = await response.json();
                setError(data.error || 'Error al iniciar sesión. Revisa tus credenciales.');
            }
        } catch (err) {
            setError('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="w-full max-w-md glass-panel-heavy rounded-3xl p-10 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-2 text-glow">Aureus</h1>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Secure Control Center</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                        <p className="text-red-400 text-sm text-center font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 bg-black/40 text-white placeholder-gray-600 transition-colors"
                            placeholder="admin@aureus.local"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 bg-black/40 text-white placeholder-gray-600 transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs tracking-widest mt-4"
                    >
                        {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;