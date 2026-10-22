import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Baby, Heart, HeartHandshake } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/births', label: 'Births', icon: Baby },
  { to: '/deaths', label: 'Deaths', icon: Heart },
  { to: '/marriages', label: 'Marriages', icon: HeartHandshake },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">Registrar System</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}