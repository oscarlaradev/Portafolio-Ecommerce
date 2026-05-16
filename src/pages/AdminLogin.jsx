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
                setError(data.message || 'Error al iniciar sesión. Revisa tus credenciales.');
            }
        } catch (err) {
            setError('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F3FF] flex items-center justify-center p-6 text-[#1E1B4B]">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-[#DDD6FE]">
                <h1 className="text-2xl font-black uppercase mb-6 text-center">Aureus Admin</h1>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-[#1E1B4B]/70 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#DDD6FE] focus:outline-none focus:border-[#7C3AED] bg-[#F8F7FF]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-[#1E1B4B]/70 mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#DDD6FE] focus:outline-none focus:border-[#7C3AED] bg-[#F8F7FF]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#7C3AED] text-white font-semibold py-3 rounded-xl hover:bg-[#6D28D9] transition-colors"
                    >
                        {loading ? 'Iniciando...' : 'Entrar al Control Center'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;