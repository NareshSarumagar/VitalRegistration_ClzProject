import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../api/clients';
import type { Death } from '../types';
import { DataTable } from '../components/DataTable';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export function Deaths() {
  const [data, setData] = useState<Death[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadData = () => {
    setLoading(true);
    setError(null);
    api
      .getDeaths()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const columns = [
    {
      key: 'deceasedName',
      label: 'Deceased Name',
      render: (d: Death) => (
        <span className="font-medium text-gray-900">
          {d.deceasedFirstName} {d.deceasedLastName}
        </span>
      ),
    },
    { key: 'gender', label: 'Gender' },
    { key: 'ageAtDeath', label: 'Age' },
    {
      key: 'dateOfDeath',
      label: 'Date of Death',
      render: (d: Death) =>
        d.dateOfDeath ? new Date(d.dateOfDeath).toLocaleDateString() : '—',
    },
    { key: 'placeOfDeath', label: 'Place of Death' },
    { key: 'causeOfDeath', label: 'Cause of Death' },
    { key: 'hospitalName', label: 'Hospital' },
    { key: 'informantFullName', label: 'Informant' },
    {
      key: 'location',
      label: 'Location',
      render: (d: Death) =>
        [d.municipality, d.district, d.province].filter(Boolean).join(', ') || '—',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Death Records</h3>
          <p className="text-sm text-gray-500">{data.length} total records</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search deaths..."
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
              rowKey={(d) => d._id}
            />
          </div>
        )}
      </div>
    </div>
  );
}