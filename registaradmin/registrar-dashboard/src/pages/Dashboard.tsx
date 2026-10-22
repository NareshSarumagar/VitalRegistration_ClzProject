import { useEffect, useState, useCallback } from 'react';
import { Baby, Heart, HeartHandshake, TrendingUp, RefreshCw } from 'lucide-react';
import  {api}  from '../api/clients';
import type { Birth, Death, Marriage } from '../types';
import { StatsCard } from '../components/StatCard';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';
import { Header } from '../components/Header';   // 👈 add
import { Sidebar } from '../components/Sidebar'; // 👈 add

type RecentItem = {
  _id: string;
  type: 'Birth' | 'Death' | 'Marriage';
  name: string;
  date: string;
  place: string;
};

type BreakdownItem = {
  label: string;
  count: number;
  total: number;
  color: string;
  barColor: string;
};

export default function Dashboard() {
  const [births, setBirths] = useState<Birth[]>([]);
  const [deaths, setDeaths] = useState<Death[]>([]);
  const [marriages, setMarriages] = useState<Marriage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, d, m] = await Promise.all([
        api.getBirths(),
        api.getDeaths(),
        api.getMarriages(),
      ]);
      setBirths(b);
      setDeaths(d);
      setMarriages(m);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ---- यहाँ Layout wrap गर्ने ----
  const content = loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error} onRetry={loadData} />
  ) : (
    <DashboardContent
      births={births}
      deaths={deaths}
      marriages={marriages}
      onRefresh={loadData}
    />
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard" subtitle="Vital Registration Overview" />
        <main className="flex-1 overflow-y-auto p-6">{content}</main>
      </div>
    </div>
  );
}

// ---- Content component (सबै UI यहाँ) ----
interface DashboardContentProps {
  births: Birth[];
  deaths: Death[];
  marriages: Marriage[];
  onRefresh: () => void;
}

function DashboardContent({ births, deaths, marriages, onRefresh }: DashboardContentProps) {
  const total = births.length + deaths.length + marriages.length;

  const recent: RecentItem[] = [
    ...births.map((b) => ({
      _id: b._id,
      type: 'Birth' as const,
      name: `${b.childFirstName ?? ''} ${b.childLastName ?? ''}`.trim() || 'Unknown',
      date: b.dateOfBirth,
      place: b.placeOfBirth,
    })),
    ...deaths.map((d) => ({
      _id: d._id,
      type: 'Death' as const,
      name: `${d.deceasedFirstName ?? ''} ${d.deceasedLastName ?? ''}`.trim() || 'Unknown',
      date: d.dateOfDeath,
      place: d.placeOfDeath,
    })),
    ...marriages.map((m) => ({
      _id: m._id,
      type: 'Marriage' as const,
      name: `${m.groomFirstName ?? ''} ${m.groomLastName ?? ''} & ${m.brideFirstName ?? ''} ${m.brideLastName ?? ''}`.trim(),
      date: m.dateOfMarriage,
      place: m.placeOfMarriage,
    })),
  ]
    .filter((r) => r.date && !isNaN(new Date(r.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const breakdown: BreakdownItem[] = [
    { label: 'Births', count: births.length, total, color: 'text-blue-600', barColor: 'bg-blue-500' },
    { label: 'Deaths', count: deaths.length, total, color: 'text-rose-600', barColor: 'bg-rose-500' },
    { label: 'Marriages', count: marriages.length, total, color: 'text-purple-600', barColor: 'bg-purple-500' },
  ];

  const genderCounts: Record<string, number> = {};
  [...births, ...deaths].forEach((r) => {
    const g = (r.gender || 'Unknown').trim();
    genderCounts[g] = (genderCounts[g] || 0) + 1;
  });
  const genderTotal = Object.values(genderCounts).reduce((a, b) => a + b, 0);
  const genderColors: Record<string, string> = {
    Male: 'bg-blue-500',
    Female: 'bg-pink-500',
    Other: 'bg-purple-500',
    Unknown: 'bg-gray-400',
  };

  return (
    <div className="space-y-6">
      {/* Page header row with refresh */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <p className="text-sm text-gray-500">
            Live summary of births, deaths and marriages
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Births" value={births.length} icon={Baby} color="blue" />
        <StatsCard title="Total Deaths" value={deaths.length} icon={Heart} color="rose" />
        <StatsCard title="Total Marriages" value={marriages.length} icon={HeartHandshake} color="purple" />
        <StatsCard title="Total Records" value={total} icon={TrendingUp} color="emerald" />
      </div>

      {/* Recent + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Records</h3>
            <p className="text-sm text-gray-500">Latest 5 registrations across all types</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Place</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No records found</td>
                  </tr>
                ) : (
                  recent.map((r) => (
                    <tr key={`${r.type}-${r._id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <span
                          className={`badge ${
                            r.type === 'Birth'
                              ? 'bg-blue-50 text-blue-700'
                              : r.type === 'Death'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          {r.type}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-900 font-medium">{r.name || '—'}</td>
                      <td className="px-6 py-3 text-gray-600">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-gray-600">{r.place || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Registration Breakdown</h3>
            <p className="text-sm text-gray-500">Share of total records</p>
          </div>

          <div className="space-y-4">
            {breakdown.map((b) => {
              const pct = b.total > 0 ? Math.round((b.count / b.total) * 100) : 0;
              return (
                <div key={b.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{b.label}</span>
                    <span className={`text-sm font-semibold ${b.color}`}>{b.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${b.barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Gender Distribution<span className="text-gray-400 font-normal"> (births &amp; deaths)</span>
            </h4>
            {genderTotal === 0 ? (
              <p className="text-sm text-gray-400">No data available</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(genderCounts).map(([gender, count]) => {
                  const pct = Math.round((count / genderTotal) * 100);
                  const barColor = genderColors[gender] ?? 'bg-gray-400';
                  return (
                    <div key={gender}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{gender}</span>
                        <span className="text-sm font-medium text-gray-800">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}