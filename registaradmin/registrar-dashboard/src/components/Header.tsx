interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-700">RG</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Registrar</p>
          <p className="text-xs text-gray-500">admin@registrar.gov</p>
        </div>
      </div>
    </header>
  );
}