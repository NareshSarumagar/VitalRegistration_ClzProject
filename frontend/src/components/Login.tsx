import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Login Data:", {
      ...formData,
      rememberMe,
    });

    // Later connect this with your backend API
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200">
        <div className="grid md:grid-cols-2">
          
          {/* Left Side */}
          <div className="hidden md:flex bg-slate-900 text-white p-10 flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>

                <div>
                  <h1 className="font-bold text-lg">
                    Vital Registration
                  </h1>
                  <p className="text-xs text-slate-400">
                    Government Service Portal
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="mt-20">
                <p className="text-blue-400 font-medium mb-3">
                  DIGITAL GOVERNMENT SERVICE
                </p>

                <h2 className="text-4xl font-bold leading-tight">
                  Manage your
                  <br />
                  vital records
                  <br />
                  securely.
                </h2>

                <p className="mt-6 text-slate-400 leading-7 max-w-md">
                  Access birth, death and marriage registration
                  services through a secure and convenient digital
                  platform.
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-500">
              © 2026 Vital Registration System
            </div>
          </div>

          {/* Right Side - Login */}
          <div className="p-6 sm:p-10 md:p-12">
            {/* Mobile Logo */}
            <div className="flex md:hidden items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ShieldCheck size={25} />
              </div>

              <div>
                <h1 className="font-bold text-slate-900">
                  Vital Registration
                </h1>
                <p className="text-xs text-slate-500">
                  Government Service Portal
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="text-slate-500 mt-2">
                Sign in to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Sign In
              </button>
            </form>

            {/* Register */}
            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <button className="font-semibold text-blue-600 hover:text-blue-700">
                  Create Account
                </button>
              </p>
            </div>

            {/* Security Info */}
            <div className="mt-8 flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-200 p-4">
              <UserRound
                size={18}
                className="text-blue-600 mt-0.5"
              />

              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Secure Government Portal
                </p>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Your information is protected using secure
                  authentication and encryption.
                </p>
              </div>
            </div>

            {/* Mobile Footer */}
            <p className="md:hidden text-center text-xs text-slate-400 mt-8">
              © 2026 Vital Registration System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;