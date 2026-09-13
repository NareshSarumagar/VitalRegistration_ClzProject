import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Stat {
  label: string;
  value: number;
  icon: string;
  color: string;
}

interface Service {
  title: string;
  desc: string;
  icon: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  const stats: Stat[] = [
    { label: "Birth Certificates", value: 0, icon: "👶", color: "bg-blue-50 text-blue-700" },
    { label: "Death Certificates", value: 0, icon: "📄", color: "bg-slate-100 text-slate-700" },
    { label: "Marriage Records", value: 0, icon: "💍", color: "bg-pink-50 text-pink-700" },
    { label: "Pending Requests", value: 0, icon: "⏳", color: "bg-amber-50 text-amber-700" },
  ];

  const services: Service[] = [
    {
      title: "Apply for Birth Certificate",
      desc: "Register a new birth and obtain certificate.",
      icon: "👶",
    },
    {
      title: "Register a Death",
      desc: "Report a death and request death certificate.",
      icon: "📄",
    },
    {
      title: "Marriage Registration",
      desc: "Register your marriage and get certificate.",
      icon: "💍",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vital-700 flex items-center justify-center text-white text-xl font-bold">
              ⚕
            </div>
            <div>
              <h1 className="text-lg font-bold text-vital-900">VitalReg</h1>
              <p className="text-xs text-slate-500">Vital Registration System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-vital-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-vital-100 text-vital-800 flex items-center justify-center font-bold">
              {user?.firstName?.[0]?.toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-vital-900">
            Welcome back, {user?.firstName}! 👋
          </h2>
          <p className="text-slate-600 mt-1">
            Manage your vital records and track your requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl mb-3`}
              >
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-vital-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <h3 className="text-xl font-bold text-vital-900 mb-4">
          Available Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-100 hover:border-vital-300"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h4 className="font-semibold text-vital-900">{service.title}</h4>
              <p className="text-sm text-slate-600 mt-2">{service.desc}</p>
              <button className="mt-4 text-sm font-medium text-vital-700 hover:text-vital-900">
                Start Application →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;