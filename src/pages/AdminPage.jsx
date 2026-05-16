import { useEffect, useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Cell,
    Line,
} from 'recharts';
import {
    ChartLineUp,
    Checks,
    EnvelopeSimple,
    FunnelSimple,
    GearSix,
    GlobeHemisphereWest,
    ListChecks,
    MagnifyingGlass,
    PencilSimple,
    RocketLaunch,
    TrendUp,
    Users,
    WhatsappLogo,
} from '@phosphor-icons/react';

let initialKpis = [
    { label: 'Leads activos', value: '—', delta: '', icon: Users },
    { label: 'Conversiones', value: '—', delta: '', icon: TrendUp },
    { label: 'Tiempo respuesta', value: '—', delta: '', icon: WhatsappLogo },
    { label: 'Tráfico orgánico', value: '—', delta: '', icon: GlobeHemisphereWest },
];

const trafficData = [
    { month: 'Jan', visits: 8400, leads: 72, sales: 11 },
    { month: 'Feb', visits: 9200, leads: 81, sales: 14 },
    { month: 'Mar', visits: 10800, leads: 93, sales: 16 },
    { month: 'Apr', visits: 11700, leads: 101, sales: 18 },
    { month: 'May', visits: 13300, leads: 124, sales: 22 },
    { month: 'Jun', visits: 14900, leads: 148, sales: 28 },
];

const sourceData = [
    { name: 'Google', value: 58 },
    { name: 'Instagram', value: 19 },
    { name: 'Referidos', value: 14 },
    { name: 'Facebook', value: 9 },
];

const stageData = [
    { name: 'Nuevo', value: 42 },
    { name: 'Contacto', value: 38 },
    { name: 'Propuesta', value: 33 },
    { name: 'Cerrado', value: 18 },
];

const leadRows = [
    { name: 'María Torres', project: 'Landing para clínica', source: 'Google', budget: '$1,800', status: 'Propuesta', updated: 'Hace 20 min' },
    { name: 'Carlos Méndez', project: 'Sitio corporativo', source: 'Referido', budget: '$3,400', status: 'Contacto', updated: 'Hace 1 h' },
    { name: 'Sofía Ramírez', project: 'Tienda online', source: 'Instagram', budget: '$4,200', status: 'Nuevo', updated: 'Hace 2 h' },
    { name: 'Javier Luna', project: 'Web de servicios', source: 'Google', budget: '$2,100', status: 'Cerrado', updated: 'Hace 6 h' },
    { name: 'Andrea Cruz', project: 'Rediseño portfolio', source: 'Facebook', budget: '$1,200', status: 'Propuesta', updated: 'Ayer' },
];

const activityFeed = [
    { title: 'SEO actualizado', text: 'La home ahora apunta a ventas de páginas web y sitios web.', time: '12 min' },
    { title: 'WhatsApp configurado', text: 'El CTA principal dirige a contacto directo con mensaje claro.', time: '35 min' },
    { title: 'Lead nuevo', text: 'Entrada orgánica desde Google con intención comercial alta.', time: '1 h' },
    { title: 'Publicación lista', text: 'Archivo y stack revisados para mantener una lectura premium.', time: '3 h' },
];

const leadColumns = [
    { accessorKey: 'name', header: 'Nombre' },
    { accessorKey: 'project', header: 'Proyecto' },
    { accessorKey: 'source', header: 'Origen' },
    { accessorKey: 'budget', header: 'Presupuesto' },
    { accessorKey: 'status', header: 'Estado' },
    { accessorKey: 'updated', header: 'Actualizado' },
];

const statusTone = {
    Nuevo: 'bg-[#EDE9FE] text-[#7C3AED]',
    Contacto: 'bg-[#F8F7FF] text-[#1E1B4B]',
    Propuesta: 'bg-[#DDD6FE] text-[#5B21B6]',
    Cerrado: 'bg-[#7C3AED] text-white',
};

const AdminPage = () => {
    const [query, setQuery] = useState('');
    const [headline, setHeadline] = useState('Venta de páginas web y sitios web profesionales');
    const [ctaLabel, setCtaLabel] = useState('WhatsApp directo');
    const [ctaMessage, setCtaMessage] = useState('Hola, quiero cotizar una página web profesional para mi negocio.');
    const [kpis, setKpis] = useState(initialKpis);

    // fetch real stats from backend
    useEffect(() => {
        fetch('/api/stats', { credentials: 'include' })
            .then((r) => r.json())
            .then((data) => {
                const leads = data.leads || 0;
                const visits = data.visits || 0;
                setKpis([
                    { label: 'Leads activos', value: String(leads), delta: '+0%', icon: Users },
                    { label: 'Conversiones', value: leads && visits ? `${((leads / visits) * 100).toFixed(1)}%` : '—', delta: '+0%', icon: TrendUp },
                    { label: 'Tiempo respuesta', value: '14 min', delta: '-32%', icon: WhatsappLogo },
                    { label: 'Tráfico orgánico', value: visits ? String(visits) : '—', delta: '+0%', icon: GlobeHemisphereWest },
                ]);
            })
            .catch(() => {});
    }, []);

    const filteredLeads = useMemo(() => {
        const lowered = query.toLowerCase();
        return leadRows.filter((lead) =>
            [lead.name, lead.project, lead.source, lead.status].some((field) => field.toLowerCase().includes(lowered))
        );
    }, [query]);

    const columns = useMemo(() => leadColumns, []);

    const table = useReactTable({
        data: filteredLeads,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-8">
            <section id="overview" className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
                <div className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-4">Resumen general</p>
                            <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.9]">
                                Un panel para vender más, responder más rápido y publicar mejor.
                            </h2>
                            <p className="mt-4 max-w-xl text-[#1E1B4B]/70 leading-relaxed">
                                Diseñado para administrar contenido, leads y SEO de una web orientada a convertir tráfico en clientes.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#DDD6FE] bg-[#F8F7FF] p-5 min-w-[240px]">
                            <div className="flex items-center gap-2 text-[#7C3AED]">
                                <RocketLaunch size={18} weight="bold" />
                                <span className="text-xs font-semibold uppercase tracking-[0.3em]">Estado</span>
                            </div>
                            <p className="mt-3 text-2xl font-display font-black uppercase">Operativo</p>
                            <p className="mt-2 text-sm text-[#1E1B4B]/70">
                                SEO, leads y contenido listos para conectar con backend o CRM.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-[#DDD6FE] bg-gradient-to-br from-white to-[#F8F7FF] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 text-[#7C3AED] mb-4">
                        <Checks size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Checklist</span>
                    </div>
                    <ul className="space-y-4 text-sm text-[#1E1B4B]/75">
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Meta tags y Open Graph actualizados por ruta.</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Dashboard de leads con tabla especializada.</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Panel editable para hero, CTA y WhatsApp.</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Contenido listo para conectar con API real.</li>
                    </ul>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((item) => {
                    const Icon = item.icon;
                    return (
                        <article key={item.label} className="rounded-[1.75rem] border border-[#DDD6FE] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F7FF] text-[#7C3AED]">
                                    <Icon size={22} weight="bold" />
                                </div>
                                <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#7C3AED]">{item.delta}</span>
                            </div>
                            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-[#1E1B4B]/45">{item.label}</p>
                            <p className="mt-2 font-display text-3xl font-black uppercase text-[#1E1B4B]">{item.value}</p>
                        </article>
                    );
                })}
            </section>

            <section id="analytics" className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">Analytics</p>
                            <h3 className="font-display text-2xl md:text-3xl font-black uppercase">Tráfico y leads</h3>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-[#F8F7FF] px-3 py-2 text-xs font-semibold text-[#1E1B4B]/70">
                            <ChartLineUp size={16} weight="bold" />
                            Últimos 6 meses
                        </div>
                    </div>
                    <div className="h-[360px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#DDD6FE" strokeDasharray="4 4" />
                                <XAxis dataKey="month" stroke="#1E1B4B" opacity={0.5} />
                                <YAxis stroke="#1E1B4B" opacity={0.5} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: '1px solid #DDD6FE',
                                        background: '#FFFFFF',
                                        color: '#1E1B4B',
                                    }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="visits" stroke="#7C3AED" fill="url(#visitsFill)" strokeWidth={3} name="Visitas" />
                                <Line type="monotone" dataKey="leads" stroke="#A855F7" strokeWidth={3} dot={{ r: 4 }} name="Leads" />
                                <Line type="monotone" dataKey="sales" stroke="#1E1B4B" strokeWidth={2.5} dot={{ r: 3 }} name="Ventas" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                <div className="grid gap-6">
                    <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-[#7C3AED]">
                            <FunnelSimple size={18} weight="bold" />
                            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Fuentes</span>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sourceData} layout="vertical">
                                    <CartesianGrid stroke="#DDD6FE" strokeDasharray="4 4" />
                                    <XAxis type="number" stroke="#1E1B4B" opacity={0.5} />
                                    <YAxis dataKey="name" type="category" stroke="#1E1B4B" opacity={0.7} width={90} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: '1px solid #DDD6FE',
                                            background: '#FFFFFF',
                                            color: '#1E1B4B',
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[0, 14, 14, 0]}>
                                        {sourceData.map((entry, index) => (
                                            <Cell key={entry.name} fill={['#7C3AED', '#A855F7', '#C4B5FD', '#DDD6FE'][index]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </article>

                    <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                            <ListChecks size={18} weight="bold" />
                            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Pipeline</span>
                        </div>
                        <div className="h-[220px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={stageData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3}>
                                        {stageData.map((entry, index) => (
                                            <Cell key={entry.name} fill={['#7C3AED', '#A855F7', '#C4B5FD', '#DDD6FE'][index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: '1px solid #DDD6FE',
                                            background: '#FFFFFF',
                                            color: '#1E1B4B',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </article>
                </div>
            </section>

            <section id="content" className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
                <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                        <PencilSimple size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Editor rápido</span>
                    </div>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/45">Headline principal</span>
                            <input
                                value={headline}
                                onChange={(event) => setHeadline(event.target.value)}
                                className="w-full rounded-2xl border border-[#DDD6FE] bg-[#F8F7FF] px-4 py-3 text-[#1E1B4B] outline-none transition focus:border-[#7C3AED]"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/45">CTA principal</span>
                            <input
                                value={ctaLabel}
                                onChange={(event) => setCtaLabel(event.target.value)}
                                className="w-full rounded-2xl border border-[#DDD6FE] bg-[#F8F7FF] px-4 py-3 text-[#1E1B4B] outline-none transition focus:border-[#7C3AED]"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/45">Mensaje de WhatsApp</span>
                            <textarea
                                rows={4}
                                value={ctaMessage}
                                onChange={(event) => setCtaMessage(event.target.value)}
                                className="w-full rounded-2xl border border-[#DDD6FE] bg-[#F8F7FF] px-4 py-3 text-[#1E1B4B] outline-none transition focus:border-[#7C3AED]"
                            />
                        </label>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-[#DDD6FE] bg-gradient-to-br from-white to-[#F8F7FF] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                        <GearSix size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Vista previa</span>
                    </div>
                    <div className="rounded-[1.75rem] border border-[#DDD6FE] bg-white p-6 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-4">Home hero</p>
                        <h3 className="font-display text-3xl md:text-4xl font-black uppercase leading-[0.95]">{headline}</h3>
                        <p className="mt-4 text-[#1E1B4B]/70 leading-relaxed">
                            Sitios de alto impacto, carga rápida y una narrativa visual pensada para vender.
                        </p>
                        <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/20">
                            {ctaLabel}
                        </button>
                        <p className="mt-4 text-sm text-[#1E1B4B]/55">{ctaMessage}</p>
                    </div>
                </article>
            </section>

            <section id="leads" className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">Leads</p>
                            <h3 className="font-display text-2xl md:text-3xl font-black uppercase">Bandeja de entrada</h3>
                        </div>
                        <label className="flex items-center gap-3 rounded-full border border-[#DDD6FE] bg-[#F8F7FF] px-4 py-3">
                            <MagnifyingGlass size={18} weight="bold" className="text-[#7C3AED]" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Filtrar leads..."
                                className="w-52 bg-transparent text-sm outline-none placeholder:text-[#1E1B4B]/35"
                            />
                        </label>
                    </div>

                    <div className="overflow-x-auto rounded-[1.5rem] border border-[#EEE7FF]">
                        <table className="min-w-full divide-y divide-[#EEE7FF] text-left">
                            <thead className="bg-[#F8F7FF] text-xs uppercase tracking-[0.25em] text-[#1E1B4B]/55">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-5 py-4 font-semibold">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-[#F1EAFE]">
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="transition-colors hover:bg-[#F8F7FF]">
                                        {row.getVisibleCells().map((cell) => {
                                            const value = cell.getValue();
                                            const isStatus = cell.column.id === 'status';
                                            return (
                                                <td key={cell.id} className="px-5 py-4 text-sm text-[#1E1B4B]">
                                                    {isStatus ? (
                                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone[value] ?? 'bg-[#F1EAFE] text-[#1E1B4B]'}`}>
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext()) || value
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                        <EnvelopeSimple size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Actividad</span>
                    </div>
                    <div className="space-y-4">
                        {activityFeed.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-semibold text-[#1E1B4B]">{item.title}</p>
                                    <span className="text-xs uppercase tracking-[0.24em] text-[#7C3AED]">{item.time}</span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-[#1E1B4B]/70">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section id="seo" className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
                <article className="rounded-[2rem] border border-[#DDD6FE] bg-gradient-to-br from-white to-[#F8F7FF] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                        <GlobeHemisphereWest size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">SEO / indexación</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-[#EEE7FF] bg-white p-5">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/45 mb-3">Title sugerido</p>
                            <p className="font-display text-xl font-black uppercase leading-tight">Venta de páginas web y sitios web profesionales</p>
                        </div>
                        <div className="rounded-2xl border border-[#EEE7FF] bg-white p-5">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/45 mb-3">Keywords foco</p>
                            <p className="text-sm leading-relaxed text-[#1E1B4B]/70">venta de páginas web, sitios web, desarrollo web profesional, landing page, páginas web para negocios</p>
                        </div>
                        <div className="rounded-2xl border border-[#EEE7FF] bg-white p-5 md:col-span-2">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#1E1B4B]/45 mb-3">Descripción</p>
                            <p className="text-sm leading-relaxed text-[#1E1B4B]/70">Diseño y desarrollo páginas web que venden: sitios web profesionales, rápidos y elegantes para captar clientes y elevar tu marca.</p>
                        </div>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                        <ListChecks size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Tareas</span>
                    </div>
                    <ul className="space-y-4 text-sm text-[#1E1B4B]/75">
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">Revisar nuevos leads y priorizar intención de compra.</li>
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">Actualizar hero principal cuando haya nueva campaña.</li>
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">Publicar cambios de SEO y compartir nuevo enlace.</li>
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">Enviar seguimiento por WhatsApp a prospectos calientes.</li>
                    </ul>
                </article>
            </section>
        </div>
    );
};

export default AdminPage;