import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">VR</span>
            </div>
            <span className="font-semibold text-gray-800">Vital Registration</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.fullName}!
          </h1>
          <p className="text-gray-500 mt-2">
            You are signed in as{" "}
            <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm font-medium">
              {user?.role}
            </span>
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-5 border rounded-xl hover:shadow-md transition">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="font-semibold text-gray-800">Birth Certificates</h3>
              <p className="text-sm text-gray-500 mt-1">
                Register and manage birth records
              </p>
            </div>
            <div className="p-5 border rounded-xl hover:shadow-md transition">
              <div className="text-3xl mb-2">💍</div>
              <h3 className="font-semibold text-gray-800">Marriage Records</h3>
              <p className="text-sm text-gray-500 mt-1">
                Marriage registration services
              </p>
            </div>
            <div className="p-5 border rounded-xl hover:shadow-md transition">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-800">Death Certificates</h3>
              <p className="text-sm text-gray-500 mt-1">
                Death registration and certificates
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;