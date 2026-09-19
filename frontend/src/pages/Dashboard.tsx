import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

// ---------- Icons (inline SVG, no dependency) ----------
const Icon = {
  Bell: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Birth: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Marriage: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Death: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Records: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Reports: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

// ---------- Mock Data (replace with API later) ----------
const stats = [
  { label: "Birth Certificates", value: "1,247", change: "+12.5%", icon: "birth", color: "blue" },
  { label: "Marriage Records", value: "834", change: "+8.2%", icon: "marriage", color: "pink" },
  { label: "Death Certificates", value: "412", change: "-3.1%", icon: "death", color: "gray" },
  { label: "Total Citizens", value: "12,483", change: "+4.7%", icon: "users", color: "green" },
];

const recentRecords = [
  { id: "BR-2024-001", name: "Sarah Johnson", type: "Birth", date: "2024-06-14", status: "Approved" },
  { id: "MR-2024-042", name: "Michael Chen", type: "Marriage", date: "2024-06-14", status: "Pending" },
  { id: "DR-2024-018", name: "Robert Williams", type: "Death", date: "2024-06-13", status: "Approved" },
  { id: "BR-2024-002", name: "Emma Davis", type: "Birth", date: "2024-06-13", status: "Approved" },
  { id: "MR-2024-043", name: "James Wilson", type: "Marriage", date: "2024-06-12", status: "Rejected" },
  { id: "BR-2024-003", name: "Olivia Brown", type: "Birth", date: "2024-06-12", status: "Pending" },
];

// ---------- Config ----------
const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", ring: "ring-blue-500/20", glow: "shadow-blue-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", ring: "ring-pink-500/20", glow: "shadow-pink-500/20" },
  gray: { bg: "bg-gray-500/10", text: "text-gray-400", ring: "ring-gray-500/20", glow: "shadow-gray-500/20" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20", glow: "shadow-emerald-500/20" },
};

const statusStyles: Record<string, string> = {
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "records", label: "Records", icon: "records" },
  { id: "reports", label: "Reports", icon: "reports" },
  { id: "settings", label: "Settings", icon: "settings" },
];

// ---------- Component ----------
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* ============ Sidebar ============ */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white text-sm font-bold">VR</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Vital Reg.</p>
              <p className="text-xs text-gray-500">System</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Icon.X />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const IconComp = Icon[item.icon as keyof typeof Icon];
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black shadow-lg shadow-white/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <IconComp />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
          >
            <Icon.Logout />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* ============ Main Content ============ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Icon.Menu />
              </button>

              {/* Search */}
              <div className="relative max-w-md flex-1 hidden sm:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Icon.Search />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records, citizens..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition">
                <Icon.Bell />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-gray-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium leading-tight">{user?.fullName}</p>
                  <p className="text-xs text-gray-500 capitalize leading-tight">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">
              Welcome back, {user?.fullName?.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Here's what's happening with your vital records today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const c = colorMap[stat.color];
              const IconComp = Icon[stat.icon as keyof typeof Icon];
              const isPositive = stat.change.startsWith("+");
              return (
                <div
                  key={stat.label}
                  className={`relative bg-gray-950 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group overflow-hidden`}
                >
                  <div className={`absolute -top-8 -right-8 w-32 h-32 ${c.bg} rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition`} />
                  <div className="relative flex items-start justify-between">
                    <div className={`p-2.5 rounded-xl ${c.bg} ${c.text} ring-1 ${c.ring}`}>
                      <IconComp />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        isPositive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      <Icon.TrendingUp />
                      {stat.change}
                    </span>
                  </div>
                  <div className="relative mt-4">
                    <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "New Birth", icon: "birth", color: "blue" },
                { label: "New Marriage", icon: "marriage", color: "pink" },
                { label: "New Death", icon: "death", color: "gray" },
                { label: "Manage Users", icon: "users", color: "green" },
              ].map((action) => {
                const c = colorMap[action.color];
                const IconComp = Icon[action.icon as keyof typeof Icon];
                return (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 p-4 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-700 hover:bg-gray-900/50 transition text-left group"
                  >
                    <div className={`p-2 rounded-lg ${c.bg} ${c.text} group-hover:scale-110 transition-transform`}>
                      <IconComp />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Records Table */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <div>
                <h2 className="text-lg font-semibold">Recent Records</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Latest registrations across all categories
                </p>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800">
                    <th className="px-5 py-3 font-medium">Record ID</th>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-900 last:border-0 hover:bg-gray-900/40 transition"
                    >
                      <td className="px-5 py-3.5 text-sm font-mono text-gray-400">
                        {record.id}
                      </td>
                      <td className="px-5 py-3.5 text-sm font-medium">
                        {record.name}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-400">
                        {record.type}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-400">
                        {record.date}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                            statusStyles[record.status]
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 pt-4">
            © 2024 Vital Registration System · All rights reserved
          </p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;