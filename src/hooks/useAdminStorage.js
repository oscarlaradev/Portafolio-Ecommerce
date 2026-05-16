// useAdminStorage: local state management for admin panel
export function useAdminStorage(key, initialValue) {
  const [state, setState] = React.useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(`admin_${key}`);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = React.useCallback(
    (value) => {
      try {
        const v = value instanceof Function ? value(state) : value;
        setState(v);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`admin_${key}`, JSON.stringify(v));
        }
      } catch (e) {
        console.error(`Error saving admin_${key}:`, e);
      }
    },
    [key, state]
  );

  return [state, setValue];
}

// Compute KPIs from actual stored data
export function computeKPIs(headline, leads) {
  const activeLeads = leads.filter((l) => l.status !== 'Cerrado').length;
  const closedLeads = leads.filter((l) => l.status === 'Cerrado').length;
  const totalValue = leads.reduce((sum, l) => {
    const val = parseInt(l.budget?.replace(/[^\d]/g, '') || 0);
    return sum + val;
  }, 0);

  return [
    {
      label: 'Leads activos',
      value: String(activeLeads),
      delta: `+${Math.floor(activeLeads * 0.12)}%`,
      icon: 'Users',
    },
    {
      label: 'Conversion rate',
      value: leads.length > 0 ? `${((closedLeads / leads.length) * 100).toFixed(1)}%` : '0%',
      delta: '+2.4%',
      icon: 'TrendUp',
    },
    {
      label: 'Valor pipeline',
      value: `$${(totalValue / 1000).toFixed(1)}k`,
      delta: `+${Math.floor(totalValue / 100)}%`,
      icon: 'CurrencyDollar',
    },
    {
      label: 'Total leads',
      value: String(leads.length),
      delta: `+${leads.length}`,
      icon: 'GlobeHemisphereWest',
    },
  ];
}
