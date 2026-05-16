import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, ChartLineUp, EnvelopeSimple, GlobeHemisphereWest, GearSix, ArrowSquareOut, ShieldCheck, List, SquaresFour } from '@phosphor-icons/react';

const updateOrCreateMeta = (selector, createAttributes, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        Object.entries(createAttributes).forEach(([attribute, attributeValue]) => {
            element.setAttribute(attribute, attributeValue);
        });
        document.head.appendChild(element);
    }

    if ('content' in element && value !== undefined) {
        element.setAttribute('content', value);
    }

    return element;
};

const AdminFrame = () => {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        document.title = 'Admin | Oscar Lara Aureus';
        updateOrCreateMeta('meta[name="robots"]', { name: 'robots' }, 'noindex,nofollow');
        updateOrCreateMeta('meta[name="description"]', { name: 'description' }, 'Panel de administración privado para gestionar contenido, leads y SEO del sitio de Oscar Lara.');
        updateOrCreateMeta('meta[name="theme-color"]', { name: 'theme-color' }, '#050505');

        let canonicalLink = document.head.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', `${window.location.origin}/admin`);

        document.body.classList.add('admin-mode');
        return () => document.body.classList.remove('admin-mode');
    }, []);

    useEffect(() => {
        // Protect admin: redirect to login if not authenticated
        fetch('/api/auth/session', { credentials: 'include' })
            .then((r) => r.json())
            .then((data) => {
                if (!data.authenticated) {
                    if (!window.location.pathname.startsWith('/admin/login')) {
                        window.location.replace('/admin/login');
                    }
                } else {
                    setIsChecking(false);
                }
            })
            .catch(() => {
                if (!window.location.pathname.startsWith('/admin/login')) {
                    window.location.replace('/admin/login');
                }
            });
    }, []);

    const navItems = [
        { to: '#overview', label: 'Overview', icon: SquaresFour },
        { to: '#analytics', label: 'Analytics', icon: ChartLineUp },
        { to: '#content', label: 'Contenido', icon: Layout },
        { to: '#leads', label: 'Leads', icon: EnvelopeSimple },
        { to: '#seo', label: 'SEO', icon: GlobeHemisphereWest },
    ];

    if (isChecking) {
        return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono text-xs uppercase tracking-widest">Verificando sesión...</div>;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
                <aside className="hidden lg:flex flex-col border-r border-white/10 bg-black/90 backdrop-blur-xl p-6 sticky top-0 h-screen">
                    <Link to="/" className="group flex items-center gap-3 pb-8 border-b border-white/5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
                            <ShieldCheck size={22} weight="bold" />
                        </div>
                        <div>
                            <p className="font-display text-lg font-black uppercase tracking-tight text-white">Aureus Admin</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Private Control Room</p>
                        </div>
                    </Link>

                    <nav className="mt-8 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.label}
                                    href={item.to}
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-400 transition-colors hover:bg-[#0a0a0a]/5 hover:text-purple-400"
                                >
                                    <Icon size={18} weight="bold" />
                                    <span className="font-medium">{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>

                    <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-black to-white/5 p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-purple-400">
                            <GearSix size={18} weight="bold" />
                            <span className="text-xs font-semibold uppercase tracking-[0.28em]">Estado</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                            Dashboard listo para operar con métricas, leads y contenido editable.
                        </p>
                        <Link
                            to="/"
                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                        >
                            Ver sitio público
                            <ArrowSquareOut size={16} weight="bold" />
                        </Link>
                    </div>
                </aside>

                <div className="flex min-w-0 flex-col">
                    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-8 lg:px-10">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-purple-400">Admin</p>
                                <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Control Center</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0a0a0a]/5">
                                    <List size={18} weight="bold" />
                                    Menú
                                </button>
                                <Link to="/contacto" className="hidden md:inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-colors hover:bg-purple-500">
                                    Leads directos
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-6 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminFrame;