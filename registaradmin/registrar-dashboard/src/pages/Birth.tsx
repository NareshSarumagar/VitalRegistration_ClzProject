import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../api/clients';
import type {Birth}  from '../types/index';
import { DataTable } from '../components/DataTable';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export function Births() {
  const [data, setData] = useState<Birth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadData = () => {
    setLoading(true);
    setError(null);
    api
      .getBirths()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const columns = [
    {
      key: 'childName',
      label: 'Child Name',
      render: (b: Birth) => (
        <span className="font-medium text-gray-900">
          {b.childFirstName} {b.childLastName}
        </span>
      ),
    },
    { key: 'gender', label: 'Gender' },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      render: (b: Birth) =>
        b.dateOfBirth ? new Date(b.dateOfBirth).toLocaleDateString() : '—',
    },
    { key: 'placeOfBirth', label: 'Place of Birth' },
    { key: 'motherFullName', label: "Mother's Name" },
    { key: 'fatherFullName', label: "Father's Name" },
    {
      key: 'location',
      label: 'Location',
      render: (b: Birth) =>
        [b.municipality, b.district, b.province].filter(Boolean).join(', ') || '—',
    },
    { key: 'contactPhone', label: 'Phone' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Birth Records</h3>
          <p className="text-sm text-gray-500">{data.length} total records</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search births..."
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
              rowKey={(b) => b._id}
            />
          </div>
        )}
      </div>
    </div>
  );
}