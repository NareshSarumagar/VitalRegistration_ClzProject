import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DateOfBirthRegister from "./pages/DateOfBirthRegister";
import DeathRegister from "./pages/DeathRegister";
import MarriageRegister from "./pages/MarriageRegister";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dateofbirth" element={<DateOfBirthRegister/>} />
          <Route path="/death" element={<DeathRegister/>}></Route>
          <Route path="/marriage" element={<MarriageRegister />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/register/birth"
            element={
              <ProtectedRoute>
                <DateOfBirthRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register/death"
            element={
              <ProtectedRoute>
                <DeathRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register/marriage"
            element={
              <ProtectedRoute>
                <MarriageRegister />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;