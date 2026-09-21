import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ---------- Types ----------
interface RegisterCard {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
}

// ---------- Card config ----------
const CARDS: RegisterCard[] = [
  {
    id: "birth",
    title: "Birth Registration",
    description: "Register a new birth record with child and parent details.",
    path: "/register/birth",
    icon: "👶",
  },
  {
    id: "death",
    title: "Death Registration",
    description: "Register a death record with deceased and informant details.",
    path: "/register/death",
    icon: "🕊️",
  },
  {
    id: "marriage",
    title: "Marriage Registration",
    description: "Register a marriage with groom, bride, and witness details.",
    path: "/register/marriage",
    icon: "💍",
  },
];

// ---------- Component ----------
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleOpen = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* ---------- Header ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome{user?.fullName ? `, ${user.fullName}` : ""}. Choose a registration
              form to get started.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
          >
            Log out
          </button>
        </div>

        {/* ---------- Registration cards ---------- */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
            Registration Forms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => handleOpen(card.path)}
                className="text-left border border-gray-300 rounded-lg p-5 hover:border-black hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-black"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {card.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500">{card.description}</p>
                  </div>
                </div>
                <span className="inline-block mt-4 text-sm font-medium text-black">
                  Open form →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Quick info / help panel ---------- */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
            Quick Tips
          </h2>
          <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
            <li>All fields marked with <span className="text-red-500">*</span> are required.</li>
            <li>Each form is a multi-step wizard — you can go Back and Next freely.</li>
            <li>Your session stays active until you click "Log out".</li>
            <li>
              You will see a confirmation screen after a successful submission.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;