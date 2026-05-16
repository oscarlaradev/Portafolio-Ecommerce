import { useState } from 'react';

export default function AdminReset() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [via, setVia] = useState('email');
  const [message, setMessage] = useState(null);

  async function requestReset(e) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, via }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setMessage('Código enviado. Revisa tu email o WhatsApp.');
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-8 shadow">
      <h2 className="mb-4 text-2xl font-bold">Recuperar contraseña</h2>
      <form onSubmit={requestReset} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm">Phone (WhatsApp)</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm">Enviar vía</label>
          <select value={via} onChange={(e) => setVia(e.target.value)} className="w-full rounded-md border px-3 py-2">
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>
        {message && <div className="text-sm text-[#1E1B4B]/80">{message}</div>}
        <div className="flex justify-end">
          <button className="rounded bg-[#7C3AED] px-4 py-2 text-white">Enviar código</button>
        </div>
      </form>
      <hr className="my-6" />
      <ResetConfirm />
    </div>
  );
}

function ResetConfirm() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    if (newPassword.length > 255) {
      setMsg('La contraseña no puede tener más de 255 caracteres.');
      return;
    }
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setMsg('Contraseña restablecida. Ahora puedes iniciar sesión.');
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Confirmar código</h3>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        <input placeholder="Código" value={token} onChange={(e) => setToken(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        <input placeholder="Nueva contraseña" type="password" value={newPassword} maxLength={255} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        {msg && <div className="text-sm text-[#1E1B4B]/80">{msg}</div>}
        <div className="flex justify-end">
          <button className="rounded bg-[#7C3AED] px-4 py-2 text-white">Restablecer</button>
        </div>
      </form>
    </div>
  );
}
