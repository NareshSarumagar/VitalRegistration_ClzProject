import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../api/clients';
import type { Marriage } from '../types';
import { DataTable } from '../components/DataTable';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export function Marriages() {
  const [data, setData] = useState<Marriage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadData = () => {
    setLoading(true);
    setError(null);
    api
      .getMarriages()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const columns = [
    {
      key: 'couple',
      label: 'Couple',
      render: (m: Marriage) => (
        <span className="font-medium text-gray-900">
          {m.groomFirstName} {m.groomLastName} &amp; {m.brideFirstName}{' '}
          {m.brideLastName}
        </span>
      ),
    },
    {
      key: 'dateOfMarriage',
      label: 'Date of Marriage',
      render: (m: Marriage) =>
        m.dateOfMarriage
          ? new Date(m.dateOfMarriage).toLocaleDateString()
          : '—',
    },
    { key: 'placeOfMarriage', label: 'Place' },
    { key: 'marriageType', label: 'Type' },
    { key: 'witness1Name', label: 'Witness 1' },
    { key: 'witness2Name', label: 'Witness 2' },
    {
      key: 'location',
      label: 'Location',
      render: (m: Marriage) =>
        [m.municipality, m.district, m.province].filter(Boolean).join(', ') ||
        '—',
    },
    { key: 'contactPhone', label: 'Contact' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Marriage Records
          </h3>
          <p className="text-sm text-gray-500">{data.length} total records</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search marriages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10 w-64"
          />
        </div>
      </div>

      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadData} />
        ) : (
          <div className="p-2">
            <DataTable
              columns={columns}
              data={data}
              searchTerm={search}
              rowKey={(m) => m._id}
            />
          </div>
        )}
      </div>
    </div>
  );
}