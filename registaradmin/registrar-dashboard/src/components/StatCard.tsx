import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: 'blue' | 'rose' | 'purple' | 'emerald';
}

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
};

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  const colors = colorMap[color];
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
}