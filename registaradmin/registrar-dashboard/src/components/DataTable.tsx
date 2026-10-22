interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchTerm?: string;
  rowKey: (item: T) => string | number;
}

export function DataTable<T>({
  columns,
  data,
  searchTerm = '',
  rowKey,
}: DataTableProps<T>) {
  const filtered = data.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return Object.values(item as Record<string, unknown>).some((val) =>
      String(val ?? '').toLowerCase().includes(term)
    );
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-4xl">📋</p>
        <p className="text-gray-500 mt-3">
          {data.length === 0 ? 'No records found' : 'No matching records'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filtered.map((item) => (
            <tr key={rowKey(item)} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-gray-700 whitespace-nowrap"
                >
                  {col.render
                    ? col.render(item)
                    : String(
                        (item as Record<string, unknown>)[col.key] ?? '—'
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}