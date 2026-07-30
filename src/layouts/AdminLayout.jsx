import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/adminNavbar";
import AdminSidebar from "../components/admin/adminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Section */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg overflow-y-auto">
        <AdminSidebar sidebarOpen={sidebarOpen} />
      </aside>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col h-full w-64">
        {/* Navbar */}
        <AdminNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main content scrolls independently */}
        <main className="flex-1 p-6 overflow-auto ml-64">
          {/* Wrapper to allow horizontal scrolling if content overflows */}
          <div className="inline-block min-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
