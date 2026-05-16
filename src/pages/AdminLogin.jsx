import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKey, Envelope } from '@phosphor-icons/react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) throw new Error(data.error || 'Login failed');
      navigate('/admin');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#F8F7FF] flex items-center justify-center px-6 py-12">
      <div className="relative max-w-3xl w-full">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#C4B5FD] opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#A855F7] to-[#DDD6FE] opacity-10 blur-3xl" />

        <div className="mx-auto w-full max-w-md transform rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-md ring-1 ring-[#EEE7FF]">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" fill="rgba(255,255,255,0.12)" />
                <path d="M7 12a5 5 0 0 1 5-5v10a5 5 0 0 1-5-5z" fill="white" />
              </svg>
            </div>
            <h1 className="text-xl font-display font-black uppercase tracking-tight text-[#1E1B4B]">Aureus Admin</h1>
            <p className="mt-1 text-sm text-[#1E1B4B]/60">Accede al panel privado para gestionar leads y métricas</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/55">Correo</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C3AED]/80"><Envelope size={16} weight="bold" /></span>
                <input
                  aria-label="email"
                  type="email"
                  placeholder="admin@tudominio.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#EEE7FF] bg-[#F8F7FF] px-12 py-3 text-[#1E1B4B] placeholder:text-[#1E1B4B]/35 focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/55">Contraseña</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C3AED]/80"><LockKey size={16} weight="bold" /></span>
                <input
                  aria-label="password"
                  type={show ? 'text' : 'password'}
                  maxLength={255}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#EEE7FF] bg-[#F8F7FF] px-12 py-3 text-[#1E1B4B] placeholder:text-[#1E1B4B]/35 focus:border-[#7C3AED] focus:outline-none"
                />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm text-[#1E1B4B]/60 hover:text-[#1E1B4B]">
                  {show ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </label>

            {error && <div role="alert" className="rounded-md bg-red-50 py-2 px-3 text-sm text-red-700">{error}</div>}

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-[#1E1B4B]/70">
                <input type="checkbox" className="h-4 w-4 rounded border-[#EEE7FF] text-[#7C3AED]" />
                <span>Recuérdame</span>
              </label>
              <span className="text-xs text-[#1E1B4B]/45">Sin recuperación automática</span>
            </div>

            <div>
              <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#A855F7] px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60">
                {loading ? 'Entrando...' : 'Entrar al panel'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-[#1E1B4B]/50">Acceso restringido — sólo personal autorizado.</p>
        </div>
      </div>
    </div>
  );
}
