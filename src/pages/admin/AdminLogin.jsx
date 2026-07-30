import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL ;

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, { email, password });

      // Save token in localStorage
      localStorage.setItem("adminToken", response.data.token);

      // Set default Axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400">
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-96 flex flex-col space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 drop-shadow-lg">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg transition shadow-lg hover:scale-105 hover:shadow-xl ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
