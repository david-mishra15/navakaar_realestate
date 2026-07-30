import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally remove token if you still store it elsewhere
    localStorage.removeItem("adminToken");
    navigate("/admin/login"); // redirect to login
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md h-16 flex items-center justify-between px-6 md:px-10 border-b border-gray-200 transition-all">
      
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-gray-800">Admin Dashboard</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition duration-200 shadow-sm"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
