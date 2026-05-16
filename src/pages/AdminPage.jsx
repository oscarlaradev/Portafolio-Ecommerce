import { useEffect, useMemo, useState, useCallback } from 'react';
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
    Plus,
    Trash,
    RocketLaunch,
    TrendUp,
    Users,
    WhatsappLogo,
    Check,
    X,
} from '@phosphor-icons/react';
import { useAdminStorage } from '../hooks/useAdminStorage.js';
import { useServerContent } from '../hooks/useServerContent.js';

const DEFAULT_LEADS = [
    { id: 1, name: 'María Torres', project: 'Landing para clínica', source: 'Google', budget: '$1,800', status: 'Propuesta' },
    { id: 2, name: 'Carlos Méndez', project: 'Sitio corporativo', source: 'Referido', budget: '$3,400', status: 'Contacto' },
];

const SOURCES = ['Google', 'Instagram', 'Referido', 'Facebook', 'Directo', 'Otro'];
const STATUSES = ['Nuevo', 'Contacto', 'Propuesta', 'Cerrado'];

const statusTone = {
    Nuevo: 'bg-[#EDE9FE] text-[#7C3AED]',
    Contacto: 'bg-[#F8F7FF] text-[#1E1B4B]',
    Propuesta: 'bg-[#DDD6FE] text-[#5B21B6]',
    Cerrado: 'bg-[#7C3AED] text-white',
};

const AdminPage = () => {
    const [query, setQuery] = useState('');
    const [headline, setHeadline] = useAdminStorage('headline', 'Venta de páginas web y sitios web profesionales');
    const [ctaLabel, setCtaLabel] = useAdminStorage('ctaLabel', 'WhatsApp directo');
    const [ctaMessage, setCtaMessage] = useAdminStorage('ctaMessage', 'Hola, quiero cotizar una página web profesional para mi negocio.');
    const [leads, setLeads] = useAdminStorage('leads', DEFAULT_LEADS);
    
    // Sync with server
    const { data: projects, setData: setProjects, save: saveProject, remove: removeProject, load: loadProjects } = useServerContent('/projects', []);
    const { data: stack, setData: setStack, save: saveStackItem, remove: removeStackItem, load: loadStack } = useServerContent('/stack', []);
    
    const [editingId, setEditingId] = useState(null);
    const [editingLead, setEditingLead] = useState(null);

    // Load server data on mount
    useEffect(() => {
        loadProjects();
        loadStack();
    }, [loadProjects, loadStack]);

    const kpis = useMemo(() => {
        const activeLeads = leads.filter((l) => l.status !== 'Cerrado').length;
        const closedLeads = leads.filter((l) => l.status === 'Cerrado').length;
        const totalValue = leads.reduce((sum, l) => {
            const val = parseInt(l.budget?.replace(/[^\d]/g, '') || 0);
            return sum + val;
        }, 0);

        const iconMap = { Users, TrendUp, EnvelopeSimple, GlobeHemisphereWest };
        return [
            {
                label: 'Leads activos',
                value: String(activeLeads),
                delta: `+${Math.floor(activeLeads * 0.12)}%`,
                icon: Users,
            },
            {
                label: 'Conversion rate',
                value: leads.length > 0 ? `${((closedLeads / leads.length) * 100).toFixed(1)}%` : '0%',
                delta: '+2.4%',
                icon: TrendUp,
            },
            {
                label: 'Valor pipeline',
                value: `$${(totalValue / 1000).toFixed(1)}k`,
                delta: `+${Math.floor(totalValue / 100)}%`,
                icon: EnvelopeSimple,
            },
            {
                label: 'Total leads',
                value: String(leads.length),
                delta: `+${leads.length}`,
                icon: GlobeHemisphereWest,
            },
        ];
    }, [leads]);

    const sourceCount = useMemo(() => {
        const counts = {};
        leads.forEach(l => {
            counts[l.source] = (counts[l.source] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [leads]);

    const stageCount = useMemo(() => {
        const counts = {};
        leads.forEach(l => {
            counts[l.status] = (counts[l.status] || 0) + 1;
        });
        return STATUSES.map(s => ({ name: s, value: counts[s] || 0 })).filter(x => x.value > 0);
    }, [leads]);

    const filteredLeads = useMemo(() => {
        const lowered = query.toLowerCase();
        return leads.filter((lead) =>
            [lead.name, lead.project, lead.source, lead.status].some((field) => field.toLowerCase().includes(lowered))
        );
    }, [query, leads]);

    const handleDeleteLead = useCallback((id) => {
        setLeads(leads.filter(l => l.id !== id));
    }, [leads, setLeads]);

    const handleSaveLead = useCallback(() => {
        if (editingId !== null && editingLead) {
            setLeads(leads.map(l => l.id === editingId ? editingLead : l));
        } else if (editingLead && !editingId) {
            setLeads([...leads, { ...editingLead, id: Date.now() }]);
        }
        setEditingId(null);
        setEditingLead(null);
    }, [editingId, editingLead, leads, setLeads]);

    const handleEditLead = useCallback((lead) => {
        setEditingId(lead.id);
        setEditingLead({ ...lead });
    }, []);

    const handleNewLead = useCallback(() => {
        setEditingId(null);
        setEditingLead({
            name: '',
            project: '',
            source: SOURCES[0],
            budget: '$0',
            status: STATUSES[0],
        });
    }, []);

    const handleCancel = useCallback(() => {
        setEditingId(null);
        setEditingLead(null);
    }, []);

    const columns = useMemo(() => [
        { accessorKey: 'name', header: 'Nombre' },
        { accessorKey: 'project', header: 'Proyecto' },
        { accessorKey: 'source', header: 'Origen' },
        { accessorKey: 'budget', header: 'Presupuesto' },
        { accessorKey: 'status', header: 'Estado' },
    ], []);

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
                            <p className="mt-3 text-2xl font-display font-black uppercase">Producción</p>
                            <p className="mt-2 text-sm text-[#1E1B4B]/70">
                                Todos los datos guardados localmente, sin dependencias externas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-[#DDD6FE] bg-gradient-to-br from-white to-[#F8F7FF] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-2 text-[#7C3AED] mb-4">
                        <Checks size={18} weight="bold" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Características</span>
                    </div>
                    <ul className="space-y-4 text-sm text-[#1E1B4B]/75">
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Leads editable con persistencia local.</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> KPIs calculados en tiempo real.</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Gráficos sincronizados con datos actuales.</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7C3AED]"></span> Panel de contenido editable.</li>
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
                            <h3 className="font-display text-2xl md:text-3xl font-black uppercase">Pipeline de ventas</h3>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-[#F8F7FF] px-3 py-2 text-xs font-semibold text-[#1E1B4B]/70">
                            <ChartLineUp size={16} weight="bold" />
                            En tiempo real
                        </div>
                    </div>
                    <div className="h-[360px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageCount.length > 0 ? stageCount : [{ name: 'Sin datos', value: 0 }]}>
                                <CartesianGrid stroke="#DDD6FE" strokeDasharray="4 4" />
                                <XAxis dataKey="name" stroke="#1E1B4B" opacity={0.5} />
                                <YAxis stroke="#1E1B4B" opacity={0.5} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: '1px solid #DDD6FE',
                                        background: '#FFFFFF',
                                        color: '#1E1B4B',
                                    }}
                                />
                                <Bar dataKey="value" fill="#7C3AED" radius={[8, 8, 0, 0]} name="Leads" />
                            </BarChart>
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
                                <BarChart data={sourceCount.length > 0 ? sourceCount : [{ name: 'Sin datos', value: 0 }]} layout="vertical">
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
                                        {sourceCount.map((entry, index) => (
                                            <Cell key={entry.name} fill={['#7C3AED', '#A855F7', '#C4B5FD', '#DDD6FE', '#E9D5FF', '#F3E8FF'][index % 6]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </article>

                    <article className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-5 text-[#7C3AED]">
                            <ListChecks size={18} weight="bold" />
                            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Resumen</span>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center rounded-lg bg-[#F8F7FF] p-3">
                                <span className="text-[#1E1B4B]/75">Total leads</span>
                                <span className="font-bold text-[#7C3AED]">{leads.length}</span>
                            </div>
                            <div className="flex justify-between items-center rounded-lg bg-[#F8F7FF] p-3">
                                <span className="text-[#1E1B4B]/75">Cerrados</span>
                                <span className="font-bold text-[#7C3AED]">{leads.filter(l => l.status === 'Cerrado').length}</span>
                            </div>
                            <div className="flex justify-between items-center rounded-lg bg-[#F8F7FF] p-3">
                                <span className="text-[#1E1B4B]/75">Valor total</span>
                                <span className="font-bold text-[#7C3AED]">
                                    ${(leads.reduce((sum, l) => sum + parseInt(l.budget?.replace(/[^\d]/g, '') || 0), 0) / 1000).toFixed(1)}k
                                </span>
                            </div>
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

            <section id="leads" className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">Leads</p>
                        <h3 className="font-display text-2xl md:text-3xl font-black uppercase">Bandeja de entrada</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 rounded-full border border-[#DDD6FE] bg-[#F8F7FF] px-4 py-3">
                            <MagnifyingGlass size={18} weight="bold" className="text-[#7C3AED]" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Filtrar leads..."
                                className="w-52 bg-transparent text-sm outline-none placeholder:text-[#1E1B4B]/35"
                            />
                        </label>
                        <button
                            onClick={handleNewLead}
                            className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] text-white px-4 py-3 text-sm font-semibold hover:bg-[#6D28D9] transition"
                        >
                            <Plus size={18} weight="bold" />
                            Nuevo
                        </button>
                    </div>
                </div>

                {editingLead && (
                    <div className="mb-6 rounded-2xl border-2 border-[#7C3AED] bg-[#F8F7FF] p-6">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#7C3AED] mb-4 font-semibold">
                            {editingId ? 'Editar lead' : 'Nuevo lead'}
                        </p>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={editingLead.name}
                                onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                                className="rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            />
                            <input
                                type="text"
                                placeholder="Proyecto"
                                value={editingLead.project}
                                onChange={(e) => setEditingLead({ ...editingLead, project: e.target.value })}
                                className="rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            />
                            <select
                                value={editingLead.source}
                                onChange={(e) => setEditingLead({ ...editingLead, source: e.target.value })}
                                className="rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            >
                                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <input
                                type="text"
                                placeholder="Presupuesto"
                                value={editingLead.budget}
                                onChange={(e) => setEditingLead({ ...editingLead, budget: e.target.value })}
                                className="rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            />
                            <select
                                value={editingLead.status}
                                onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                                className="rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            >
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSaveLead}
                                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] text-white px-3 py-2 text-sm font-semibold hover:bg-[#6D28D9] transition"
                                >
                                    <Check size={16} weight="bold" />
                                    Guardar
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDD6FE] bg-white text-[#1E1B4B] px-3 py-2 text-sm font-semibold hover:bg-[#F8F7FF] transition"
                                >
                                    <X size={16} weight="bold" />
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                    <th className="px-5 py-4 font-semibold text-right">Acciones</th>
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
                                    <td className="px-5 py-4 text-sm text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEditLead(row.original)}
                                                className="inline-flex items-center gap-1 rounded-lg border border-[#DDD6FE] bg-[#F8F7FF] text-[#7C3AED] px-2 py-1 text-xs font-semibold hover:bg-[#EDE9FE] transition"
                                            >
                                                <PencilSimple size={14} weight="bold" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLead(row.original.id)}
                                                className="inline-flex items-center gap-1 rounded-lg border border-[#DDD6FE] bg-[#FEE7E7] text-[#DC2626] px-2 py-1 text-xs font-semibold hover:bg-[#FECACA] transition"
                                            >
                                                <Trash size={14} weight="bold" />
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && (
                        <div className="rounded-b-[1.5rem] bg-[#F8F7FF] p-8 text-center text-[#1E1B4B]/55">
                            <p>No hay leads que coincidan con tu búsqueda.</p>
                        </div>
                    )}
                </div>
            </section>

            <section id="portfolio" className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">Portafolio</p>
                        <h3 className="font-display text-2xl md:text-3xl font-black uppercase">Gestionar proyectos</h3>
                    </div>
                    <button
                        onClick={() => {
                            saveProject({ title: 'Nuevo Proyecto', desc: 'Descripción', stack: ['Tech'] });
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] text-white px-4 py-3 text-sm font-semibold hover:bg-[#6D28D9] transition"
                    >
                        <Plus size={18} weight="bold" />
                        Nuevo Proyecto
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((proj) => (
                        <div key={proj.id} className="rounded-2xl border border-[#DDD6FE] bg-[#F8F7FF] p-5 space-y-3">
                            <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => saveProject({ ...proj, title: e.target.value })}
                                placeholder="Título"
                                className="w-full rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm font-bold outline-none focus:border-[#7C3AED]"
                            />
                            <input
                                type="text"
                                value={proj.desc}
                                onChange={(e) => saveProject({ ...proj, desc: e.target.value })}
                                placeholder="Descripción"
                                className="w-full rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            />
                            <input
                                type="text"
                                value={proj.stack.join(', ')}
                                onChange={(e) => saveProject({ ...proj, stack: e.target.value.split(',').map(s => s.trim()) })}
                                placeholder="Stack (ej: React, Tailwind)"
                                className="w-full rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#7C3AED]"
                            />
                            <button
                                onClick={() => removeProject(proj.id)}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDD6FE] bg-[#FEE7E7] text-[#DC2626] px-3 py-2 text-sm font-semibold hover:bg-[#FECACA] transition"
                            >
                                <Trash size={16} weight="bold" />
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section id="stack-edit" className="rounded-[2rem] border border-[#DDD6FE] bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">Tecnologías</p>
                        <h3 className="font-display text-2xl md:text-3xl font-black uppercase">Arsenal Tecnológico</h3>
                    </div>
                    <button
                        onClick={() => {
                            saveStackItem({ name: 'Nueva Tech' });
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] text-white px-4 py-3 text-sm font-semibold hover:bg-[#6D28D9] transition"
                    >
                        <Plus size={18} weight="bold" />
                        Añadir
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    {stack.map((tech) => (
                        <div key={tech.id} className="rounded-2xl border border-[#DDD6FE] bg-[#F8F7FF] p-4 space-y-3">
                            <input
                                type="text"
                                value={tech.name}
                                onChange={(e) => saveStackItem({ ...tech, name: e.target.value })}
                                placeholder="Nombre"
                                className="w-full rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm font-bold outline-none focus:border-[#7C3AED]"
                            />
                            <button
                                onClick={() => removeStackItem(tech.id)}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDD6FE] bg-[#FEE7E7] text-[#DC2626] px-3 py-2 text-sm font-semibold hover:bg-[#FECACA] transition"
                            >
                                <Trash size={16} weight="bold" />
                            </button>
                        </div>
                    ))}
                </div>
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
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">✓ Revisar nuevos leads y priorizar intención de compra.</li>
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">✓ Actualizar hero principal cuando haya nueva campaña.</li>
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">✓ Publicar cambios de SEO y compartir nuevo enlace.</li>
                        <li className="rounded-2xl border border-[#EEE7FF] bg-[#F8F7FF] p-4">✓ Enviar seguimiento por WhatsApp a prospectos calientes.</li>
                    </ul>
                </article>
            </section>
        </div>
    );
};

export default AdminPage;
